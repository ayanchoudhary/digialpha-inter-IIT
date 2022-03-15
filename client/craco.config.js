const cracoAlias = require('craco-alias');

module.exports = {
  reactScriptsVersion: 'react-scripts',
  style: {
    postOptions: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  plugins: [
    {
      plugin: cracoAlias,
      options: {
        source: 'jsconfig',
      },
    },
  ],
};
