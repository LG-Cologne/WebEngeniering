function getFalafel() {
    const falafel = "Falafel"
    console.log(falafel + " aus dem Kühlschrank geholt")
    return falafel
}

// function fryFalafel(falafel) {
//     return setTimeout(() => {
//         const friedFalafel = "Frittierte " + falafel
//         console.log(falafel + " frittiert")
//         return friedFalafel
//     }, 0)

// }
function fryFalafel(falafel) {
        const friedFalafel = "Frittierte " + falafel
        console.log(falafel + " frittiert")
        return friedFalafel
}

function getWrap() {
    const wrap = "Wrap"
    console.log(wrap + " aus dem Schrank geholt")
    return wrap
}

function assembleFalafelWrap(wrap, friedFalafel) {
    const falafelwrap = "Falafel-Wrap"
    console.log(friedFalafel + " in " + wrap + " gewickelt")
    return falafelwrap
}

function prepareFalafelWrap() {
    falafel = getFalafel();
    fried_falafel = fryFalafel(falafel);

    wrap = getWrap();
    fried_falafel_wrap = assembleFalafelWrap(wrap, fried_falafel);
    return fried_falafel_wrap

}

function serve(meal) {
    console.log(meal + " serviert")
}

serve(prepareFalafelWrap())
