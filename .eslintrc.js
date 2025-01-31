// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "plugin:@tanstack/eslint-plugin-query/recommended"],
  plugins: ["prettier", "@tanstack/query"],
  rules: {
    eqeqeq: "off",
    "prettier/prettier": [
      "error",
      {},
      {
        usePrettierrc: true,
      },
    ],
  },
  ignorePatterns: ["/dist/*"],
};
