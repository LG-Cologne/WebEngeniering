
function thing1() {
    return new Promise((resolve) => {
        setTimeout(() => { resolve('thing1') }, 1000);
    });
}

function thing2() {
    return new Promise((resolve) => {
        setTimeout(() => { resolve('thing2') }, 1000);
    });
}

function doThings() {
    thing1().then((thing1) => {
        console.log(thing1);
    });

    thing2().then((thing2) => {
        console.log(thing2);
    });
}

async function doThingsAsync(){
    const promise1 = await thing1();
    const promise2 = await thing2();

    const [t1, t2] = await Promise.all([promise1, promise2]);

    console.log(t1);
    console.log(t2);
}

//doThings();
doThingsAsync();
