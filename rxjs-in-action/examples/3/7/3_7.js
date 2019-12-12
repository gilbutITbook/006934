/**
 *  RxJS 반응형 프로그래밍
 *  예제 3-7
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
let candidates = [
	{name: 'Brendan Eich', experience : 'JavaScript Guru'},
	{name: 'Emmet Brown', experience: 'Historian'},
	{name: 'George Lucas', experience: 'Sci-fi writer'},
	{name: 'Alberto Perez', experience: 'Zumba Instructor'},
	{name: 'Bjarne Stroustrup', experience: 'C++ Developer'}
];



//--------------------------------------------------//
//                Usage                             //
//--------------------------------------------------//
Rx.Observable.from(candidates)
  .pluck('experience')
  .take(2)
  .do(val => console.log(`Visiting ${val}`))
  .subscribe();
  // 출력 "Visiting JavaScript Guru"
  //      "Visiting Historian"
