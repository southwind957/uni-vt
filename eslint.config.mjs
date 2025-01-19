import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
// import eslintConfigPrettier from 'eslint-plugin-prettier'

export default [
  { files: ['**/*.{js,ts,mjs,cjs,vue}'] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node
      },
      ecmaVersion: 2020,
      parserOptions: {
        parser: tseslint.parser
      }
    },
    rules: {
      'no-undef': 'off',
      'no-await-in-loop': 'error',
      'no-var': 'error',
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  }
]
