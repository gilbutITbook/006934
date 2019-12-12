/**
 *  RxJS 반응형 프로그래밍
 *  예제 8-5 수정
 *  수정 코드 출처: https://github.com/RxJSInAction/rxjs-in-action/issues/13 
 *  수정 코드 작성자: peerreynders
 *  @author Paul Daniels
 *  @author Luis Atencio
 */

// 예제 8-5 Version: No need for "share()" on ticks$

const Money = function (currency, val) {
  return {
    currency: function () {
      return currency;
    },
    value: function () {
      return val;
    },
    toString: function () {
      return `${currency} ${Number(val).toFixed(2)}`;
    }
  };
};
  
const makeMoney = (currency, val) => new Money(currency, val);
  
// --- Render logic
const UP = {className: 'green-text', icon: 'up-green'};
const DOWN = {className: 'red-text', icon: 'down-red'};
  
const priceChangeHtml = change => {
  const {className, icon} = change < 0 ? DOWN : UP;
  const content = Number(Math.abs(change)).toFixed(2);
  return `<span class="${className}"><span class="${icon}">(${content})</span></span>`;
};
  
const updateRow = (rowElem, {currency, price, change}) => {
  let [, priceElem, changeElem] = rowElem.childNodes;
  priceElem.innerHTML = makeMoney(currency, price).toString();
  changeElem.innerHTML = priceChangeHtml(change);
};
  
const table = document.querySelector('#stocks-table');
  
const addRow = (id, quote) => {
  let symbolElem = document.createElement('td');
  let priceElem = document.createElement('td');
  let changeElem = document.createElement('td');
  let row = document.createElement('tr');
  
  row.setAttribute('id', id);
  row.appendChild(symbolElem);
  row.appendChild(priceElem);
  row.appendChild(changeElem);
  
  updateRow(row, quote);
  symbolElem.innerHTML = quote.symbol;
  
  table.appendChild(row);
};
  
const makeSymbolId = symbol => `row-${symbol.toLowerCase()}`;
const queryRowById = id => document.querySelector(`#${id}`);
  
const render = (quote) => {
  const id = makeSymbolId(quote.symbol);
  const row = queryRowById(id);
  if(!row) {
    addRow(id, quote);
  } else {
    updateRow(row, quote);
  }
};
  
// --- Fetching logic
// Proxying around CORS: /external/yahoo -> https://query1.finance.yahoo.com
// 미국 주식 거래시간에 실행해야 제대로 된 결과값을 얻을 수 있습니다.
const makeQuotesUrl = (symbols, fields) =>
  `/external/yahoo/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=${symbols.join(',')}&fields=${fields.join(',')}`;

const makeQuoteError = _err =>
  Rx.Observable.throw(
    new Error('Stock data not available. Try again later!')
  );
  
// For the array of symbols fetch the specified fields:
// e.g. ['currency','ask','regularMarketOpen','regularMarketPrice'] etc.
const requestQuote$ = (symbols, fields) => {
  const config = {
    url: makeQuotesUrl(symbols, fields),
    method: 'GET',
    responseType: 'json'
  };
  const fetchResults$ =
    Rx.Observable
      .ajax(config)
      .retry(3)
      .catch(makeQuoteError)
      .pluck('response','quoteResponse','result');
  
  return fetchResults$;
};
  
// Periodic fetch stream - multiple symbols per fetch with all the fields needed
// "groupBy" creates a separate stream for each symbol
// so each distinctUntilChanged will only ever "see" quotes with the same symbol
// all the quotes are then merged again to a single stream with "mergeAll"
const twoSecond$ = Rx.Observable.interval(2000);
const extract = ({symbol, currency, ask: price, regularMarketOpen: open}) =>
  ({ symbol, currency, price, change: price - open});
const extractAll = results => results.map(extract);
const priceNotChanged = ({price: previous}, {price: next}) => Number(previous).toFixed(2) === Number(next).toFixed(2);
const makeSymbolQuoteChanged = symbolQuote$ => symbolQuote$.distinctUntilChanged(priceNotChanged);
const fetchDataInterval$ = symbols =>
  twoSecond$
    .switchMap(() => requestQuote$(symbols,['currency','ask','regularMarketOpen']))
    .mergeMap(extractAll)
    .groupBy(({symbol}) => symbol)
    .map(makeSymbolQuoteChanged)
    .mergeAll();
  
// Launch a single stream to periodically fetch quotes for all the specified symbols
const symbols = ['AAPL', 'CTXS', 'FB'];
const ticks$ = fetchDataInterval$(symbols);

ticks$.subscribe(
  render,
  error => console.log(error.message)
);

