// 1. synchron
function helloworld(){
    return "Hello World!"
}

console.log(helloworld())

// 2. callbacks
function helloworld2(callback){
    callback("Hello World2!")
}

helloworld2(console.log)


function log(s) {
    console.log(s)
}

helloworld2(log)

// 3. Promises
function helloworld3(){
    return Promise.resolve("Hello World3!")
}

helloworld3()
//.then(function(result){
.then(result => {
    console.log(result)
})

// 4. async await

function helloworld4(){
    return Promise.resolve("Hello World4!")
}

async function callHelloworld(){
    const res = await helloworld4()
    console.log(res)
}

callHelloworld()

// 5. Promise.all
async function callHelloworld2(){
    const res = await Promise.all([helloworld4(), helloworld4()])
    console.log(res)
}

callHelloworld2()

