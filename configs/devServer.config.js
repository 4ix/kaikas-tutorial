const path = require("path");

module.exports = {
  contentBase: path.resolve(__dirname, "../static"),
  host: "localhost", //로컬호스트로 접근 가능하게 수정
  port: 8888,
  compress: true,
  historyApiFallback: true,
  hot: true,
  inline: true,
  open: true,
};
