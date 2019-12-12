/**
 *  RxJS 반응형 프로그래밍
 *  예제 7-6
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
 Rx.Observable.of(2,4,5,8,10)
   .map(num => {
      if(num % 2 !== 0) {
        throw new Error(`Unexpected odd number: ${num}`);
      }
      return num;
   })
   .catch(err => Rx.Observable.of(6)) 
   .map(n => n / 2)
   .subscribe(
      function next(val) {
         console.log(val);
      },
      function error(err) {
        console.log(`Received error: ${err}`); 
      },
      function complete() {
         console.log('All done!');
      }
    );
