class Student{

    constructor(name){
        this._name = name
        this._note = -1
    }

    // getter, settter --> not necessary, but good practice
    // Zugriffsfunktions-Properties
    get note() {
        return this._note;
    }

    set note(note){
        this._note = note
    }

    get name(){
        return this._name
    }

    set name(name){
        this._name = name
    }

    static getNotenBewertung(note){
        switch(note){
            case 1:
                return "sehr gut"
            case 2:
                return "gut"
            case 3:
                return "befriedigend"
            case 4:
                return "ausreichend"
            case 5:
                return "mangelhaft"
            case 6:
                return "ungenügend"
            default:
                return ""
        }
    }

    toString() {
        //return "Der Student " + this._name + " hat die Note " + Student.getNotenBewertung(this._note)
        return "Der/Die Studierende " + this._name + " hat die Note " + this.constructor.getNotenBewertung(this._note)
    };
}

// uncomment for HTML/JS example
module.exports = Student // Klasse auf Root-Ebene exportieren

// or: module.exports = class Student { ....

// exports.Student = Student --> Benutzung: new Student.Student() --> unschön



