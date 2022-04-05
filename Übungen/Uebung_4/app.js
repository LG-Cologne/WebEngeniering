function getNotenBewertung(val) {
    var grades = ["sehr gut", "gut", "befriedigend", "ausreichend", "mangelhaft", "ungenügend"]
    if (val < 7 && val > 0) {
        return grades[val - 1]
    }else{
        console.log(val + " ist keine gültige Note")
    }
}