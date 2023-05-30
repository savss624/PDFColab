module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {},
  overrides: [
    {
      files: ["./fe-apps/src/**/*.js", "./fe-apps/src/**/*.jsx"],
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: ["eslint:recommended", "react-app"],
    },
    {
      files: ["./static/**/*.js"],
      env: {
        browser: true,
        node: true,
        commonjs: true,
      },
      extends: ["eslint:recommended"],
    },
  ],
};
