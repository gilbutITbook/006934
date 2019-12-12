/**
 *  RxJS 반응형 프로그래밍
 *  Chapter #
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
const yahooProxyOptions = {
  target: 'https://query1.finance.yahoo.com',
  changeOrigin: true,
  pathRewrite: {
    '^/external/yahoo': ''
  }
};

const tinyurlProxyOptions = {
  target: 'http://tinyurl.com',
  changeOrigin: true,
  pathRewrite: {
    '^/external/tinyurl': ''
  }
};

const wikipediaProxyOptions = {
  target: 'https://en.wikipedia.org',
  changeOrigin: true,
  pathRewrite: {
    '^/external/wikipedia': ''
  }
};

module.exports = {
  yahoo: yahooProxyOptions,
  wikipedia: wikipediaProxyOptions,
  tinyurl: tinyurlProxyOptions
};