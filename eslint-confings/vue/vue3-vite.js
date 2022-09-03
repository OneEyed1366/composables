module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parser: "vue-eslint-parser",
  plugins: ["prettier"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:prettier-vue/recommended",
    "prettier",
  ],
  ignorePatterns: ["*.d.ts"],
  parserOptions: {
    parser: {
      js: "espree",
      ts: "@typescript-eslint/parser",
      "<template>": "espree",
    },
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": ["error"],
    "vue/script-setup-uses-vars": ["warn"],
  },
};
