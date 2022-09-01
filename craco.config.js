const CracoLessPlugin = require('craco-less');

// check this for var names to modify them: https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#006AFF',
              '@btn-border-radius-base': '8px',
              // '@divider-orientation-margin': '13px',
              '@divider-color': '#D0D5DD',
              // '@font-size-base': '16px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
