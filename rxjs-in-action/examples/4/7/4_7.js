/**
 *  RxJS 반응형 프로그래밍
 *  예제 4-7
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
Rx.Observable.of([1, 2, 3, 4, 5])
      .do(x => console.log(`Emitted: ${x}`)) 
      .delay(200)
      .subscribe(x => console.log(`Received: ${x}`));
