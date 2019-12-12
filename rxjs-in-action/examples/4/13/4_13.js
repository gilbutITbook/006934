/**
 *  RxJS 반응형 프로그래밍
 *  예제 4-13
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
Rx.Observable.fromEvent(document, 'mousemove')
  .throttleTime(2000)
  .subscribe(event => {
     console.log(`Mouse at: ${event.x} and ${event.y}`);
  });
