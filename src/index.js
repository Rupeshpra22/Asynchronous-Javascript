//What is Asynchronous Programming is?
//It is a technique which enables your program to start a potentially long running task
//and still able to responsive to other events while that task runs, rather than having to wait
//until the task has been finished. Once the task has been finished, your program will be presented
//with the value

//Eg of such cash might be HTTP request to the sever

//There is a possibility that your synchronous code might take some time to finish it execution
//Reason might be anything like poor designed code, lot of loops and so on.

//Lets take a example where we have a button when clicked calls some function which takes
//considerable amount of time and we also have a textarea where user can type any text
//Now suppose user clicks the button and we know the code will take some time lets say 10sec
//to finish the execution and at the same time user tries to type something in the textbox
//Guess what user wont be able to type anything because for 10 second the web page would be unresponsive
//why? because the function execution is in progress and it is still getting execute and hence
//it wont allow us to type anything in the textarea, so this is one of the problem of synchronous code

//So what might need our program to do in such case would be
//Call the function on click of the button and return immediately so that our program can still be
//responsive to other events
//Notify us once the result of the operation when it gets complete

//The above step is exactly what asynchronous programming do

//Example of Aynschronous function can be event handlers
//So in event handlers, when we give any function to event listeners, it doesnot get runs immediately
//it will only run when that particular events get triggers.
//Another one is XMLHttpRequest

console.log("Namaste");
// console.log("Javascript");
console.log("Season 2");

//So in above code, things will get execute line by line and it will get print
//Now suppose, what if i want to execute 2nd line after 5 seconds
//The first thing that comes to our mind is setTimeout
//We can basically wrap our 2nd line in a function and pass it as a argument to setTimeout
//So this function which is getting passed as a argument to setTimeout is nothing but Callback function
//So callback function is a way to do asynchronous operation in javascript

//so our line no 2 will become like below:
setTimeout(function () {
  //So this function is a callback function
  console.log("Javascript");
}, 5000);

//Now setTimeout has the responsibility to execute the anonymous callback function
//According to code above, here setTimeout will execute the callback function just after 5000ms

//Now lets look on another example
//Lets say we are in an ecommerce application and we are shopping online
//So usally the steps may be
//1: Create order
//2: Do the payment

let cart = ["shirts", "jeans", "perfume"];

//Now the thing is we have the dependency
//Dependency here is we can only do the payment once i have done the order
//So in this scenario, where there is a dependencies between some scenarios which is infact have asynchronous behaviour
//So in this case, callback function can help us where we will be creating a order first and then only there will be a payment.
//Callback function used to be main way asynchronous function were implemented in javascript.
//Another example of callback function would be like on click of button call an api
//Eg: document.querySelector("#button").addEventListener('click', ()=>{
// api call here
//})

//Lets say we have below two apis

//api.createOrder();

//api.payment();

//So here we know there is a dependency and we only want to do payment once we are done with the orders
//So we can basically wrap our payment api related method in a anonymous function and we can pass this
//anonymous function as a callback to the createOrder function.
//Below is the code

// api.createOrder(cart, function () {
//   api.payment();
// });

//So here in above code, we have pass api.payment as a callback function in a api.createOrder function
//Now it is the responsibility of createOrder function to work with payment function
//So in createOrder function once the order has been set for the products in the cart
//Then createOrder would ideally call the payment method
//So in this way we are handling asynchronous operation in javascript

//Now lets add an another scenario
//where we have done with the order
//We have done with the payment
//Now we wanna show order summary page which has its own api

// api.orderSummary()

//And now this scenario also has dependency like this function should only gets execute when
//we are done with the order and we have done the payment.
//Again we can handle such case by using callback function.

//So we can wrap our orderSummary function inside a anonymous function and we can pass this function
//to the payments method as a callback function

//So our code will look like below

// api.createOrder(cart, function () {
//   api.payment(function () {
//     api.orderSummary();
//   });
// });

//So now, its the responsibility of payment function to call the orderSummary function
//Thats how we manage the dependency and maintains the flow

//Now again, some other requirement came and i wanna update the wallet
//And this can be only done once we are completed the order, done with the payment, shown the order summary
//So here again there is a dependency which can only be executed one we show the order summary
//To handle this, again callback function to the rescue

// api.createOrder(cart, function () {
//   api.payment(function () {
//     api.orderSummary(function () {
//       api.updateWallet();
//     });
//   });
// });

//But we can already notice some problem with this pattern
//Now we only have 4 scenarios, now assume we had 20 such more scenario, you can imagine how bad it will look
//So this function getting passed as a callback function, which in turn takes another callback function and this happens till last function,
//So this is nothing but a callback hell
//This code structure is really hard to understand and maintain.
//The above structure is also called as 'Pyramid of doom'
//Also error handling would be hard to achive here, lets say i want to do error handling at each
//function call, so again it would be hard to write as well as hard to maintain.
//There is another problem which we face while using callback function which is called as 'Inversion of control'
//Which is nothing but we are giving the control of the execution of our code to some other code.
//lets say for payment, we have given payment callback function to the createOrder function
//And we know it is very very critical that we have to do payment only once the order is done
//Else this can have an adverse effect on the business
//So we have to be very sure that the function where we are passing the argument which is our callback function
//should exeucte our function in a proper way.
