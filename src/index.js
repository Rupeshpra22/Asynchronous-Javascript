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

//Lets say we have below two apis

//api.createOrder();

//api.payment();

//So here we know there is a dependency and we only want to do payment once we are done with the orders
//So we can basically wrap our payment api related method in a anonymous function and we can pass this
//anonymous function as a callback to the createOrder function.
//Below is the code

api.createOrder(cart, function () {
  api.payment();
});

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

//So our code will look like this

