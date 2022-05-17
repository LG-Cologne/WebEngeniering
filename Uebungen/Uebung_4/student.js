class Student {

    static grades = ["sehr gut", "gut", "befriedigend", "ausreichend", "mangelhaft", "ungenügend"]

    cunstuctor(name) {
        this._name = name;
    }

    get name() {
        return this._name
    }

    get note() {
        return this._note;
    }


    set name(name) {
        this._name = name
    }

    set note(note) {
        this._note = note
    }

    static getNotenBewertung(val) {

        if ((!val < 7 && val > 0)) {
            return val + " ist keine gültige Note"
        } else {
            return Student.grades[val - 1]
        }
    }

    toString() {
        return "(Name: " + this._name + "; Note: " + this._note + ")"
    }
}