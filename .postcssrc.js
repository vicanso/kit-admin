// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  parser: 'sugarss',
  plugins: {
    'postcss-normalize': {},
    precss: {},
    'postcss-nested-props': {},
    'postcss-pxtorem': {
      propList: ['*']
    },
    // to edit target browsers: use "browserslist" field in package.json
    autoprefixer: {},
  },
};
