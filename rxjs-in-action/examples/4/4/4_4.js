/**
 *  RxJS 반응형 프로그래밍
 *  예제 4-4
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
const Money = function (currency, val) {
  return {
    value: function () {
      return val;
    },
    currency: function () {
      return currency;
    },
    toString: function () {
      return `${currency} ${val}`;
    }
  };
};

const newRandomNumber = () => Math.floor(Math.random() * 100);

const USDMoney = Money.bind(null, 'USD');

Rx.Observable.interval(2000)
  .skip(1)
  .take(5)
  .map(num => new USDMoney(newRandomNumber()))
  .map(usd => usd.toString())
  .forEach(console.log);
