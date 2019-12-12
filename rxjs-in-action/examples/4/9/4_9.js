/**
 *  RxJS 반응형 프로그래밍
 *  예제 4-9
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

var timeoutId = null;  

searchBox.addEventListener('keyup', function (event) {

   clearTimeout(timeoutId); 

   timeoutId = setTimeout(function (query) { 
     console.log('querying...');
     let searchResults = [];
     if(query && query.length > 0) {
       for(let result of testData) {
        if(result.startsWith(query)) {
          searchResults.push(result);
        }
       }
     }
     if(searchResults.length === 0) {
       clearResults(results);
     }
     else {
       for(let result of searchResults) {
         appendResult(result, results);
       }
     }
   }, 1000, event.target.value);  
});

function clearResults(container) { 
  while(container.childElementCount > 0) {
     container.removeChild(container.firstChild);
  }
}

function appendResult(result, container) { 
    let li = document.createElement('li');
    let text = document.createTextNode(result);
    li.appendChild(text);
    container.appendChild(li);
}
