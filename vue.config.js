module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/category-tree/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/style.scss";',
      },
    },
  },
};
