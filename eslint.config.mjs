import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import perfectionist from 'eslint-plugin-perfectionist';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default defineConfig([
  globalIgnores(['**/dist', '**/.eslintrc.cjs', 'node_modules/*', '**/.next/*', '**/ui/*']),
  {
    extends: fixupConfigRules(
      compat.extends(
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'plugin:sonarjs/recommended-legacy',
        'next/core-web-vitals',
      ),
    ),
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: tsParser,
    },

    plugins: {
      perfectionist,
      'react-refresh': reactRefresh,
    },

    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',

      'perfectionist/sort-imports': [
        'error',
        {
          groups: [['builtin', 'external'], 'internal', 'unknown'],
        },
      ],

      'perfectionist/sort-interfaces': [
        'error',
        {
          type: 'alphabetical',
        },
      ],

      'perfectionist/sort-objects': [
        'error',
        {
          type: 'alphabetical',
        },
      ],
      'prettier/prettier': [
        'error',
        {
          arrowParens: 'always',
          bracketSameLine: true,
          endOfLine: 'auto',
          jsxSingleQuote: true,
          printWidth: 120,
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'all',
        },
      ],

      'react-refresh/only-export-components': 'off',
      'sonarjs/todo-tag': 'warn',
    },
  },
]);
