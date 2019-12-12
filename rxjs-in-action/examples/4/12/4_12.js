/**
 *  RxJS 반응형 프로그래밍
 *  예제 4-12
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
let testData = [
    'github.com/Reactive-Extensions/RxJS',
    'github.com/ReactiveX/RxJS',
    'xgrommx.github.io/rx-book',
    'reactivex.io',
    'egghead.io/technologies/rx',
    'rxmarbles.com',
    'https://www.manning.com/books/rxjs-in-action'
	];

const searchBox = document.querySelector('#search'); //-> <input>
const results = document.querySelector('#results');  //-> <ul>

const notEmpty = input => !!input && input.trim().length > 0;

const sendRequest = function(arr, query) {
  return arr.filter(item => {
    return query.length > 0 && item.startsWith(query);
  });
};

Rx.Observable.fromEvent(searchBox, 'keyup')
  .debounceTime(1000)
  .pluck('target', 'value')
  .filter(notEmpty)
  .do(query => console.log(`Querying for ${query}...`))
  .map(query =>
    sendRequest(testData, query))
  .forEach(result => {
    clearResults(results);
    appendResults(result, results);
  });

function clearResults(container) {
  while(container.childElementCount > 0) {
    container.removeChild(container.firstChild);
  }
}

function appendResults(results, container) {
  for (let result of results ) {
    let li = document.createElement('li');
    let text = document.createTextNode(result);
    li.appendChild(text);
    container.appendChild(li);
  }
}
