/**
 *  RxJS 반응형 프로그래밍
 *  Chapter #
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
const loggingEpic = (console = window.console) => (action$) => action$
  .do(
    action => {
      console.log(`Dispatching [${action.type}]`, action)
    },
    err => console.error(err)
  )
  .ignoreElements();