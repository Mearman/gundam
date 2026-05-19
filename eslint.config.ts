import js from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";
import { fixupConfigRules } from "@eslint/compat";
import { defineConfig } from "eslint/config";

const configFiles = [
  "eslint.config.ts",
  "commitlint.config.ts",
  "release.config.ts",
  "lint-staged.config.ts",
];

export default defineConfig(
  { ignores: ["dist/", "node_modules/"] },

  // Source files
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      eslintReact.configs["recommended-typescript"],
      ...fixupConfigRules(jsxA11y.flatConfigs.recommended),
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        document: true,
        window: true,
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { assertionStyle: "never" },
      ],
      "prettier/prettier": "error",
    },
  },

  // Config files — no tsconfig, use allowDefaultProject
  {
    files: configFiles,
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      eslintReact.configs["recommended-typescript"],
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },

  // Disable formatting rules that Prettier handles
  eslintConfigPrettier,
);
