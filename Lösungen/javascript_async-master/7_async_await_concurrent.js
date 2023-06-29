function getFalafel() {
    const falafel = "Falafel"
    console.log(falafel + " aus dem Kühlschrank geholt")
    return Promise.resolve(falafel)
    // return falafel
}

function fryFalafel(falafel) {
	return new Promise(resolve => {
		setTimeout(function() {
			const friedFalafel = "Frittierte " + falafel
			console.log(falafel + " frittiert")
			resolve(friedFalafel);
		}, 1000);
	});
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
    const wrapAndFriedFalafel = await Promise.all([getWrap(), fryFalafel(falafel)])
    const falafelWrap = await assembleFalafelWrap(wrapAndFriedFalafel[0], wrapAndFriedFalafel[1])
    return Promise.resolve(falafelWrap)
}

async function serve() {
    const meal = await prepareFalafelWrap()
    console.log(meal + " serviert")
}

serve()