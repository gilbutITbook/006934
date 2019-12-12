/**
 *  RxJS 반응형 프로그래밍
 *  예제 4-3
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
const source$ = Rx.Observable.create(observer => {
   let num = 0;
   const id = setInterval(() => {
      observer.next(`Next ${num++}`);
	}, 2000); 

	return () => {  
	   clearInterval(id);
	}
});

const subscription = source$.subscribe(
   next  => console.log(next),  
   error => console.log(error.message),
);

setTimeout(function () {  
	subscription.unsubscribe();
   console.log('Done!')
}, 8000);
