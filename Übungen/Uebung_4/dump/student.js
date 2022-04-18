class Student {

    static grades = ['sehr gut', 'gut', 'befriedigend', 'ausreichend', 'mangelhaft', 'ungenügend'];

    constructor(name, note) {
        this._name = name;
        this._note = note;
    }

    static getNotenBewertung(grade) {
        if (typeof grade !== 'number' || grade < 1 || grade > 6) {
            return 'Ungültige Eingabe!';
        }
        return Student.grades[grade - 1];
    }

    toString() {
        return `Student: ${this.name}, Note: ${Student.getNotenBewertung(this.note)}`;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get note() {
        return this._note;
    }

    set note(value) {
        this._note = value;
    }
}
