module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    // 'plugin:prettier/recommended',
    'love'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'nestia.config.*', '@types/**/*', 'public/**/*'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    // see https://github.com/typescript-eslint/typescript-eslint/issues/1824
    indent: 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-prototype-builtins': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/method-signature-style': ['error', 'method']
  }
}
