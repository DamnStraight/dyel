module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          "alias": {
            "@App": "./app",
            "@Root": ".",
          },
          "extensions": [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
          ]
        },
      ],
    ],
  };
};
