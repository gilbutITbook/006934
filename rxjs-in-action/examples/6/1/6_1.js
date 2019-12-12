/**
 *  RxJS 반응형 프로그래밍
 *  예제 6-1
 *  @author Paul Daniels
 *  @author Luis Atencio
 */

function startWith(value) {
  return Rx.Observable.create(subscriber => {  
    let source = this;
    try {
      subscriber.next(value); 
    }
    catch(err) {
      subscriber.error(err);
    }
    return source.subscribe(subscriber); 
  });
};


Rx.Observable.prototype.startWith = startWith;

Rx.Observable.range(1, 5)
  .startWith(0)
  .subscribe(console.log);
//-> 0,1,2,3,4,5
