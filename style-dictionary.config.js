// style-dictionary.config.js
import StyleDictionary from 'style-dictionary';

StyleDictionary.registerFilter({
  name: 'isTypography',
  filter: (token) =>
    Array.isArray(token.path) && token.path[0] === 'Font',
});

const config = {
  source: [
    'src/tokens/Primitives.tokens.json',
    'src/tokens/Themes.tokens.json',
    'src/tokens/Modes.tokens.json',
    'src/tokens/Font.variables.json',
    'src/tokens/Icon.componentvariables.json',
  ],

  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/tokens/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: { selector: ':root' },
        },
      ],
    },

    typography: {
      transformGroup: 'css',
      buildPath: 'build/tokens/',
      files: [
        {
          destination: 'typography.css',
          format: 'css/variables',
          filter: 'isTypography',
          options: { selector: ':root' },
        },
      ],
    },

    js: {
      transformGroup: 'js',
      buildPath: 'build/tokens/',
      files: [
        {
          destination: 'tokens.ts',
          format: 'javascript/es6',
        },
      ],
    },
  },
};

const buildTokens = async () => {
  const sd = new StyleDictionary(config);
  await sd.buildAllPlatforms();
};

buildTokens();
