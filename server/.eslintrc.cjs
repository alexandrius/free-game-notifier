module.exports = {
  extends: ["eslint-config-airbnb-base", "prettier"],
  rules: {
    "import/no-extraneous-dependencies": 0,
  },
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
};
