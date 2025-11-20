const fs = require('fs');
const path = require('path');
const { transform } = require('@svgr/core');

const ICONS_SOURCE_DIR = path.join(__dirname, '../icons');
const ICONS_OUTPUT_DIR = path.join(__dirname, '../src/icons');

console.log('🎨 Generating icon components...\n');

// Clean output directory (except .gitkeep)
if (fs.existsSync(ICONS_OUTPUT_DIR)) {
    const files = fs.readdirSync(ICONS_OUTPUT_DIR);
    files.forEach(file => {
        if (file !== '.gitkeep') {
            const filePath = path.join(ICONS_OUTPUT_DIR, file);
            if (fs.statSync(filePath).isDirectory()) {
                fs.rmSync(filePath, { recursive: true });
            } else if (file !== '.gitkeep') {
                fs.unlinkSync(filePath);
            }
        }
    });
}

// Ensure output directory exists
fs.mkdirSync(ICONS_OUTPUT_DIR, { recursive: true });

// Get all categories
const categories = fs.readdirSync(ICONS_SOURCE_DIR).filter(item => {
    const itemPath = path.join(ICONS_SOURCE_DIR, item);
    return fs.statSync(itemPath).isDirectory();
});

console.log(`📁 Found ${categories.length} categories\n`);

// Helper function to generate component name
function generateComponentName(filename) {
    // Extract variant and suffix (Filled, Filled-1, etc.)
    const variantMatch = filename.match(/_(Filled|Outlined|Linear|Bold|TwoTone)(-\d+)?\.svg$/);
    const variant = variantMatch ? variantMatch[1] : 'Filled';
    const suffix = variantMatch && variantMatch[2] ? variantMatch[2].replace('-', '') : '';

    // Clean up the base name
    let baseName = filename
        .replace(/^ic_/, '')                              // Remove ic_ prefix
        .replace(/_(Filled|Outlined|Linear|Bold|TwoTone)(-\d+)?\.svg$/, '')  // Remove variant and .svg
        .replace(/[()]/g, '')                             // Remove parentheses
        .replace(/[&+]/g, 'And')                          // Replace & and + with "And"
        .replace(/[^a-zA-Z0-9_\s-]/g, '')                 // Remove any other special characters
        .replace(/[-_]/g, ' ')                            // Replace separators with spaces
        .trim()
        .split(' ')
        .filter(word => word.length > 0)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');

    // Handle names starting with numbers
    if (/^\d/.test(baseName)) {
        baseName = '_' + baseName;
    }

    return {
        componentName: `Icon${baseName}${variant}${suffix}`,
        baseName: `Icon${baseName}`,
        variant: variant
    };
}

// Track icons for creating aliases
const iconAliases = {};
let totalIcons = 0;
let errorCount = 0;

// Process each category
categories.forEach(category => {
    const categorySourcePath = path.join(ICONS_SOURCE_DIR, category);
    const categoryOutputPath = path.join(ICONS_OUTPUT_DIR, category);

    // Create category directory
    fs.mkdirSync(categoryOutputPath, { recursive: true });

    const svgFiles = fs.readdirSync(categorySourcePath)
        .filter(file => file.endsWith('.svg'));

    console.log(`⚡ Processing ${category}: ${svgFiles.length} icons`);

    const categoryExports = [];

    svgFiles.forEach(svgFile => {
        try {
            const svgPath = path.join(categorySourcePath, svgFile);
            const svgCode = fs.readFileSync(svgPath, 'utf-8');

            const { componentName, baseName, variant } = generateComponentName(svgFile);

            // Track for alias creation (use Filled as default, but only if no suffix)
            // This prevents duplicate aliases like IconArchive from both IconArchiveFilled and IconArchiveFilled1
            if (variant === 'Filled' && !componentName.match(/Filled\d+$/)) {
                if (!iconAliases[baseName]) {
                    iconAliases[baseName] = { componentName, category };
                }
            }

            // Transform SVG to React component
            const jsCode = transform.sync(
                svgCode,
                {
                    typescript: true,
                    icon: true,
                    dimensions: false,
                    jsxRuntime: 'automatic',  // Use new JSX transform (no React import needed)
                    svgProps: {
                        className: 'unstructured-icon',
                        fill: 'currentColor',  // Default fill for root SVG (paths have their own fill/stroke)
                        width: '1.5rem',
                        height: '1.5rem',
                    },
                    // Replace hardcoded fill/stroke colors with currentColor so icons can be styled with text color classes
                    // Note: 'none' is intentionally NOT replaced as it's used for transparent fills
                    replaceAttrValues: {
                        // Black/dark colors
                        '#141414': 'currentColor',
                        '#292D32': 'currentColor',  // Dark gray found in SVGs
                        '#000': 'currentColor',
                        '#000000': 'currentColor',
                        'black': 'currentColor',
                        // White colors
                        'white': 'currentColor',
                        '#fff': 'currentColor',
                        '#ffffff': 'currentColor',
                        '#FFF': 'currentColor',
                        '#FFFFFF': 'currentColor',
                        // Common gray shades (for completeness)
                        '#808080': 'currentColor',
                        '#666': 'currentColor',
                        '#666666': 'currentColor',
                        '#333': 'currentColor',
                        '#333333': 'currentColor',
                    },
                    plugins: ['@svgr/plugin-jsx'],
                },
                { componentName }
            );

            // Write component file
            const componentPath = path.join(categoryOutputPath, `${componentName}.tsx`);
            fs.writeFileSync(componentPath, jsCode);

            categoryExports.push(componentName);
            totalIcons++;

        } catch (error) {
            console.error(`  ❌ Error processing ${svgFile}:`, error.message);
            errorCount++;
        }
    });

    // Create category index file
    let categoryIndex = '// Auto-generated file. Do not edit manually.\n\n';
    categoryExports.forEach(name => {
        categoryIndex += `export { default as ${name} } from './${name}'\n`;
    });

    fs.writeFileSync(
        path.join(categoryOutputPath, 'index.ts'),
        categoryIndex
    );
});

// Create main icons index
let mainIndex = '// Auto-generated file. Do not edit manually.\n';
mainIndex += '// Import icons like: import { IconArchiveFilled } from \'unstructured-ds/icons\'\n\n';

// Export all categories
categories.forEach(category => {
    mainIndex += `export * from './${category}'\n`;
});

// Note: Aliases removed to avoid TypeScript re-export ambiguity
// Users should use full names like IconArchiveFilled

fs.writeFileSync(
    path.join(ICONS_OUTPUT_DIR, 'index.ts'),
    mainIndex
);

console.log(`\n✅ Successfully generated ${totalIcons} icon components!`);
console.log(`📦 Created ${Object.keys(iconAliases).length} default aliases`);
if (errorCount > 0) {
    console.log(`⚠️  ${errorCount} icons failed to process`);
}
console.log('\n');

