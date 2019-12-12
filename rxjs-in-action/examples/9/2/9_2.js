/**
 *  RxJS 반응형 프로그래밍
 *  예제 9-2
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
mocha.setup({ ui: 'bdd', checkLeaks: true});

const expect = chai.expect;

const assert = chai.assert;

console.log('Ensure CORS is enabled in your browser');

describe('Ajax test', function () {
  it('Should fetch Wikipedia pages for search term reactive programming',
    function (done) {
      this.timeout(20000);
      const searchTerm = 'reactive+programming';
      // Proxy around CORS: /external/wikipedia -> https://en.wikipedia.org
      const url = `/external/wikipedia/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=${searchTerm}`;

      const success = results => {
        alert(results);
        expect(results)
          .to.have.property('query')
          .with.property('search')
          .with.length(10);
        done();
      };

      const error = (err) => {
        alert(err);
        done(err);
      };
      ajax(url, success, error);
  });

  it('Should fail for invalid URL', function (done) {
    this.timeout(20000);

    const url = 'http://localhost:9999';

    const success = data => {
      done(new Error('Should not have been succesful!'));
    };

    const error = (err) => {
      expect(err).to.have.property('message').to.equal('IO Error');
      done();
    };
    ajax(url, success, error);
  });
});

const ajax = function (url, success, error) {
  let req = new XMLHttpRequest();
  req.open('GET', url);
  req.onload = function() {
    if(req.status == 200) {
      let data = JSON.parse(req.responseText);
      success(data);
    }
    else {
      req.onerror();
    }
  }
  req.onerror = function () {
    if(error) {
      error(new Error('IO Error'));
    }
  };
  req.send();
};

mocha.run();
