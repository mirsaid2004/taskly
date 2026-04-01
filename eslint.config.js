// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import tseslint from 'typescript-eslint'
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-config-prettier'
import testingLibrary from 'eslint-plugin-testing-library'
import vitest from 'eslint-plugin-vitest'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([globalIgnores(['dist']), {
  files: ['**/*.{ts,tsx}'],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
    react.configs.flat.recommended,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
    importPlugin.flatConfigs.recommended,
    jsxA11y.flatConfigs.recommended,
    prettier
  ],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    }
  },
  settings: {
    react: {
      version: 'detect'
    },

    'import/resolver': {
      typescript: {
        project: './tsconfig.json'
      }
    }
  },
  rules: {
    'no-console': 'warn',
    'react/button-has-type': 'error',
    'react/react-in-jsx-scope': ['off'],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
  }
}, {
  files: ['**/*.{spec,test}.{ts,tsx}'],
  extends: [js.configs.recommended, ...tseslint.configs.recommended, prettier],
  plugins: { 'testing-library': testingLibrary, vitest },

  rules: {
    'testing-library/await-async-queries': 'error',
    'testing-library/no-await-sync-queries': 'error',
    'testing-library/no-debugging-utils': 'warn',
    'testing-library/no-dom-import': 'off',
    ...vitest.configs.recommended.rules,
    'vitest/max-nested-describe': ['error', { max: 3 }]
  }
}, ...storybook.configs["flat/recommended"]])
