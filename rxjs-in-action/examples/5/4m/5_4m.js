/**
 *  RxJS 반응형 프로그래밍
 *  예제 5-4 & 5-5 수정
 *  수정 코드 출처: https://github.com/RxJSInAction/rxjs-in-action/issues/13 
 *  수정 코드 작성자: peerreynders
 *  @author Paul Daniels
 *  @author Luis Atencio
 */

const ajax = url => new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open('GET', url);
    req.responseType = 'json';
    req.onload = function() {
      if(req.status == 200) {
        resolve(req.response);
      }
      else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = function () {
      reject(new Error('IO Error'));
    };
    req.send();
  });
  
  /* In proxySettings.js change (don't forget to restart the Gulp script):
  const yahooProxyOptions = {
    target: 'https://query1.finance.yahoo.com',
    changeOrigin: true,
    pathRewrite: {
      '^/external/yahoo': ''
    }
  };
  */
  
  // Proxying around CORS: /external/yahoo -> https://query1.finance.yahoo.com
  // 미국 주식 거래시간에 실행해야 제대로 된 결과값을 얻을 수 있습니다.
  const makeQuotesUrl = (symbols, fields) =>
    `/external/yahoo/v7/finance/quote?&symbols=${symbols.join(',')}&fields=${fields.join(',')}`;
  
  // For the array of symbols fetch the specified fields:
  // e.g. ['currency','ask','regularMarketOpen','regularMarketPrice'] etc.
  const requestQuote$ = (symbols, fields) =>
    Rx.Observable
      .fromPromise(ajax(makeQuotesUrl(symbols,fields)))
      .pluck('quoteResponse','result');
  
  // Periodic quote fetch stream for a single symbol
  const twoSecond$ = Rx.Observable.interval(2000);
  const extract = ([{symbol, currency, ask: price}]) => [symbol, currency, price]; // 3-tuple
  const fetchDataInterval$ = symbol =>
    twoSecond$
     .switchMap(() => requestQuote$([symbol],['currency','ask']))
     .map(extract);
  
  const logResult = ([symbol, currency, price]) =>
    console.log(`${symbol}, ${currency}, ${price.toFixed(2)}`);
  
  fetchDataInterval$('FB')
    .subscribe(logResult);