
# RxJS 반응형 프로그래밍

- 이 저장소는 [RxJS 반응형 프로그래밍]의 두 예제 프로젝트를 담고 있습니다. 

- rxjs-in-action 폴더에는 1장부터 9장까지 장별 코드가 담긴 간단한 애플리케이션이 있으며 모든 예제는 사용자가 실습할 수 있게 실행 가능한 RxJS 코드로 제공됩니다.

- banking-in-action 폴더에는 리액트와 리덕스 구조가 포함된 RxJS 웹 애플리케이션이 있습니다.

- 이 책에서 실습하는 일부 API는 교차 출처 자원 공유(CORS, Cross-origin Resource Sharing)를 허용하지 않습니다. 확장 프로그램이나 추가 기능을 설치하여 브라우저 수준에서 사용하지 않도록 설정하여 이 문제를 해결할 수 있습니다. 

- 이 책의 모든 예제 코드는 RxJS 5.5.11에서 테스트했습니다. RxJS 6 버전으로 테스트할 경우 일부 코드를 수정해야 합니다.

- 5~8장에서 사용한 야후 API는 현재 CSV 형태가 아닌 JSON 형태로 제공하고 있어서 원서 코드로는 예제를 실행할 수 없습니다. 독자(peerreynders)가 바뀐 내용 적용하여 작성한 코드가 원서 깃허브(https://github.com/RxJSInAction/rxjs-in-action/issues/13) 에 공유되어 있습니다. 해당 내용을 참고하여 작성한 코드를 길벗 깃허브에 올려두었습니다(파일명으로 구분됨, 예: 5_6m.js). 해당 코드를 받아 예제를 실행해 보거나 해당 내용을 참고하여 원본 코드를 직접 수정하여 실행해 보기 바랍니다.


## 프로젝트 실행 방법
#### 리포지터리 복제
```
git clone https://github.com/gilbutITbook/006934.git
cd 006934
```

#### rxjs-in-action 예제 실행
```
cd rxjs-in-action
npm install
npm start
// 브라우저 주소창에 localhost:8080 입력하고 열기
```

#### banking-in-action 예제 실행
```
cd banking-in-action
npm install
npm start
// 브라우저 주소창에 localhost:3000 입력하고 열기
```
