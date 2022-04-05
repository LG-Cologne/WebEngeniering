class Student {

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

    getNotenBewertung(val) {
        var grades = ["sehr gut", "gut", "befriedigend", "ausreichend", "mangelhaft", "ungenügend"]
        if (val < 7 && val > 0) {
            return grades[val - 1]
        }else{
            console.log(val + " ist keine gültige Note")
        }
    }

    toString(){
        return "(Name: " + this._name + "; Note: " + this._note + ")"
    }
}