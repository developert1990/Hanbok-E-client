module.exports = {
    plugins: ['react', 'react-hooks', 'flowtype'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'react-app',
    ],
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            parser: '@typescript-eslint/parser',  // <----- invalid parser, will fail
        },
        {
            files: ['**/*.js'],
            parser: 'babel-eslint',  // <----- invalid parser, will fail
        },
    ],
};