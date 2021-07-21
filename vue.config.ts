module.exports = {
  css: {
      loaderOptions: {
          scss: {
              additionalData: `
                @import "@/styles/base.scss";
              `
          }
      }
  }
};