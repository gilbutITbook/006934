/**
 *  RxJS 반응형 프로그래밍
 *  예제 9-6
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
mocha.setup({ ui: 'bdd', checkLeaks: true});

const expect = chai.expect;
const assert = chai.assert;

it('Should add numbers together with delay', function (done) {
  Rx.Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9])
    .reduce((total, delta) => total + delta)
    .delay(1000)
    .subscribe(total => {
      expect(total).to.equal(45);
    }, null, done);
});

mocha.run();
