/**
 *  RxJS 반응형 프로그래밍
 *  예제 4-1
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
const source$ = Rx.Observable.create(observer => {
    const timeoutId = setTimeout(() => {
      observer.next();
      observer.complete();
    }, 1000);

    return () => clearTimeout(timeoutId);
  });

source$.subscribe(() =>
  document.querySelector('#panel').style.backgroundColor = 'red');
