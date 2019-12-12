/**
 *  RxJS 반응형 프로그래밍
 *  예제 8-4 수정
 *  수정 코드 출처: https://github.com/RxJSInAction/rxjs-in-action/issues/13 
 *  수정 코드 작성자: peerreynders
 *  @author Paul Daniels
 *  @author Luis Atencio
 */

const Money = function (currency, val) {
  return {
    currency: function () {
      return currency;
    },
    value: function () {
      return val;
    },
    toString: function () {
      return `${currency} ${val.toFixed(2)}`;
    }
  };
};

const makeMoney = (currency, val) => new Money(currency, val);

// --- Render logic
const makeRender = (symbolSelect, priceSelect) => {
  const symbolElem = document.querySelector(symbolSelect);
  const priceElem = document.querySelector(priceSelect);

  return ([symbol, currency, price]) => {
    priceElem.innerHTML = makeMoney(currency,price).toString();
    symbolElem.innerHTML = symbol;
  };
};

// --- Fetch logic
// Proxying around CORS: /external/yahoo -> https://query1.finance.yahoo.com
// 미국 주식 거래시간에 실행해야 제대로 된 결과값을 얻을 수 있습니다.

// --- module StockTicker
const makeQuotesUrl = (symbols, fields) =>
  `/external/yahoo/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=${symbols.join(',')}&fields=${fields.join(',')}`;

// fetch quote results for "symbols"
// every "interval" until event on "end$"
const makeQuotesSource = (interval, end$, symbols) => {
  const config = {
    url: makeQuotesUrl(symbols, ['currency','ask']),
    method: 'GET',
    responseType: 'json'
  };
  const makeFetchResults = () =>
    Rx.Observable
      .ajax(config)
      .pluck('response','quoteResponse','result');
  const ticker$ =
    Rx.Observable
      .interval(interval)
      .takeUntil(end$)
      .switchMap(makeFetchResults);

  return ticker$;
};


// StockTicker private support
const _private = Symbol('private');
const _reset = (t) => {
  const p = t[_private];
  p.source$ = null;
  p.stopSource = null;
};
const _makeStop = t =>  {
  const setStopSource = observer  => {
    t[_private].stopSource = () => {
      observer.next(0);
      observer.complete();
      _reset(t);
    };
  };

  return Rx.Observable.create(setStopSource);
};
const _stop = t => {
  const { stopSource } = t[_private];
  if(stopSource){
    stopSource();
  }
};
const _init = (t, symbols) => {
  const tick = ([symbol, currency, price]) => {
    t.emit('tick', symbol, currency, price);
  };
  const onError = (error) => {
    console.log(error);
  };
  const onComplete = () => {
    _reset(t);
    console.log("Complete!");
  };

  return {
    source$: null,
    stopSource: null,
    symbols,
    tick,
    onError,
    onComplete
  };
};

// StockTicker constructor only supports a single symbol
// so there should only be a single quote
const _extractQuote = ([{symbol, currency, ask: price}]) =>
  ([symbol, currency, price]);

// Node.js style EventEmitter
// https://nodejs.org/api/events.html#events_class_eventemitter
//
class StockTicker extends EventEmitter {

  constructor(symbol) {
    super();
    this[_private] = _init(this, [symbol]);
  }

  start() {
    _stop(this);

    const INTERVAL = 2000;
    const TIMEOUT = 10100;
    const p = this[_private];
    const { symbols, tick, onError, onComplete } = p;
    const end$ =
      Rx.Observable
        .timer(TIMEOUT)
        .merge(_makeStop(this));

    p.source$ =
      makeQuotesSource(INTERVAL, end$, symbols)
        .map(_extractQuote)
        .subscribe(tick, onError, onComplete);
  }
  stop() {
    _stop(this);
  }
}
// --- end module StockTicker

// --- Adapt to an EventEmitter
const ticker = new StockTicker('FB');
ticker.start();

const selector = (symbol, currency, price) => ([symbol, currency, price]);
const makeTickerError = _err => Rx.Observable.throw(new Error('Stock ticker exception'));
const tick$ =
  Rx.Observable
    .fromEvent(ticker, 'tick', selector)
    .catch(makeTickerError);

// --- Subscriptions
const stopTicker = error => {
  ticker.stop();
};
const sub1 = tick$.subscribe(
  makeRender('#company','#price'),
  stopTicker
);
const sub2 = tick$.subscribe(
  makeRender('#company2','#price2'),
  stopTicker
);