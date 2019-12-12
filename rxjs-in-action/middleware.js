/**
 *  RxJS 반응형 프로그래밍
 *  Chapter #
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
const proxy = require('http-proxy-middleware');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const {wikipedia, yahoo, tinyurl} = require('./proxySettings');
const api = require('./api');

module.exports = [
  // Proxy searches to the yahoo finance APIs to avoid CORS issues
  proxy('/external/yahoo', yahoo),
  proxy('/external/wikipedia', wikipedia),
  proxy('/external/tinyurl', tinyurl),

  // Gets our static assets
  serveStatic('dist'),
  serveStatic('node_modules/'),

  // Try parsing the incoming content as json
  bodyParser.json(),

  // Add some api endpoints
  ['/rest/api', api]
];