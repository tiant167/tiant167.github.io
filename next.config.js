const dataSet = require('./markdown/data.json')
const withLess = require('@zeit/next-less')
// const withNextAntdLess = require('./next-antd-less.config');

module.exports = withLess({
  cssModules: false,
  exportTrailingSlash: true,
  lessLoaderOptions: {
    cssModules: false,
    javascriptEnabled: true
  },
  antdLessLoaderOptions: {
    javascriptEnabled: true
  },
  exportPathMap: async function() {
    const paths = {
      '/': { page: '/'},
      '/about': { page: '/about' }
    }

    dataSet.forEach(data => {
      paths[`/p/${data.filename}`] = { page: '/p/[filename]', query: { filename: data.filename } };
    })
    return paths
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    return config
  }
})
