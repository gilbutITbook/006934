/**
 *  RxJS 반응형 프로그래밍
 *  예제 7-3
 *  @author Paul Daniels
 *  @author Luis Atencio
 */

const ajax = function (url) {
   return new Promise(function(resolve, reject) {  
      let req = new XMLHttpRequest();
      req.responseType = 'json';
      req.open('GET', url);
      req.onload = function() {
         if(req.status == 200) {
            let data = req.response;
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
};


ajax('http://nowhere.com')
  .then(console.log)
  .catch(error => console.log(`Error fetching data: ${error.message}`))
