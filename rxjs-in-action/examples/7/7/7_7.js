/**
 *  RxJS 반응형 프로그래밍
 *  예제 7-7
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
const maxRetries = 3;

Rx.Observable.of(2, 4, 5, 8, 10)
  .map(num => {
    if (num % 2 !== 0) {
      throw new Error(`Unexpected odd number: ${num}`);
    }
    return num;
  })
  .retryWhen(errors$ =>
    Rx.Observable.range(0, maxRetries) 
      .zip(errors$, val => val)  
      .mergeMap(i =>    
        Rx.Observable.timer(i * 1000)
          .do(() => console.log(`Retrying after ${i} second(s)...`)))
  )
  .subscribe(console.log);

