/**
 *  RxJS 반응형 프로그래밍
 *  예제 6-8 수정
 *  수정 코드 출처: https://github.com/RxJSInAction/rxjs-in-action/issues/13 
 *  수정 코드 작성자: peerreynders
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
const Money = function (currency, val) {
  return {
    value() {
      return val;
    },
    currency() {
      return currency;
    },
    toString() {
      return `${currency} ${val}`;
    }
  };
};
  
const makeMoney = (currency,val) => new Money(currency, val);
  
// --- Fetch logic
// Proxying around CORS: /external/yahoo -> https://query1.finance.yahoo.com
// 미국 주식 거래시간에 실행해야 제대로 된 결과값을 얻을 수 있습니다.
const makeQuotesUrl = (symbols, fields) =>
  `/external/yahoo/v7/finance/quote?&symbols=${symbols.join(',')}&fields=${fields.join(',')}`;
  
const requestQuote$ = symbol =>
  Rx.Observable.ajax({
    url: makeQuotesUrl([symbol],['currency','ask']),
    method: 'GET',
    responseType: "json"
  })
   .pluck('response','quoteResponse','result');

// Create an array of fetch observables - one for each symbol
// then process the resulting array of results
const symbols = ['FB', 'AAPL', 'CTXS'];
const extractQuote = ([{symbol, currency, ask: price}]) => [symbol, currency, price]; // 3-tuple
const fetchQuote$ = symbol => requestQuote$(symbol).map(extractQuote);
const sumQuote = ([,sum], [_symbol, currency, price]) => [currency, sum + price];
const sumAllQuotes = allQuotes => allQuotes.reduce(sumQuote, ['',0.0]);
const localeMoney = (currency, val) => makeMoney(currency, val.toLocaleString());
const logTotal = ([currency, total]) => {
  console.log(`Total Portfolio Value: ${localeMoney(currency, total)}`);
};
  
Rx.Observable.forkJoin(
  symbols.map(fetchQuote$)
)
  .map(sumAllQuotes)
  .subscribe(logTotal);