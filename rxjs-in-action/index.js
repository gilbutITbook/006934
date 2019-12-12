/**
 *  RxJS 반응형 프로그래밍
 *  Chapter #
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
const connect = require('connect');
const http = require('http');

const app = connect();
const middleware = require('./middleware');

// Add the middleware
for (let ware of middleware) {
  if (Array.isArray(ware)) {
    app.use.apply(app, ware);
  } else {
    app.use(ware);
  }
}

// Build a server
const server = http.createServer(app);

// Spin up the server instance
server.listen(8080, () => {
  console.log('\n\nRxJS 반응형 프로그래밍 예제! on port:', server.address().port);
});