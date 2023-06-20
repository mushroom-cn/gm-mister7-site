module.exports = {
    defaultSeverity: 'error',
    
    extends: [ "stylelint-config-standard-scss","stylelint-config-css-modules"],
    plugins: ['stylelint-scss'],
    rules: {
        "indentation": 2
    },
    overrides: [
        {
          files: ["src/**/*.scss"],
          customSyntax: "postcss-scss"
        }
      ]
};