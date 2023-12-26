//lets learn about promise APIs
//There are 6 promise APIs
// 1: Promise.all
// 2: Promise.allSettled
// 3: Promise.race
// 4: Promise.any
// 5: Promise.resolve
// 6: Promise.reject

//lets learn one by one
//In Promise.all, lets say we have 3 promises, 1st promise resolve in 1 sec, 2nd promise resolved in 2sec and 3rd promise resolved in 3 sec
// So Promise.all will wait for all the promise to get resolved and the promise which get resolved last here in our example 3rd promise
//So after the result of 3rd promise i.e after 3 seconds we will have the result of promise.all
//The result will be an array with the order maintained value of the promises
//This is the case of when all the promise is resolved
//Now what if any one of the promise get failed in case of Promise.any
//So now all API will not care about other promise whether those are settled or not
//It will immediately throw the error and it will return the error from the failed promise
//So lets say if 1st promise resolved but 2nd promise gets rejected, so Promise.all will immediately returns the error data and the promise execute will be finised

let pr1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve("Promise 1 success");
    reject("Promise 1 failed");
  }, 1000);
});

let pr2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve("Promise 2 success");
    reject("Promise 2 failed");
  }, 2000);
});

let pr3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve("Promise 3 success");
    reject("Promise 3 failed");
  }, 3000);
});

Promise.any([pr1, pr2, pr3])
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
    // console.log(err.errors); //uncomment in case of aggregate error(promise.any)
  });

//In Promise.allSettled, it will give us the result of settled value of all the promise, if any of the promise get failed, it will still wait for all the
//promise to get settled, so lets say if p1 p2 and p3 gets resolved then we will get the array of resolved promise result
//but if suppose pr1 rejects, pr2 resolves and pr3 also resolves
//now the output would be the array of all the above promise values so it waits untill all the promise get settled

//In Promise.race, it will basically return that particular promise value which is SETTLED first
//So if pr1 takes 5 seconds to settled and pr2 takes only 1 second to settle and that of pr3 takes 3 seconds to settle
//So with Promice.race it will return the first settled promise value , so in our case it will be the value of pr2

//In Promise.any, it will return that particular promise value which is RESOLVED first
//So if pr1 takes 1 seconds to resolve and pr2 takes only 2 second to resolve and that of pr3 takes 3 seconds to resolve
//So with Promise.any, it will return the first resolved promise value and in our example pr1 takes only 1 seconds to resolve
//sp it will return the value from the pr1
//Now suppose if pr1 rejects, so now it will ignore it because promise.any seeks for first resolved promise
//So now pr2 resolves in 2 seconds, so promise.any now will return the value of pr2
//now lets say pr2 reject, and pr3 also gets reject
//as we know that promise.any seeks for first resolved promise and here in our case every promise is getting failed
//so in this case promise.any will return a aggregate error, so it is a object will has a errors property which basically has array of errors
