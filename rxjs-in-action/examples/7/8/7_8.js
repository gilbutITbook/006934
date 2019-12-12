/**
 *  RxJS 반응형 프로그래밍
 *  예제 7-8
 *  @author Paul Daniels
 *  @author Luis Atencio
 */

const maxRetries = 3;

Rx.Observable.of(2,4,5,8,10)
  .map(num => {
    if(num % 2 !== 0) {
      throw new Error(`Unexpected odd number: ${num}`);
    }
    return num;
  })
  .retryWhen(errors$ =>
    Rx.Observable.range(0, maxRetries + 1)
      .zip(errors$, (i, err) => ({'i': i, 'err': err})) 
      .mergeMap( ({i, err}) => {    
        if(i === maxRetries) {
          return Rx.Observable.throw(err);  
        }
        return Rx.Observable.timer(i * 1000)
          .do(() =>
            console.log(`Retrying after ${i} second(s)...`));
      })
  )
  .subscribe(
    console.log,
    error => console.log(error.message)
  );
