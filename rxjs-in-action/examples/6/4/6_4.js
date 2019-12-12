/**
 *  RxJS 반응형 프로그래밍
 *  예제 6-4
 *  @author Paul Daniels
 *  @author Luis Atencio
 */

const letter$ = Rx.Observable.interval(1000) 
  .map(num => String.fromCharCode(65 + num))
  .map(letter => `Source 1 -> ${letter}`);

const number$ = Rx.Observable.interval(1000)
  .map(num => `Source 2 -> ${num}`);

Rx.Observable.combineLatest(letter$, number$)
  .take(5)
  .subscribe(console.log);
