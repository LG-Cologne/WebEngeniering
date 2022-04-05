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
}