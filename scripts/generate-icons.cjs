const fs = require('fs');
const path = require('path');
const { transform } = require('@svgr/core');

const ICONS_SOURCE_DIR = path.join(__dirname, '../icons');
const ICONS_OUTPUT_DIR = path.join(__dirname, '../src/icons');

console.log('🎨 Generating icon components...\n');


if (fs.existsSync(ICONS_OUTPUT_DIR)) {
    const files = fs.readdirSync(ICONS_OUTPUT_DIR);
    files.forEach(file => {
        if (file !== '.gitkeep') {
            const filePath = path.join(ICONS_OUTPUT_DIR, file);
            if (fs.statSync(filePath).isDirectory()) {
                fs.rmSync(filePath, { recursive: true });
            } else {
                fs.unlinkSync(filePath);
            }
        }
    });
}

// Ensure output directory exists after cleanup
fs.mkdirSync(ICONS_OUTPUT_DIR, { recursive: true });

/* -----------------------------------------------------
   CATEGORY DISCOVERY
   Reads subfolders in the source directory to maintain categorization
----------------------------------------------------- */

const categories = fs.readdirSync(ICONS_SOURCE_DIR).filter(item => {
    const itemPath = path.join(ICONS_SOURCE_DIR, item);
    return fs.statSync(itemPath).isDirectory();
});

console.log(`📁 Found ${categories.length} categories\n`);

/**
 * NAME GENERATOR
 * Converts file names like 'ic_search_Bold-1.svg' into 'IconSearchBold1'
 * @param {string} filename - The raw SVG filename
 * @returns {Object} - componentName, baseName, and variant type
 */
function generateComponentName(filename) {
    // Remove file extension (last .something)
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');

    // Convert to PascalCase but keep underscores
    const pascalCase = nameWithoutExt
        .split('_')
        .map(part =>
            part
                .replace(/[^a-zA-Z0-9]/g, '')
                .replace(/^./, char => char.toUpperCase())
        )
        .join('_');

    // Prepend underscore if name starts with a digit
    const safeName = /^\d/.test(pascalCase) ? `_${pascalCase}` : pascalCase;

    return {
        componentName: safeName,
        baseName: safeName
    };
}


/* -----------------------------------------------------
   CORE PROCESSING LOOP
   Iterates through categories and transforms SVGs to React components
----------------------------------------------------- */

const iconAliases = {};
let totalIcons = 0;
let errorCount = 0;

categories.forEach(category => {
    const categorySourcePath = path.join(ICONS_SOURCE_DIR, category);
    const categoryOutputPath = path.join(ICONS_OUTPUT_DIR, category);

    // Replicate folder structure in the output directory
    fs.mkdirSync(categoryOutputPath, { recursive: true });

    const svgFiles = fs.readdirSync(categorySourcePath).filter(file => file.endsWith('.svg'));
    console.log(`⚡ Processing ${category}: ${svgFiles.length} icons`);

    const categoryExports = [];

    svgFiles.forEach(svgFile => {
        try {
            const svgPath = path.join(categorySourcePath, svgFile);
            const svgCode = fs.readFileSync(svgPath, 'utf-8');
            const { componentName, baseName, variant } = generateComponentName(svgFile);

            // Logic to track primary icons (Filled) for potential default aliasing
            if (variant === 'Filled' && !componentName.match(/Filled\d+$/)) {
                if (!iconAliases[baseName]) {
                    iconAliases[baseName] = { componentName, category };
                }
            }

            /* -------------------------------------------------
               SVGR TRANSFORMATION
               Converts SVG string into a TypeScript React component
            ------------------------------------------------- */
            const jsCode = transform.sync(
                svgCode,
                {
                    typescript: true,
                    icon: true,
                    dimensions: false,          // Let CSS/props handle size
                    jsxRuntime: 'automatic',    // No need to "import React" in React 17+
                    svgProps: {
                        className: 'unstructured-icon',
                        fill: 'currentColor',   // Inherit color from parent text/CSS
                        width: '1.5rem',
                        height: '1.5rem',
                    },
                    // Mapping hardcoded SVG colors to 'currentColor' for theming support
                    replaceAttrValues: {
                        '#141414': 'currentColor',
                        '#292D32': 'currentColor',
                        '#000': 'currentColor',
                        '#000000': 'currentColor',
                        'black': 'currentColor',
                        'white': 'currentColor',
                        '#fff': 'currentColor',
                        '#ffffff': 'currentColor',
                        '#FFF': 'currentColor',
                        '#FFFFFF': 'currentColor',
                        '#808080': 'currentColor',
                        '#666': 'currentColor',
                        '#333': 'currentColor',
                    },
                    plugins: ['@svgr/plugin-jsx'],
                },
                { componentName }
            );

            // Write individual component file
            const componentPath = path.join(categoryOutputPath, `${componentName}.tsx`);
            fs.writeFileSync(componentPath, jsCode);

            categoryExports.push(componentName);
            totalIcons++;

        } catch (error) {
            console.error(`  ❌ Error processing ${svgFile}:`, error.message);
            errorCount++;
        }
    });

    /* -------------------------------------------------
       CATEGORY INDEX GENERATION
       Creates an index.ts in each subfolder for easy importing
    ------------------------------------------------- */
    let categoryIndex = '// Auto-generated file. Do not edit manually.\n\n';
    categoryExports.forEach(name => {
        categoryIndex += `export { default as ${name} } from './${name}'\n`;
    });

    fs.writeFileSync(path.join(categoryOutputPath, 'index.ts'), categoryIndex);
});

/* -----------------------------------------------------
   ROOT INDEX GENERATION
   Creates the main entry point that exports everything
----------------------------------------------------- */

let mainIndex = '// Auto-generated file. Do not edit manually.\n';
mainIndex += '// Import icons like: import { IconArchiveFilled } from \'unstructured-ds/icons\'\n\n';

categories.forEach(category => {
    mainIndex += `export * from './${category}'\n`;
});

fs.writeFileSync(path.join(ICONS_OUTPUT_DIR, 'index.ts'), mainIndex);

// Final Summary
console.log(`\n✅ Successfully generated ${totalIcons} icon components!`);
console.log(`📦 Created ${Object.keys(iconAliases).length} default aliases`);
if (errorCount > 0) {
    console.log(`⚠️  ${errorCount} icons failed to process`);
}
console.log('\n');