module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "plugin:react/jsx-runtime", "plugin:prettier/recommended"],
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
  },
  plugins: ["react"],
  rules: {},
};
