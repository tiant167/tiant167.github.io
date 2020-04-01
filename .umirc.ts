import { defineConfig } from 'umi';

export default defineConfig({
  chainWebpack(config) {
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('file')
      .loader('file-loader')
      .options({
        name: '[name].[ext]',
      });
  },
});
