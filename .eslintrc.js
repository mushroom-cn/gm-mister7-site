module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "plugin:react/jsx-runtime",  "plugin:react-hooks/recommended", "plugin:prettier/recommended"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  settings: {
    react: {
      version: "detect", // React version. "detect" automatically picks the version you have installed.
    },
    "html/html-extensions": [".html"]
  },
  plugins: ["react","html"],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true,endOfLine: "auto" }]
  },
};
