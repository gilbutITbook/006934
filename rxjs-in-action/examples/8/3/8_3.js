/**
 *  RxJS 반응형 프로그래밍
 *  예제 8-3
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
const websocket = new WebSocket('ws://localhost:1337');

Rx.Observable.fromEvent(websocket, 'message')
  .map(msg => JSON.parse(msg.data))
  .pluck('msg')
  .subscribe(console.log);
