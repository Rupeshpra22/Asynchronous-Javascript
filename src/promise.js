console.log("promise");

//Promise are use to handle asynchronous operation in javascript
//Lets first see how things used to work before promise
//And we all know callback functions were used to achive
//Asynchronous function and to do async operations

//Lets take an example of ecommerce application where we want to order some products from the cart
//and once the order is completed we will proceed with the payment.

//Now both this steps are asynchronous because we dont know how much time this will take.
//And this steps are dependent on each other like we will go with payment only once we are done with the orders

//So we have 2 apis
//1: createOrder(cart) -> which takes cart and on its execution completion it will return orderId
//2: payment(orderId) -> payment method takes orderId as a parameter which we will receive from createOrder function

//So back in old days we use to handle such situation using callback function
// let cart = ["Kaju", "Badam", "Pista"];
// createOrder(cart, function (orderId) {
//   payment(orderId);
// });

//Now its the responsibility of our createOrder function to do with its oen execution and call the payment function
//Basically we have given the control of payment method to createOrder function

//So we handle the above issues by using promises

//So we will design our code in such a way that we dont need to pass payment method as a callback to the createOrder function
//Now our createOrder function will return a promise
//Promise is nothing but a object which will have {data: <whatever returns by createOrder function>}

//Our createOrder function is a async operation because we dont know how much time it will going to take
//It might take 5 seconds or it might take 10 seconds, we dont know

//So this function createOrder whenever gets called will quickly returns promise {data: undefined}
//Initially may be with undefined value because the execution is in progress and as it is a async operation
//We dont want our application to be unresponsive hence promise quickly returns us with some object with some
//undefined value and still making user to do other events with the application which is want async programming do.

//Once the execution gets complete, the undefined value will get replaced by the data given byt createOrder function

//So initially createOrder -> {data: undefined}
//After 5 seconds
//createOrder -> {data: orderId}

// const promise = createOrder(cart) //returns a promise and on completion of its execution gives us orderId

//Now how to handle proceed to payment, how to continue to program once we have orderId with us, how to use It
//So for above scenario, to handle it we have a function called then which takes a callback function

//promise object has this then method which in takes a callback function.
//So once we get data from the promise this then method will get execute

//Our code will look like below
//const promise = createOrder(cart);
//promise.then(function(orderId){
//  payment(orderId)
//})

//So now how does promise are more efficient or more preferred way than callbacks
//the reason is because in callback we were giving the control of payments method to createOrder method and
//we were not sure that how and when our payment method will get run.
//But in promise we know once our createOrder function execution will be done, and our promise object gets filled with some data
//No matter if successful data or the failed data then only the then method will get called which we get from promise object
//So promise gives us the control of our payment method here, we are sure that it will only get execute once the createOrder execution
//is completed

//Lets dive deep into Promise returned object
//So far we learnt that promise object returns data property but it is not the only property return by promise object

//Now lets try to do api call to github server
let GITHUB_API = "https://api.github.com/users/rupeshpra22";

let user = fetch(GITHUB_API); //fetch is the browser feature which we use to do api call to severs
//By design of fetch function, it returns a promise
//Now as soon the javascript execute the above code, it will returns the promise with the object
//That object will be like below
// [[prototype]]: promise
// [[promiseState]]: "pending" //this promise is currently in a pending state
// [[promiseResult]]: undefined //whatever we were talking about empty object or data will be undefined was nothing but this property

//There are 3 promise state, initially when ever the calls happen
//it will be pending state
//if the promise is successfull, then state will change to fulfilled
//if the promise is failed, then state will change to rejected
//Any property which is under [[]] are hidden property which we cannot access in the code
//user variable will have undefined value above

console.log(user);
//So lets say we quickly run the above code, then user will log promise object with state as pending and result as undefined
//So initially it will be in pending state and once the execution is successfull then the state will be fulfilled

// If we do like below
user.then((data) => {
  console.log(data);
});

// so here we can add a then method to handle the promise object
//then method comes from promise object and the callback function which we pass to the then method
//will automatically gets the [[Promiseresult]]
//Now in promise result we have a lot of information but we mostly care about the data given by the api
//So to extract data from the promise result we can convert the promise result to proper data ny using json method over the promise result
//which in turn also returns the promise.

//This promise object are immutable, no only can change this promise object

//So promise is the object representing the eventual completion or failure of asynchronous operation.

//Now lets learn about promise chaining
//In Callback functions we saw when there are some series of api calls which are dependent
//then we used callback functions and the code were something like below:

// api.createOrder(cart, function () {
//   api.payment(function () {
//     api.orderSummary(function () {
//       api.updateWallet();
//     });
//   });
// });

//Now we know the problem with above code
// 1: Callback hell
// 2: Inversion of control

//To solve such scenario we have promises which give us control over our code and helps to write more maintable and managable code
//So the above code will look like below in promises

// api.createOrder(cart)
// .then(function(orderId){ //here we are attaching a callback function
//     return api.payment(orderId);
// })
// .then(function(summary){
//     return api.orderSummary(summary)
// })
// .then(function(){
//     return api.updateWallet()
// })

//Note that if we do not return promise from one level to another then the callback function
//in the next chain wont get the returned value from its parent promise chain, else that value will be undefined
//So we have to return the promise so that the data flows throughout the chain

//We can also rewrite the above code in much smaller way by using arrow function
// api.createOrder(cart)
// .then((orderId) => api.payment(orderId))
// .then((summary) => api.orderSummary(summary))
// .then(() => api.updateWallet())

//Now lets see how we can create our own promise

//We create promise using Promise constructor where we pass a function which in turn takes two parameters
//1: resolve
//2: reject
//This will be automatically provided by javascript
//Now based on the condition we can either resolve a promise or reject a promise

//for eg:
// function createOrder(cart) {
//   const promise = new Promise(function (resolve, reject) {
//     if (!validateCart(cart)) {
//       const err = new Error("Cart is not validated");
//       reject(err);
//     }

//     let orderId = "12345";
//     if(orderId){
//         resolve("Order is successfull")
//     }
//   });
//   return promise;
// }

//createOrder(cart) //consuming promise
// .then(function(orderId){ //the attached callback to the then method will get execute once the promise is fullfilled or resolve by the promise
//     console.log(orderId)
// })

//Now suppose our promise is rejected
//to handle rejected promise, we can use catch method which is again given by promise object

//If we do not handle the error and run the above code, we will get error in the console
//To handle it, we will use the catch method
//So our above code will be like below:
//createOrder(cart)
// .then(function(orderId){ //this will get execute when the promise is fullfilled
//     console.log(orderId) //lets say here we have a debugger point, we know that this code will only get execute once the promise is resolved
// which means we would be having our promise result and state, so at this line our promise state would be fulfilled and promise result would be Order is successfull
// })
// .catch(function(err){ //this will get execute when the promise is rejected
//     console.log(err.message) //Now in console there wont be any red error but it will print the message we provided in the reject block in our promise, thereby handling the error
// now suppose if we have a debugger point here, we know that the above line will get execute only when the promise is rejected or if it is throwing an error(throw new Error("your error"))
//So at this point your promise state would be rejected and your promise result would be the error message
// })

// let cart = ["orange", "kiwi", "papaya"];

// function isCartValidated(cart){
//     return false;
// }

// function createOrder(cart){
//     let promise = new Promise(function(resolve, reject){
//         if(!isCartValidated(cart)){
//             const err = new Error("Cart is not valid");
//             reject(err); //this will leads to rejection of promise
//             //throw err; //this would also lead to rejection of promise
//             return err; //this is like return new Error("Cart is not valid") so this will NOT leads to rejection of promise
//         }

//         let orderId = "12345";
//         if(orderId){
//             setTimeout(function(){
//               resolve("Order is successfully placed")
//             }, 5000)
//         }
//     })
//     return promise;
// }

// let order = createOrder(cart)
// // console.log(order);

// order
// .then(function(orderId){
//     console.log(orderId)
// })
// .catch(function(err){
//     console.log(err.message)
// })

//lets learn about promise chaning

// let cart = ["orange", "kiwi", "papaya"];

// function isCartValidated(cart){
//     return true;
// }

// function createOrder(cart){
//     let promise = new Promise(function(resolve, reject){
//         if(!isCartValidated(cart)){
//             const err = new Error("Cart is not valid");
//             // reject(err);
//             throw err;
//         }

//         let orderId = "12345";
//         if(orderId){
//             setTimeout(function(){
//               resolve("Order is successfully placed")
//             }, 5000)
//         }
//     })
//     return promise;
// }

// let order = createOrder(cart)
// console.log(order);

// order
// .then(function(orderId){
//     console.log(orderId)
// })
// .catch(function(err){
//     console.log(err.message)
// })

//So far we did below steps
//Create a order

//Now i want to do the payment once i am done with order creation

function proceedToPayment(orderId) {
  return new Promise(function (resolve, reject) {
    resolve("payment successful");
  });
}
// order
// .then(function(orderId){
//     console.log(orderId) //so here it will print Order is successfully placed
//     //Note here we are not returning anything
// })
// .then(function(orderId){ //this will be  undefined because orderId is not returned from above chain
//     proceedToPayment(orderId) //Here also we are not returning any thing like the below chain is expecting paymentInfo which comes from proceedToPayment method but we are not returning anything
// })
// .then(function(paymentInfo){
//     console.log(paymentInfo) //here this will print undefined because we are not getting anything from the above chains
// })

// order
// .then(function(orderId){
//     console.log(orderId)
//     //So here we need to return the orderId so that it will get passed to the next chain
//     return orderId
// })
// .then(function(orderId){ //Now this orderId would not be undefined because we are returning the orderId from the above chain
// //Note we can either return any data like above chain or we can return the promise itself like below
//     return proceedToPayment(orderId)
// })
// .then(function(paymentInfo){ //So our proceedToPayment is resolved so here paymentInfo will get 'Payment successful'
//     console.log(paymentInfo)
// })

// order
// .then(function(orderId){
//     console.log(orderId)
// })
// .then(function(orderId){
//     proceedToPayment(orderId) //now suppose we are not returning any value from here, and this function returns a promie here, so we can do fix like below, we need to take below chain code and we need to append it here only
//     //the above code would be like below:
//     //proceedtoPayment(orderId).then(function(paymentInfo)){
//         //console.log(paymentInfo)
//     //})
//     //So if we see carefully, this may leads to promise hell just like callback hell and that is why returning the data or promise is very important and the below code we can remove because we have handled it here
// })
// .then(function(paymentInfo){
//     console.log(paymentInfo)
// })

let cart = ["orange", "kiwi", "papaya"];

function isCartValidated(cart) {
  return false;
}

function createOrder(cart) {
  let promise = new Promise(function (resolve, reject) {
    if (!isCartValidated(cart)) {
      const err = new Error("Cart is not valid");
      // reject(err);
      throw err;
    }

    let orderId = "12345";
    if (orderId) {
      setTimeout(function () {
        resolve("Order is successfully placed");
      }, 5000);
    }
  });
  return promise;
}

let order = createOrder(cart);
// console.log(order);

// order
// .then(function(orderId){
//     console.log(orderId)
// })
// .catch(function(err){
//     console.log(err.message)
// })

//So far we did below steps
//Create a order

//Now i want to do the payment once i am done with order creation

function proceedToPayment(orderId) {
  return new Promise(function (resolve, reject) {
    resolve("payment successful");
  });
}

// order
// .then(function(orderId){
//     console.log(orderId);
//     return orderId;
// })
// .then(function(orderId){
//   return proceedToPayment(orderId)
// })
// .then(function(paymentInfo){
//     console.log(paymentInfo)
// })
// .catch(function(err){
//     console.log(err.message)
// })

//In above code now, the promise is getting rejected at first chain itself, so it will not execute any then functions, it will directly run the catch block and it will print Cart is not valid in the console

//Now lets say hypotyhetically i want to run the payment method even though we are rejecting our promise in order function

//we can achive that by handling the reject state of the order method just after the chain of order function like below

// order
// .then(function(orderId){
//     console.log(orderId);
//     return orderId;
// })
// .catch(function(err){
//     console.log(err.message)
// })
// .then(function(orderId){
//   return proceedToPayment(orderId)
// })
// .then(function(paymentInfo){
//     console.log(paymentInfo)
// })
// .catch(function(err){
//     console.log(err.message)
// })

//Now running above code will print\
//Cart is not valid
//payment successful

//So if there is any then block after the catch block, remember it will always get execute

order
  .then(function (orderId) {
    console.log(orderId); //so here are promise is resolved so this block will run and it will skip the catch chain and execution will be passed to the next then chain
    return orderId; //so any value we return from here will be pass to the next chain
  })
  .catch(function (err) {
    //skip
    console.log(err.message);
  })
  .then(function (orderId) {
    //execution comes here
    return proceedToPayment(orderId); //returning promise
  })
  .then(function (paymentInfo) {
    //execution comes here
    console.log(paymentInfo);
  })
  .catch(function (err) {
    //skip because no rejection from above chain
    console.log(err.message);
  })
  .then(function () {
    //execution comes here
    console.log("I will get execute any way");
  });

//So the above code output will be
//Cart is not valid
//payment successful
//I will get execute any way

//So with the above scenarios we can notice this behaviour that catch block will always returns a promise and because of that any chaining that we are doing to catch block will always gets execute
//So catch block gets execute whenever the promise get rejects and this catch block will eventually returns a promise which will be in resolved state and hence the next chained then block callback function gets run everytime.

//The chaining that we learnt just now helps us to get rid of promise hell
//Note: The argument to then are optional, so suppose if we havr some code like
//doSomething(null, failureCallback) -> this is the valid code, so here we do not have anything for success callback
//This is another syntax where like before we use to do
//doSomething.then(null).catch(failuteCallback)
//in line 448, this is the another way of writing which we wrote in 450, in 448, 1st argument run when promise is successfully resolved
//and second argument runs when promise get rejected
//We already learnt that if we do not return the promise value or any data from the one chain then that value wont get passed to the succussive chain
//So if a previous handler returns a promise but did not return it then there is no way to track its settlement anymore, such promise is called as floating promise
//SO by returning the value we can track two things i.e the completion of the promise and its returned value
//The callback function that we write inside the then/catch block is also called as handlers

//Nesting of promise

// doSomethingCritical()
//   .then(
//     (result) =>
//       doSomethingOptional(result)
//         .then((optionalResult) => doSomethingOptional(optionalResult))
//         .catch((e) => {}) //this gets called when there is some error in doSomethingOptional or doSomethingOptional function
//   ) // Ignore if optional stuff fails; proceed.
//   .then(() => moreCriticalStuff())
//   .catch((e) => console.error(`Critical failure: ${e.message}`)); //this will only get called when there is some error in doSomethingCritical
