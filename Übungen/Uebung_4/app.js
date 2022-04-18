// Objekte
const andre = new Student('Andre', 1)
const nico = new Student('Nico', 2)
const jonas = new Student('Jonas', 3)

let students = [nico, andre, jonas]

students.forEach(student => {
    student.note++;
    console.log(student.toString())
})

// Anonyme Funktion
console.log('before sorting:');
students.forEach(student => {
    console.log(student.toString());
});

students.sort(function (a, b) {
        return a.note - b.note;
    }
)
;

console.log('after sorting:');
students.forEach(student => {
    console.log(student.toString());
});

console.log(numbers);