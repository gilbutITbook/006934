/**
 *  RxJS 반응형 프로그래밍
 *  예제 6-2 & 6-3
 *  @author Paul Daniels
 *  @author Luis Atencio
 */

 // 예제 6-2
class SessionDisposable {
  constructor(sessionToken) {
    this.token = sessionToken;
    this.disposed = false;
    let expiration = moment().add(1, 'days').toDate(); 
    document.cookie = `session_token=${sessionToken}; expires=${expiration.toUTCString()}`;   
    console.log('Session created: ' + this.token);
  }

  getToken() {
    return this.token;
  }

  unsubscribe() { 
    if (!this.disposed) {
      this.disposed = true;
      this.token = null;
      document.cookie = 'session_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      console.log('Ended session! This object has been disposed.');
    }
  }
}

// 예제 6-3
function generateSessionToken() {
  return 'xyxyxyxy'.replace(/[xy]/g, c => {
    return Math.floor(Math.random() * 10);
  });
}

const $countDownSession = Rx.Observable.using(
  () => new SessionDisposable(generateSessionToken()),
  () => Rx.Observable.interval(1000)
                     .startWith(10)
                     .scan(val => val - 1)
                     .take(10)
);

$countDownSession.subscribe(console.log);
