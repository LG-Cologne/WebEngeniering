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
        }, 1000);
    })
}


function getWrap() {
    const wrap = "Wrap"
    console.log(wrap + " aus dem Schrank geholt")
    return Promise.resolve(wrap)
}

function assembleFalafelWrap(wrap, friedFalafel) {
    const falafelwrap = "Falafel-Wrap"
    console.log(friedFalafel + " in " + wrap + " gewickelt")
    return Promise.resolve(falafelwrap)
}

async function prepareFalafelWrap() {
    const falafel = await getFalafel()
    
    const ingredients = await Promise.all([getWrap(), fryFalafel(falafel)])

    const assembledFalafelWrap = await assembleFalafelWrap(ingredients[0], ingredients[1])
   
    return Promise.resolve(assembledFalafelWrap)

}

async function serve() {
    const meal = await prepareFalafelWrap()
    console.log(meal + " serviert")
}

serve()