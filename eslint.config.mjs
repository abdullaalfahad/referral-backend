import js from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier";

export default [
    js.configs.recommended,
    {
        ignores: ["node_modules/**", "dist/**"],
    },
    {
        files: ["**/*.ts", "**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
        plugins: {
            prettier: pluginPrettier,
        },
        rules: {
            "prettier/prettier": "error",
            "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
        },
    },
];
