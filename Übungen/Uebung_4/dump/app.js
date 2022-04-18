//simple example
let students = [
    new Student('Hans', 1),
    new Student('Peter', 3),
    new Student('Klaus', 2),
];

console.log('simple example:');
students.forEach(student => {
    student.note++;
    console.log(student.toString());
});

//sorting
console.log('before sorting:');
students.forEach(student => {
    console.log(student.toString());
});

let student_compare = function (a, b) {
    return a.note - b.note;
}

students.sort(student_compare);
console.log('after sorting:');
students.forEach(student => {
    console.log(student.toString());
});

//with factory
function createStudentFactory(note) {
    return function (name) {
        return new Student(name, note);
    }
}

let studentFactory = createStudentFactory(5);

let factoryStudents = [
    studentFactory('Max'),
    studentFactory('Josef'),
    studentFactory('Michael'),
];

console.log('factory students:');
factoryStudents.forEach(student => {
    console.log(student.toString());
});
