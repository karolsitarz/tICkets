module.exports = api => {
  return {
    presets: [
      "@babel/react",
      ["@babel/env", { modules: false }]
    ],
    plugins: [
      "@babel/proposal-object-rest-spread",
      "@babel/plugin-transform-runtime",
      [
        "babel-plugin-styled-components",
        {
          displayName: !api.env("production")
        }
      ]
    ]
  };
};
