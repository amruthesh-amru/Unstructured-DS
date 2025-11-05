import StyleDictionary from 'style-dictionary';

// Light theme configuration
const lightConfig = {
    source: [
        'src/tokens/global/*.json',
        'src/tokens/global/themes/light.json'
    ],
    platforms: {
        css: {
            transformGroup: 'css',
            buildPath: 'src/build/',
            files: [
                {
                    destination: 'tokens-light.css',
                    format: 'css/variables',
                    options: { selector: ':root' }
                }
            ]
        },
        js: {
            transformGroup: 'js',
            buildPath: 'src/build/',
            files: [
                {
                    destination: 'tokens.ts',
                    format: 'javascript/es6'
                }
            ]
        }
    }
};

// Dark theme configuration
const darkConfig = {
    source: [
        'src/tokens/global/*.json',
        'src/tokens/global/themes/dark.json'
    ],
    platforms: {
        css: {
            transformGroup: 'css',
            buildPath: 'src/build/',
            files: [
                {
                    destination: 'tokens-dark.css',
                    format: 'css/variables',
                    options: { selector: '[data-theme="dark"]' }
                }
            ]
        }
    }
};

// Build both configurations
const buildTokens = async () => {
    console.log('Building light theme...');
    const sdLight = new StyleDictionary(lightConfig);
    await sdLight.buildAllPlatforms();

    console.log('Building dark theme...');
    const sdDark = new StyleDictionary(darkConfig);
    await sdDark.buildAllPlatforms();

    console.log('All tokens built successfully!');
};

buildTokens();
