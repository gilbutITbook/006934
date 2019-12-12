/**
 *  RxJS 반응형 프로그래밍
 *  예제 4-2
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
Rx.Observable.timer(1000) 
  .subscribe(()=>
     document.querySelector('#panel').style.backgroundColor = 'red');
