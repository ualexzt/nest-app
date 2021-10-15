module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  root: true,
  env: {
    node: true,
    jest: true
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/dot-notation": "off",
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/explicit-member-accessibility": [
      "off",
      {
        "accessibility": "explicit"
      }
    ],
    "@typescript-eslint/no-inferrable-types": "off",
    "arrow-parens": [
      "error",
      "always",
      {
        "requireForBlockBody": true
      }
    ],
    "brace-style": ["off", "off"],
    "import/order": "off",
    "max-len": [
      "error",
      {
        "ignorePattern": "^import |^export | implements",
        "code": 280
      }
    ],
    "no-underscore-dangle": "off",
    "object-shorthand": "off",
    "quote-props": ["error", "consistent"],
    "quotes": ["error", "single"]
  }
};
