console.log('a');

const promise = new Promise((resolve, reject) => {
    console.log('b');

    setTimeout(() => {
        console.log('D');
        resolve('E');
    }, 0);
});

promise.then(value => console.log(value));
console.log('c');
