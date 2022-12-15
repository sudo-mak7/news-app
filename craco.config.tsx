const path = require('path')
module.exports = {
  webpack: {
    alias: {
      '@api': path.resolve(__dirname, './src/api/'),
      '@common-types': path.resolve(__dirname, './src/common-types/'),
      '@components': path.resolve(__dirname, './src/components/'),
      '@pages': path.resolve(__dirname, './src/pages/'),
      '@redux': path.resolve(__dirname, './src/redux/'),
      '@utils': path.resolve(__dirname, './src/utils/')
    }
  }
}