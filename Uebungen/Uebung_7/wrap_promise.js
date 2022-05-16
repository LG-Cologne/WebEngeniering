function getFalafel() {
    const falafel = "Falafel";
    console.log(falafel + " aus dem Kühlschrank geholt");
    return Promise.resolve(falafel);
}

function fryFalafel(falafel) {
    return new Promise(resolve => {
        setTimeout(function() {
            const friedFalafel = "Frittierte " + falafel;
            console.log(falafel + " frittiert");
            return resolve(friedFalafel);
        }, 300);
    })
}

function getWrap(/* (nicht cuncurrent) TODO: Weiterleitung */) {
    const wrap = "Wrap"
    console.log(wrap + " aus dem Schrank geholt")
    return Promise.resolve(wrap);
}

function assembleFalafelWrap(wrap, friedFalafel) {
    const falafelwrap = "Falafel-Wrap"
    console.log(friedFalafel + " in " + wrap + " gewickelt")
    return Promise.resolve(falafelwrap)
}

function getFriedFalafel(){
    return new Promise(resolve => {
        getFalafel().then((falafel) => {
             fryFalafel(falafel).then((friedFalafel) => {
                 return resolve(friedFalafel);
             });
        })
    })
}

function prepareFalafelWrap() {
    const prom = Promise.all([getFriedFalafel(), getWrap()])
 
    prom.then(ret => { 
    assembleFalafelWrap(ret[0], ret[1]).then(falafelwrap => {
        serve(falafelwrap);
    })
})
}

function serve(meal) {
    console.log(meal + " serviert")
}

 
prepareFalafelWrap();