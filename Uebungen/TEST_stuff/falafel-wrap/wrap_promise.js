function getFalafel() {
    const falafel = "Falafel"
    console.log(falafel + " aus dem Kühlschrank geholt")
    return Promise.resolve(falafel)
}

function fryFalafel(falafel) {
    return new Promise((resolve) => {
        setTimeout(function () {
            const friedFalafel = "Frittierte " + falafel
            console.log(falafel + " frittiert")
            resolve(friedFalafel)
        }, 300);
    })
}

function getWrap(friedFalafel) {
    const wrap = "Wrap"
    console.log(wrap + " aus dem Schrank geholt")
    return Promise.resolve([
        wrap,
        friedFalafel
    ])
}

function assembleFalafelWrap(wrap, friedFalafel) {
    const falafelwrap = "Falafel-Wrap"
    console.log(friedFalafel + " in " + wrap + " gewickelt")
    return Promise.resolve(falafelwrap)
}

function prepareFalafelWrap() {
    return getFalafel()
        .then((falafel) => {
            return fryFalafel(falafel)
        })
        .then((friedFalafel) => {
            return getWrap(friedFalafel)
        })
        .then((ingredients) => {
            return assembleFalafelWrap(ingredients[0], ingredients[1])
        })
}

function serve(meal) {
    console.log(meal + " serviert")
}

prepareFalafelWrap()
    .then((friedFalafelWrap) => {
        serve(friedFalafelWrap);
    });