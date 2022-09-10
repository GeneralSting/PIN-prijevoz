# OPIS ZADATKA

U web razvojnom okruženju izraditi informacijski sustav koji služi za evidenciju karata putničkog
prijevoza „PIN prijevoz“. Samostalno osmisliti vizualni identitet i funkcionalnosti.
Minimalne funkcionalnosti:

  - Dodavanje/ažuriranje/brisanje gradova, gradovi moraju imati koordinate kako bi se
    mogla izračunavati udaljenost
  - Brisanjem gradova ne brisati postojeće karte, u postojećim kartama treba ostati naziv
    grada ako se grad obriše ili ažurira naziv
  - Udaljenost izračunati pomoću formule za udaljenost između dvije geografske koordinate
  - Svaki grad može biti aktivan i neaktivan. Omogućiti brzo aktiviranje i deaktiviranje
    gradove. Ako grad nije aktivan ne može se kreirati nova karta
  - Korisnik ima mogućnost kreiranja karte na način da sa liste dostupnih gradova odabere
    polazište, odredište, tip karte (jednosmjerna ili povratna), broj putnika te klasa (prvi ili
    drugi razred). Cijena karte se formira po slijedećima pravilima:
  - Cijena jednosmjerne karte za jednog putnika je 0.35kn/km za drugi razred,
    0.70kn/km za prvi razred
  - Cijena povratne karte za jednog putnika je umanjena za 30% dvaju
    jednosmjernih karata
  - Korisnik može definirati i proizvoljan popust u postocima
  - Karta ima rok trajanja tjedan dana za jednosmjernu kartu, dva tjedna za
    dvosmjernu kartu
  - Kreirana karta vrijedi za točno određene putnike imenom, prezimenom i OIB. Ako je karta
    za više putnika, omogućiti unos više putnika. Nema ograničenja za broj putnika (osmisliti
    novu tablicu u bazi podataka za putnike karte)
  - Sustav svakoj kreiranoj karti dodijeli jedinstveni šesteroznamenkasti identifikator
  - Sve kreirane karte se mogu pregledati, lista karata je prikazana tablično, pritiskom na
    redak u tablici prikazuje se izgled karte sa svim podacima pripremljeno za „ispis“
    (pogledati na Internetu kako izgleda karta za prijevoz HŽ vlakom, osmisliti vlastiti dizajn
    karte)
    
Napomena:

  - Izvor podatka je Firebase
  - Za vizualni identitet potrebno je koristiti Boostrap programski okvir
  - Za odabir datuma koristiti Boostrap Datepicker, lokaliziran na hrvatski jezik
  - U svim formama za postojeće vrijednosti omogućiti odabri preko padajućeg izbornika
    koji identifikatore treba imati sakrivene u pozadini, npr. vrijednosti ime i prezime su
    vidljive, OIB je sakriven.
  - Svi tablični prikazi trebaju imati jQuery „live“ tražilicu po svim kolonama.
    Prilikom brisanja i ažuriranja zapisa treba se prikazati poruka sa potvrdom „Da li ste  
    sigurni....“
