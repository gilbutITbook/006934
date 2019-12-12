
/**
 *  RxJS 반응형 프로그래밍
 *  예제 7-9 수정
 *  수정 코드 출처: https://github.com/RxJSInAction/rxjs-in-action/issues/13 
 *  수정 코드 작성자: peerreynders
 *  Note: make sure you have turned on CORS sharing in you browser so that you can make
 *  cross-site requests
 *  @author Paul Daniels
 *  @author Luis Atencio
 */

class Try {
    constructor(val) {
      this._val = val;
    }
  
    static of(val) {
      if(val === null || val.constructor === Error
        || val instanceof Error) {
               return new Failure(val);
      }
      return new Success(val);
    }
  
    map(fn) {
      try {
        return Try.of(fn(this._val));
      }
      catch (e) {
        return Try.of(e);
      }
    }
  }
  
  class Success extends Try {
    getOrElse(anotherVal) {
      return this._val;
    }
  
    getOrElseThrow() {
      return this._val;
    }
  }
  
  class Failure extends Try {
    map(fn) {
      return this;
    }
  
    getOrElse(anotherVal) {
      return anotherVal;
    }
  
    getOrElseThrow() {
      if(this._val !== null) {
        throw this._val;
      }
    }
  }
  
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
  
  const USDMoney = Money.bind(null, 'USD');
  var sData = {};
  const ajax = url => new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function() {
      if(req.status == 200) {
        let data = req.responseText;
        sData = req.responseText
        resolve(data);
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
  
  // Proxying around CORS: /external/yahoo -> https://query1.finance.yahoo.com
  // 미국 주식 거래시간에 실행해야 제대로 된 결과값을 얻을 수 있습니다.
  const csv = str => str.split(/,\s*/);
  const webservice = '/external/yahoo/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=$symbol';
  const currency = 'usd';
  
  const requestQuote$ = symbol =>
    Rx.Observable.fromPromise(
      ajax(webservice.replace(/\$symbol/, symbol)))
        .map(response => response)
        .catch(() => Rx.Observable.of([new Error('Check again later...'), 0]))
        .finally(() => {
          updateSubscription.unsubscribe();
        });
  
  const twoSecond$ = Rx.Observable.interval(2000);
  
  const updateSubscription = twoSecond$.subscribe(() => {
    console.log('Last update:' + new Date().toLocaleTimeString());
  });
  
  const fetchDataInterval$ = symbol => twoSecond$
    .mergeMap(() => requestQuote$(symbol));
  
  const symbols$ = Rx.Observable.of('FB', 'CTXS', 'AAPL');
  
  const table = document.querySelector('#stocks-table');
  
  const ticks$ = symbols$.mergeMap(fetchDataInterval$);
  
  const addRow = (id, symbol,  price) => {
    let row = document.createElement('tr');
    row.setAttribute('id', id);
    let symbolElem = document.createElement('td');
    let priceElem = document.createElement('td');
  
    symbolElem.innerHTML = symbol;
    priceElem.innerHTML = new USDMoney(price).toString();
  
    row.appendChild(symbolElem);
    row.appendChild(priceElem);
    table.appendChild(row);
  };
  
  const updateRow = (rowElem, symbol, price) => {
    let [symbolElem, priceElem] = rowElem.childNodes;
    symbolElem.innerHTML = symbol;
    priceElem.innerHTML = new USDMoney(price).toString();
  };
  
  ticks$
    .map(([symbol, price]) => [Try.of(symbol).getOrElseThrow(), price])
    .subscribe(
      ([symbol, price]) => {
        let jData = JSON.parse(sData);
        let rData = jData.quoteResponse.result[0]
        let id = 'row-' + rData.symbol;
        symbol = rData.symbol;
        price = rData.ask;
           let row = document.querySelector(`#${id}`);
           if(!row) {
               addRow(id, symbol, price);
           }
           else {
                updateRow(row, symbol, price);
           }
      },
    error => console.log(error.message));
  