import react from "eslint-plugin-react";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "build",
        "**/.eslintrc.js",
        "node_modules/*",
        ".docusaurus/*",
        "**/*.md",
        "**/*.mdx",
        "static/*",
        "*.js",
        "*.mjs"
    ],
}, ...compat.extends("plugin:@docusaurus/recommended"), {
    plugins: {
        react,
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },

            project: ["./tsconfig.json"],
            tsconfigRootDir: "./",
        },
    },

    rules: {
        "@docusaurus/no-untranslated-text": 0,

        "react/no-unknown-property": ["error", {
            ignore: ["*"],
        }],
    },
}];