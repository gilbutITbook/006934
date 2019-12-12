/**
 *  RxJS 반응형 프로그래밍
 *  예제 3-3
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
 Rx.Observable.from([
   'The quick brown fox',
   'jumps over the lazy dog'
   ])
   .map(str => str.split(' '))
   .do(arr => console.log(arr.length))
   .subscribe(console.log);
