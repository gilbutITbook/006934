/**
 *  RxJS 반응형 프로그래밍
 *  Chapter #
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
const connect = require('connect');
const serveStatic = require('serve-static');
const http = require('http');

const app = connect();

app.use(serveStatic('.'));

const server = http.createServer(app)

server.listen(3000, () => {
  console.log('RxJS 반응형 프로그래밍! on port:', server.address().port);
});