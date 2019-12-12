/**
 *  RxJS 반응형 프로그래밍
 *  예제 8-2
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
const Rx = require('rxjs/Rx');
const WebSocketServer = require('websocket').server;
const http = require('http');

// 웹소켓 포트
const server = http.createServer();
server.listen(1337);

// 서버 생성
wsServer = new WebSocketServer({
  httpServer: server
});

Rx.Observable.fromEvent(wsServer, 'request')
  .map(request => request.accept(null, request.origin))
  .subscribe(connection => {
    connection.sendUTF(JSON.stringify({ msg:'Hello Socket' })); 
  );
