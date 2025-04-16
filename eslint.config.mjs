import json from '@eslint/json';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: ['node_modules/**', 'dist/**'], 
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        browser: true,
        node: true
      }
    },
    rules: {
      'no-console': 'warn',
      'indent': ['error', 2],
      'quotes': ['error', 'single']
    }
  }
]);