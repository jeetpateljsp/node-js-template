import tslint from 'typescript-eslint';
import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';

export default tslint.config(
    {
        // Config with ignore patterns in replace of `.eslintignore`
        ignores: ['**/build/**', '**/dist/**', 'coverage', 'docker'],
    },
    // Turns off all rules that are unnecessary or might conflict with Prettier
    prettierConfig,
    // Recommended eslint rules
    eslint.configs.recommended,
    // strict: recommended rules that enforce strict code quality
    ...tslint.configs.strict,
    // stylistic: recommended rules that enforce code style
    ...tslint.configs.stylistic,

    //Eslint plugin for Jest @TODO: Add Jest plugin

)