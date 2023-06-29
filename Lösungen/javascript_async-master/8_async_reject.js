function getFalafel() {
    const falafel = "Falafel"
    console.log(falafel + " aus dem Kühlschrank geholt")
    return Promise.resolve(falafel)
}

function prepareSalad() {
    const salad = "Salat"
    console.log(salad + " geschnitten")
    return Promise.resolve(salad)
}

function fryFalafel(falafel) {
	return new Promise((resolve, reject) => {
		setTimeout(function() {
			if(Math.random() >= 0.5) {
                console.log(falafel + " frittiert")
                resolve("Frittierte " + falafel)
            } else {
                console.log(falafel + "  angebrannt")
                reject("Angebrannte " + falafel)
            }
		}, 1000);
	});
}

function getWrap() {
    const wrap = "Wrap"
    console.log(wrap + " aus dem Schrank geholt")
    return Promise.resolve(wrap)
}

function assembleFalafelWrap(wrap, friedFalafel, salad) {
    const falafelwrap = "Falafel-Wrap"
    console.log(friedFalafel + " und " + salad + " in " + wrap + " gewickelt")
    return Promise.resolve(falafelwrap)
}

async function prepareFalafelWrap() {
    const wrapFalafelSalad = await Promise.all([getWrap(), getFalafel(), prepareSalad()])
    let burned = true
    let friedFalafel = ""

    while(burned){
        try{
            friedFalafel = await fryFalafel(wrapFalafelSalad[1])
            burned = false
        }catch(e){
            console.log(e + " -> Neuer Versuch")
        }
    }

    const falafelWrap = await assembleFalafelWrap(wrapFalafelSalad[0], friedFalafel, wrapFalafelSalad[2])
    return falafelWrap
}

async function serve() {
    const meal = await prepareFalafelWrap()
    console.log(meal + " serviert")
}

serve()