/**
 *  RxJS 반응형 프로그래밍
 *  예제 3-4
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
const isNumericalKeyCode = code => code >= 48 && code <= 57;
const input = document.querySelector('#input');
Rx.Observable.fromEvent(input, 'keyup')
  .pluck('keyCode')
  .filter(isNumericalKeyCode)
  .subscribe(code => console.log(`User typed: ${String.fromCharCode(code)}`));
