/**
 *  RxJS 반응형 프로그래밍
 *  예제 3-1
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
const progressBar$ = Rx.Observable.create(observer => {
   const OFFSET = 3000;
   const SPEED =  50;

   let val = 0;
   let timeoutId = 0;
   function progress() {
     if(++val <= 100) {
       observer.next(val);
       timeoutId = setTimeout(progress, SPEED);
     }
     else {
       observer.complete();
     }
   };
   timeoutId  = setTimeout(progress, OFFSET);

   return () => { 
      clearTimeout(timeoutId);
    };
});

//--------------------------------------------------//
//                Usage                             //
//--------------------------------------------------//
const subs = progressBar$.subscribe(console.log, null, () => console.log('Complete!'));

setTimeout(() => {
  subs.unsubscribe();
}, 6000);
