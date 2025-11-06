import StyleDictionary from 'style-dictionary';

// Single theme configuration (light theme)
const config = {
    source: [
        'src/tokens/Primitives.tokens.json',  // Base colors (Orange, Grey, Red, etc.)
        'src/tokens/Themes.tokens.json',      // Brand aliases (Brand → Orange)
        'src/tokens/Modes.tokens.json',       // Semantic tokens (Surface, Text, Border, Icon)
        'src/tokens/Font.tokens.json'         // Typography
    ],
    platforms: {
        css: {
            transformGroup: 'css',
            buildPath: 'src/build/',
            files: [
                {
                    destination: 'tokens.css',
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

// Build the tokens
const buildTokens = async () => {
    console.log('Building tokens...');
    const sd = new StyleDictionary(config);
    await sd.buildAllPlatforms();
    console.log('Tokens built successfully!');
};

buildTokens();
