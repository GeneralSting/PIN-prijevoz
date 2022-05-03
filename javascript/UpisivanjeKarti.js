//Popunavanje tablice
//zadnja karta ce biti prikazana kao prva
var maxVrijeme = new Date();
tjedan = new Date(Date.now() - 6.048e+8);
trajanjeKarte = tjedan.toLocaleDateString("hr");
trajanjeKarteDanas = maxVrijeme.toLocaleDateString("hr");
oDb_Karte.on('value', function(oOdgovorPosluzitelja) 
{
	var oTablicaKarti = $('#tablica-karte tbody');
	oTablicaKarti.empty();
  var brojKarti = 0;
	oOdgovorPosluzitelja.forEach(function(oGradSnapshot)
	{
    brojKarti++;
	});
  var brojKartiKrozPetlju = 1;
  for(let brojacKarti = brojKarti; brojacKarti > 0; brojacKarti--)
  {
    oOdgovorPosluzitelja.forEach(function(oKartaSnapshot)
    {
      if(brojacKarti == brojKartiKrozPetlju)
      {
        var sKartaKey = oKartaSnapshot.key;
        var oKarta = oKartaSnapshot.val();
        oTablicaKarti.append('<tr><td>' + oKarta.id + '</td><td>' + oKarta.istek + '</td><td>' + oKarta.oib + '</td><td>' + oKarta.cijena );
      }

      brojKartiKrozPetlju++;
    });
    brojKartiKrozPetlju = 1;
  }
});

var idKarte = 0;
//Stvaranje reda tablice da se može kliknut na njega te dohvaćanje vrijednosti iz tog reda
function addRowHandlers() {
    var table = document.getElementById("tablica-karte");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
      var currentRow = table.rows[i];
      console.log(currentRow);
      var createClickHandler = function(row) {
        return function() {
          var cell = row.getElementsByTagName("td")[0];
          idKarte = cell.innerHTML;
          sessionStorage.setItem('key', idKarte);
          window.open('C:/wamp64/www/PIN-prijevoz/Karta.html');  
        };
      };
      currentRow.onclick = createClickHandler(currentRow);
    }
  }

//Funkcija ispunjava novu stranicu s podacima
function DodavanjePodataka()
{
  setTimeout(() =>{
    var vlasnikKarte = $('#vlasnikKarte');
    var razredVagona = $('#razredVagona');
    var datumKupnje = $('#datumKupnje');
    var datumIsteka = $('#datumIsteka');
    var odlazakPolaziste = $('#odlazakPolaziste');
    var odlazakOdrediste = $('#odlazakDolaziste');
    var povratakPolaziste = $('#povratakPolaziste');
    var povratakOdrediste = $('#povratakDolaziste');
    var brojPutnika = $('#brojPutnika');
    var pogodnosti = $('#pogodnosti');
    var udaljenost = $('#udaljenost');
    var cijena = $('#cijena');
    oDb_Karte.on('value', function(oOdgovorPosluzitelja) 
    {       
      oOdgovorPosluzitelja.forEach(function(oKartaSnapshot)
        {
          var oKarta = oKartaSnapshot.val();
          if(sessionStorage.getItem('key') == oKarta.id)
          {
            vlasnikKarte.append('<p>Vlasnik: ' + oKarta.ime + " " + oKarta.prezime + '</p>');
            razredVagona.append('<p>Razred: ' + oKarta.razred + '</p>')
            datumKupnje.append('<p>Kupljeno: ' + oKarta.kupljeno + '</p>');
            datumIsteka.append('<p>Vrijedni do: ' + oKarta.istek + '</p>');
            odlazakPolaziste.append('<p>Od: ' + oKarta.polaziste + '</p>');
            odlazakOdrediste.append('<p>Do: ' + oKarta.odrediste + '</p>');
            if(oKarta.tipKarte == "povratna")
            {
              povratakPolaziste.append('<p>Od: ' + oKarta.odrediste + '</p>');
              povratakOdrediste.append('<p>Do: ' + oKarta.polaziste + '</p>');
            }
            else
            {
              povratakPolaziste.append('<p>Od: ' + 'XXX' + '</p>');
              povratakOdrediste.append('<p>Do: ' + 'XXX' + '</p>');
            }
            brojPutnika.append('<p>Putnika: ' + oKarta.putnika + '</p>');
            pogodnosti.append('<p>Pogodnosti: ' + oKarta.pogodnosti + '</p>');
            udaljenost.append('<p>Ukupna udaljenost: ' + oKarta.udaljenost + '</p>');
            cijena.append('<p style="color:rgb(33, 107, 238);">Iznos: ' + oKarta.cijena + '</p>');
          }
      });
    });
}, 1000)
}