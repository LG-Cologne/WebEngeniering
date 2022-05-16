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


async function prepareFalafelWrap() {
    // TODO: Aufrufen der Zubereitungsschritte
    const falafel = await getFalafel()
    const prom = await Promise.all([getWrap(), fryFalafel(falafel)])

    return assembleFalafelWrap(prom[0], prom[1])
}

async function serve() {
    const meal = await prepareFalafelWrap();
    console.log(meal + " serviert")
}

serve()