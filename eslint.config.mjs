import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import markdown from "eslint-plugin-markdown";

export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...markdown.configs.recommended,
  pluginReactConfig,
  {
    files: ["**/*.md/*.js", "**/*.md/*.ts", "**/*.md/*.json"],
    rules: {
      "indent": ["error", 2]
    }
  }
];