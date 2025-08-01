import baseConfig from '../../eslint.config.mjs'; // adjust path if needed

export default [
  ...baseConfig,
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}'],
        },
      ],
    },
    languageOptions: {
      parser: (await import('jsonc-eslint-parser')).default,
    },
  },
];
