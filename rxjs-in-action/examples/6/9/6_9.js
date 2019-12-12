/**
 *  RxJS 반응형 프로그래밍
 *  예제 6-9 & 6-10
 *  @author Paul Daniels
 *  @author Luis Atencio
 */

 // 예제 6-9
 class Transaction {
  constructor(name, type, amount, from, to = null) {
     this.name = name;
     this.type = type;
     this.from = from;
     this.to   = to;
     this.amount = amount;
  }

  name() {
    return this.name;
  }

  from() {
    return this.from;
  }

  to() {
    return this.to;
  }

  amount() {
    return this.amount;
  }

  type() {
    return this.type;
  }
}

function getTransactionsArray() {
  return [
    new Transaction('Brendan Eich', 'withdraw', 500, 'checking'),
    new Transaction('George Lucas', 'deposit',  800, 'savings'),
    new Transaction('Emmet Brown', 'transfer', 2000, 'checking', 'savings'),
    new Transaction('Bjarne Stroustrup', 'transfer', 1000, 'savings', 'CD'),
  ];
}

const txDb = new PouchDB('transactions');
const accountsDb = new PouchDB('accounts');

// 예제 6-10
const writeTx$ = tx => Rx.Observable.of(tx)
  .timestamp()
  .map(obj => Object.assign({}, obj.value, { 
                date: obj.timestamp
              })
  )
  .do(tx => console.log(`Processing transaction for: ${tx.name}`))
  .mergeMap(datedTx => Rx.Observable.fromPromise(txDb.post(datedTx)));

Rx.Observable.from(getTransactionsArray())
  .concatMap(writeTx$)
  .subscribe(
    rec => console.log(`New record created: ${rec.id}`),
    err => console.log('Error: ' + err),
    ()  => console.log('Database populated!')
  );


// Rx.Observable.from(getTransactionsArray())
//  .concatMap(writeTx$)
//  .subscribe(
//    rec => console.log(`New record created: ${rec.id}`),
//    err => console.log('Error: ' + err),
//    ()  => console.log('Database populated!')
//  );
