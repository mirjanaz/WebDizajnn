var loginForm = document.getElementById('loginForm');

// Na logovanje cemo reagovati tako sto uhvatimo 'submit' dogadjaj na login formu
loginForm.addEventListener('submit', function(e) {
    // Sprecicemo slanje forme na server, jer zelimo mi da imamo kontrolu na time
    e.preventDefault();

    /*
    	Validacija forme zapocinje tako sto cemo ocitati unete vrednosti u input polja 
    	za korisnicko ime i lozinku.
    	Kada smo selektovali polja koja nam trebaju, atribut value ce nam dati
    	ono sto pise u njima (isto kao getText() i Javi).
    */
    var username = document.getElementById('Username').value.trim();
    var password = document.getElementById('Password').value.trim();

    // Stringove u JavaScriptu mozemo porediti sa == i !=
    if (username == '' || password == '') {
        // Funkcija 'alert' prikazuje popup dijalog sa prosledjenom porukom
        alert('Morate uneti sve podatke za prijavu.');
    } else {
        /*
        	Kada smo proverili da su uneti svi obavezni podaci, mozemo sa servera da dobavimo spisak korisnika.
        	Ovo cemo uraditi slanjem AJAX zahteva. AJAX zahteve kreiramo kao objekte klase XMLHttpRequest.
        */
        var request = new XMLHttpRequest();

        // Funkcija 'onreadystatechange' ce se izvrsiti kada se stanje zahteva promeni
        request.onreadystatechange = function() {
            // Stanje broj 4 je 'DONE' stanje sto znaci da je odgovor na nas zahtev stigao
            if (this.readyState == 4) {
                // HTTP odgovor sa statusom 200 znaci da je zahtev obradjen bez greske
                if (this.status == 200) {
                    // Odgovor ce nam stici u tekstualnom obliku, pa treba da ga pretvorimo u JSON objekat
                    // Nakon ovoga imacemo lisu korisnika kroz koju mozemo da iteriramo
                    var users = JSON.parse(request.responseText);

                    // Promenljiva na osnovi koje cemo proveriti da li na serveru postoji korisnik
                    // koji pokusava da se prijavi.
                    var name = '';
                    // Prolazimo kroz dobijenu listu korisnika i za svakog od njih proveravamo
                    // da li mu odgovaraju prosledjeni login podaci
                    for (var i = 0; i < users.length; i++) {
                        var user = users[i];
                        if (user.email == username && user.username == password) {
                            // Ukoliko smo pronasli odgovarajuceg korisnika, spremimo njegovo ime u kontrolnu promenljivu
                            // i zavrsimo sa petljom.
                            name = user.name;
                            break;
                        }
                    }
                    // Ukoliko nismo pronasli korisnika, javimo da nisu ispravni podaci
                    if (name == '') {
                        alert('Neispravni login podaci.');
                    } else {
                        // Ukoliko jesmo, redirektujemo se na index.html stranicu
                        // U URL cemo smestiti ime prijavljenog korisnika, kako bi mogli da ga procitamo na toj stranici.
                        window.location.replace(
                            "repertoar.html?user=" + name
                        );
                    }
                } else {
                    // Sve ostale HTTP statuse (koji nisu 200) smatracemo greskom
                    alert('GRESKA: ' + this.status)
                }
            }
        };
        // Adresu na koju saljemo zahtev cemo procitati iz 'action' atributa forme
        var url = loginForm.getAttribute('action');
        // Ovde navodimo tim HTTP zahteva i adresu na koju saljemo zahtev
        request.open('GET', url);
        // Tek pozivanjem metode send() u stvari saljemo nas kreirani AJAX zahtev
        request.send();
    }
});