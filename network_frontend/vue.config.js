module.exports = {
  devServer: {
    public: "0.0.0.0:8080"
  },
  chainWebpack: config => {
    config.module
      .rule("graphql")
      .test(/\.(graphql|gql)$/)
      .use("graphql-tag/loader")
      .loader("graphql-tag/loader")
      .end();
  }
};
