module.exports = {
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  extends: [
    'plugin:prettier/recommended',
    'plugin:react/recommended'
  ],
  plugins: ['react'],
  rules: {
    "prettier/prettier": [
      "error",
        {
        "singleQuote": true
        }
    ]
  }
};
