/**
 *  RxJS 반응형 프로그래밍
 *  예제 5-6 수정
 *  수정 코드 출처: https://github.com/RxJSInAction/rxjs-in-action/issues/13 
 *  수정 코드 작성자: peerreynders
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
console.log('Note: Please turn on CORS in your browser');
const Money = function (currency, val) {
  return {
    value: function () {
      return val;
    },
    currency: function () {
      return currency;
    },
    toString: function () {
      return `${currency} ${val.toFixed(2)}`;
    }
  };
};
const makeMoney = (currency, val) => new Money(currency, val);

// --- Render logic
const updateRow = (rowElem, currency, price) => {
  let [ , priceElem] = rowElem.childNodes;
  priceElem.innerHTML = makeMoney(currency, price).toString();
};

const table = document.querySelector('#stocks-table');

const addRow = (id, symbol,  currency, price) => {
  let symbolElem = document.createElement('td');
  let priceElem = document.createElement('td');
  let row = document.createElement('tr');

  symbolElem.innerHTML = symbol;
  priceElem.innerHTML = makeMoney('USD', price).toString();

  row.setAttribute('id', id);
  row.appendChild(symbolElem);
  row.appendChild(priceElem);
  table.appendChild(row);
};

const render = ([symbol, currency, price]) => {
  let id = 'row-' + symbol.toLowerCase();
  let row = document.querySelector(`#${id}`);
  if(!row) {
    addRow(id, symbol, currency, price);
  } else {
    updateRow(row, currency, price);
  }
};

// -- Fetch logic
// Proxying around CORS: /external/yahoo -> https://query1.finance.yahoo.com
// 미국 주식 거래시간에 실행해야 제대로 된 결과값을 얻을 수 있습니다.
const ajax = url => new Promise((resolve, reject) => {
  let req = new XMLHttpRequest();
  req.open('GET', url);
  req.responseType = 'json';
  req.onload = function() {
    if(req.status == 200) {
      resolve(req.response);
    } else {
      reject(new Error(req.statusText));
    }
  };
  req.onerror = function () {
    reject(new Error('IO Error'));
  };
  req.send();
});

const makeQuotesUrl = (symbols, fields) =>
  `/external/yahoo/v7/finance/quote?&symbols=${symbols.join(',')}&fields=${fields.join(',')}`;

// For the array of symbols fetch the specified fields:
// e.g. ['currency','ask','regularMarketOpen','regularMarketPrice'] etc.
const requestQuote$ = (symbols, fields) =>
  Rx.Observable
    .fromPromise(ajax(makeQuotesUrl(symbols, fields)))
    .pluck('quoteResponse','result');

// Periodic quote fetch stream for a single symbol
const twoSecond$ = Rx.Observable.interval(2000);
const extract = ([{symbol, currency, ask: price}]) => [symbol, currency, price]; // 3-tuple
const priceNotChanged = ([,, previous], [,, next]) => previous === next;
const fetchDataInterval$ = symbol =>
  twoSecond$
    .switchMap(() => requestQuote$([symbol], ['currency','ask']))
    .map(extract)
    .distinctUntilChanged(priceNotChanged);

// Use the symbol stream to launch a separate periodic fetch stream for each symbol
// and merge all the events coming from all those streams
const symbols$ = Rx.Observable.from(['FB', 'CTXS', 'AAPL']);

const ticks$ = symbols$.mergeMap(fetchDataInterval$);

ticks$.subscribe(
  render,
  error => console.error(error.message)
);