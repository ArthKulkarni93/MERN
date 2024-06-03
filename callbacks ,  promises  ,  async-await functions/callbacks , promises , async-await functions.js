//callback function
    //used to handle asynchronous operations=
    //1)read file
    //2)interacting with database
    //3)networking requests

function square(a){
    return a*a;
}
function cube(a){
    return a*a*a;
}
function sumofsomething(fn,a){
    return fn(a);
}
console.log(sumofsomething(square,2))




//asynchronous functions
// allows multiple operations to be performed concurrently without waiting
// Async code is handled by callback functions , promises and async/awaits

const fs=require("fs")
fs.readFile("a.txt","utf-8",function(err,data){
    console.log(data);
})
console.log("arth");

//even though data printing function is written before the arth , readfile needs the access of the file from os,
//when it gets access then it processes and then prints the data. All this needs time, instead of waiting for the permission 
//and then doing the next operations it goes to next step, after completing all next steps(printing arth) it again goes to 
//readfile function and prints the data of the file. #asynchronous_code




//How to create your own async functions? 
//there are two methods 1) without promises(uses callback functions) 2) using promises

//1)without promises
function mysettime(fn,duration){
    setTimeout(fn,duration);
}
mysettime(function(){
    console.log("arth")
},1000);
console.log("teerth")

//we are creating our own async function(printing after some duration) here by wrapping around another async function(setTimeout)
//Goes to mysettime which is passing a function of printing name and duration, it goes to first line and setTimeout is activated
//but instead of waiting for it , itgoes to next operation of printing another name

//2)with promises
function promisedfunction(duration){
    return new Promise (function(resolve){
        setTimeout(resolve,duration)
    })
}
const ans=promisedfunction(1000)
ans.then(function(){
    console.log("arth");
})
console.log("teerth")

// goes to ans->promisedfunction->with some duration ->instead of waiting , goes to last line of printing teerth, after 1 sec
// promise is resolved, goes to ans,then does the operation (printing arth) 



// async/await
// Async=makes function return a Promise
// Await=makes an async function wait for Promise
// both are necessary for each other

function walkdog(){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve("walking the dog");
        },1000)
    })
}
function cleankitchen(){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve("cleaning kitchen");
        },2000)
    })
}
function exercise(){
    return new Promise(function(resolve){
        setTimeout(function(){
            resolve("doing exercise");
        },30000)
    })
}
async function do_tasks(){
    let walkdogresult=await walkdog();
    console.log(walkdogresult);

    let cleankitchenresult=await cleankitchen();
    console.log(cleankitchenresult);

    let exerciseresult=await exercise();
    console.log(exerciseresult);

    console.log("finished all tasks");
}
do_tasks();