/**
 *  RxJS 반응형 프로그래밍
 *  예제 3-5
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
const add = (x, y) => x + y;

Rx.Observable.from([
    {
       date: '2019-07-01',
       amount: -320.00,
    },
    {
       date: '2019-07-13',
       amount: 1000.00,
    },
    {
       date: '2019-07-22',
       amount: 45.0,
    },
  ])
  .pluck('amount')
  .reduce(add, 0)
  .subscribe(console.log);
