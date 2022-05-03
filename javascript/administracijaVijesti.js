oDb_Vijesti.on('value', function(oOdgovorPosluzitelja) //popunjava tablice s vijestima.
{
	var oTablicaVijesti = $('#tablica-postovi tbody');
	oTablicaVijesti.empty();
	var nRbr = 1;
	var brojDjece = 0;
	oOdgovorPosluzitelja.forEach(function()
	{
		brojDjece++;
	});
	brojDjeteta = 1;
	for(let brojacDjece = brojDjece; brojacDjece > 0; brojacDjece--)
	{
		oOdgovorPosluzitelja.forEach(function(oVijestSnapshot)
		{
			if(brojacDjece == brojDjeteta)			//zadnja dodana vijest ce biti prva prikazana.
			{
				var sVijestKey = oVijestSnapshot.key;
				var oVijest = oVijestSnapshot.val();
				oTablicaVijesti.append('<tr><td style="font-weight: 700;">' + nRbr++ + '.</td><td style="font-weight: 700;">' + oVijest.DatumVijesti + '</td><td><a style="font-weight: 700;" href="vijest.html?vijest_key='+sVijestKey+'">' + oVijest.NazivVijesti + '</td><td style="font-weight: 700;">' + oVijest.KategorijaVijesti + '</a></td><td><button type="button"  onclick="ModalUrediVijest(\''+sVijestKey+'\')" class="btn btn-sm btn-info"><i class="fas fa-edit"></i></button></td><td><button onclick="ObrisiVijest(\''+sVijestKey+'\')" type="button" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button></td></tr>');
			}
			brojDjeteta++;
		});
		brojDjeteta = 1; // u foreach loop-u uvjet if ce se uvijek ispuniti samo jednom
	}
	document.getElementsByClassName('background-image')[0].style.background = "url('img/patternAdministracijaVijesti.jpg')"; // postavlja pozadine jer se stranica mjenja ovisno o broju vijesti
    document.getElementsByClassName('background-image')[0].style.backgroundRepeat = "repeat";   //pozadina se ponavlja kako ne bi bilo bijele povrsine.
});



function DajDanasnjiDatum() 
{
    var tdate = new Date();
    var dd = tdate.getDate();
    var MM = tdate.getMonth(); 
    var yyyy = tdate.getFullYear(); 
    var sDatum = dd + "." + (MM + 1) + "." + yyyy;

    return sDatum;
}

var kategorija = "tvrtka";
function KategorijaTvrtka()		//dodijeljivanje kategoriji vrijednost tvrtka
{
	kategorija = "tvrtka";
}
function KategorijaPutovanja()	//dodijeljivanje kategoriji vrijednost izmjene
{
	kategorija = "putovanja";
}
function KategorijaIzmjene()	//dodijeljivanje kategoriji vrijednost putovanja
{
	kategorija = "izmjene";
}

var trenutniId = 0;			//ID koji se nalazi u bazi
//Declare a function that increment a counter in a transaction
function DohvatiTrenutniId() {		//funkcija vraća trenutni ID
    var counterRef = firebase.database().ref('counterVijesti');
    return counterRef.transaction(function(currentId) {
      return currentId;
    });
  }

function DohvacanjeTrenutnogId()		//funkcija dodijljuje trenutni id javnoj varijabli
{
  //Call the asynchronous getID() function
  DohvatiTrenutniId().then(function(transactionResult,) {		//pozivanje funkcije
    var newId = transactionResult.snapshot.val();				//vrijednost ID-a
    trenutniId = newId;
  });
}

function DodajVijest()    //dodavanje nove vijesti
{
	var sVijestNaziv = $('#inptNazivVijesti').val();
	var sVijestTekst = $('#txtTekstVijesti').val();
	var sVijestSlika = $('#inptSlikaVijesti').val();
	if(sVijestNaziv == "" && sVijestTekst == "")		//ili naziv ili opis vijesti moraju imati vrijednost
	{
		Swal.fire({
			icon: 'error',
			title: 'Nepravilan unos',
			text: 'Niste pravilno unjeli podatke, provjerite',
			footer: '<a href="#" onclick="PrikazUvjeta()">Prikaži uvjete podataka</a>'
		  })
		  return;
	}
	else
	{
		DodavanjeId();			//dohvacanje ID-a za novu vijest
		setTimeout(() =>
		{
			if(trenutniId < idOgranicenje)		//ovo se ne bi treblo dogadati programski, vec rucnom pogreskom
			{
				Swal.fire(
					'Ogromna pogreška',
					'Trenutni ID je manji od ograničenja ID-a',
					'error'
				)
			}
			if(trenutniId == idOgranicenje)		//ID je dosegao svoje ogranienje
			{
				Swal.fire(
					'Vijest nije dodana',
					'Trenutni ID je: ' + trenutniId +', morate obrisati stare vijesti i postaviti brojac vijesti!',
					'error'
				)
				PlusJedanId();					//vraćanje pocetne vrijednosti counterVijesti-u
				return;
			}
			else								//ID je prihvatljiv
			{
				// Generiranje novoga ključa u bazi
				var sKey = firebase.database().ref().child('Vijesti').push().key;
				var oVijest = 
				{
					DatumVijesti: DajDanasnjiDatum(),
					NazivVijesti: sVijestNaziv,
					OpisVijesti: sVijestTekst,
					KategorijaVijesti : kategorija,
					SlikaVijesti : sVijestSlika,
					IdVijesti: id,
				};

				// Zapiši u Firebase
				var oZapis = {};
				oZapis[sKey] = oVijest;
				oDb_Vijesti.update(oZapis);
				//brisanje vrijednost inputa
				$('#inptNazivVijesti').val('');
				$('#txtTekstVijesti').val('');
				$('#inptSlikaVijesti').val('');
				$('#tvrtka').prop("checked", true);
				//zatvaranje modala
				$('#dodaj-vijest').modal('hide');
				trenutniId--;						//smanjivanje trenutnog ID za jedan jer nova vijest dobila ID 
			}
		}, 1000)
	}
}

function PlusJedanId() {							//funkcija povecava counterVijesti za jedan jer je ptethodno smanjena njegova vrijednost za jedan, ali ta vrijednost se ne moze primjeniti na novu vijesti kao njen ID
    var counterRef = firebase.database().ref('counterVijesti');
    return counterRef.transaction(function(currentId) {
      return currentId + 1;
    });
  }

function ObrisiVijest(sVijestKey)		//brisanje vijesti, sVijestKey je dodijeljen pri popunjavanju tablice
{
	var oVijestRef = oDb.ref('Vijesti/' + sVijestKey);
	oVijestRef.once('value', function(oOdgovorPosluzitelja)
	{
		var oVijest = oOdgovorPosluzitelja.val();
		Swal.fire({
			title: 'Želite li izbrisati ' + oVijest.NazivVijesti,
			text: "Trajno će se obrisati vijest",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Obriši'
		  }).then((result) => {
			if (result.isConfirmed) {
				oVijestRef.remove();
			  Swal.fire(
				'Obrisano!',
				'vijest je uspješno obrisana',
				'success'
			  )
			}
		  })
	});
}

function ModalUrediVijest(sVijestKey)			//otvaranje modala s unesenim vrijednostima iz baze
{	
	var oVijestRef = oDb.ref('Vijesti/' + sVijestKey);
	oVijestRef.once('value', function(oOdgovorPosluzitelja)
	{
		var oVijest = oOdgovorPosluzitelja.val();
		// Popunjavanje elemenata forme za uređivanje
		$('#inptEditNazivVijesti').val(oVijest.NazivVijesti);
		$('#txtEditTekstVijesti').val(oVijest.OpisVijesti);
		$('#inptEditSlikaVijesti').val(oVijest.SlikaVijesti);
		if(oVijest.KategorijaVijesti == "tvrtka")		//odredivanje koji radioBox je oznacen ovisno o vrijednosti u bezi
		{
			$('#tvrtkaUredi').prop("checked", true);
		}
		if(oVijest.KategorijaVijesti == "putovanja")
		{
			$('#putovanjaUredi').prop("checked", true);			
		}
		if(oVijest.KategorijaVijesti == "izmjene")
		{
			$('#izmjeneUredi').prop("checked", true);
		}																	
	
		
		$('#btnUrediVijest').attr('onclick', 'SpremiUredjenuVijest("'+sVijestKey+'")');
		$('#uredi-vijest').modal('show');
	});
}

function SpremiUredjenuVijest(sVijestKey)				//spremanje vijesti prema unesenim vrijednostima
{
	var oVijestRef = oDb.ref('Vijesti/' + sVijestKey);

	var sVijestNaziv = $('#inptEditNazivVijesti').val();
	var sVijestTekst = $('#txtEditTekstVijesti').val();
	var sVijestSlika = $('#inptEditSlikaVijesti').val();
	console.log(kategorija);
	var oVijest = 
	{
		'NazivVijesti': sVijestNaziv, 
		'OpisVijesti': sVijestTekst,
		'SlikaVijesti': sVijestSlika,
		'KategorijaVijesti': kategorija,
	};
	oVijestRef.update(oVijest);
	$('#uredi-vijest').modal('hide');
}

var id = 0;
//Declare a function that increment a counter in a transaction
function getId() {
    var counterRef = firebase.database().ref('counterVijesti');
    return counterRef.transaction(function(currentId) {
      return currentId - 1;			//trenutna vrijednost - 1
    });
  }

function DodavanjeId()		//dodjeljuje ID iz baze (counterVijesti) javnoj varijabli
{
  //Call the asynchronous getID() function
  getId().then(function(transactionResult,) {		//dobavlja vrijednost iz baze - 1
    var newId = transactionResult.snapshot.val();
    id = newId;
	if(id-idOgranicenje < 10 && id-idOgranicenje > -1)
	{
		if(id-idOgranicenje == 0)
		{
			Swal.fire(
				'Važno upozorenje',
				'ID vijesti je dosegnuo svoje ograničenje, ažurirajte! Trenutni ID: ' + id,
				'warning'
			)
		}
		else
		{
			Swal.fire(
				'Upozorenje',
				'Vijesti će biti dodijeljen ID: ' + id,
				'warning'
			)
		}
	}
  });
}

var idOgranicenje = 0;
//Declare a function that increment a counter in a transaction
function getIdOgranicenje() {	
    var counterRefOgranicenje = firebase.database().ref('counterVijestiOgranicenje');
    return counterRefOgranicenje.transaction(function(currentIdOgranicenje) {
      return currentIdOgranicenje;
    });
  }

function DodavanjeIdOgranicenje()		//dodavanje counterVijestiOgranicenje - 1 javnoj varijabli 
{
  //Call the asynchronous getID() function
  getIdOgranicenje().then(function(transactionResult,) {	//dohvacanje vrijednosti ID-a
    var newIdOgranicenje = transactionResult.snapshot.val();
    idOgranicenje = newIdOgranicenje;
  });
}

function ResetPodataka()		//brise sve vrijednosti iz modala
{
	$('#inptNazivVijesti').val('');
	$('#txtTekstVijesti').val('');
    $('#inptSlikaVijesti').val('');
	$('#tvrtka').prop("checked", true);
}

function ResetPodatakaEdit()	//brise sve vrijednosti iz modala
{
	$('#inptEditNazivVijesti').val('');
	$('#txtEditTekstVijesti').val('');
    $('#inptEditSlikaVijesti').val('');
	$('#tvrtkaUredi').prop("checked", true);

}

function PrikazUvjeta()			//kod neispravnog unosa, mogu se vidjeti uvjeti za zadovoljavajuce unoseneje podataka u bazu
{
	Swal.fire({
		title:'Koji su uvjeti?',
		html:'Vijest mora sadržavati ili naziv vijesti ili kratki opis vijesti!',
		icon:'question'
	})
}

$(document).on('keyup','#counterVijesti', function(event){		//dodijeljivanje vrijednosti counterVijesti

    var input = event.currentTarget.value;

    if(input.search(/^0/) != -1){			//prva vrijednost broja ne smije biti 0 jer counterVijesti mora biti > 0
		Swal.fire({
			icon: 'error',
			title: 'Ogromna pogreška!',
			text: 'Početni ID vijesti NE smije biti 0 ili negativan',
		})
        document.getElementById('counterVijesti').value = null;  	//briše vrijednost 
    }
});


function SpremanjePromjena()		//button za spremanje counterVijesti && counterVijestiOgranicenje
{
	if(document.getElementById('counterVijesti').value == "")
	{
		if(document.getElementById('counterVijestiOgranicenje').value == "")	//ako su obje vrijednosti neunesene
		{
			Swal.fire({
				icon: 'error',
				title: 'Neunesene vrijednosti',
				text: 'Niste unjeli vrijednost ni za jedno polje!',
			})
		}
		else
		{
			Swal.fire({
				icon: 'success',
				title: 'Radnja dovršena',
				text: 'Promjena je uspješno spremljena!',
			})
			var counterRef = firebase.database().ref('counterVijestiOgranicenje');
			return counterRef.transaction(function(currentId) {
				return document.getElementById('counterVijestiOgranicenje').value;	//dodavanje vrijednosti u bazu
			});
		}
	}
	if(document.getElementById('counterVijestiOgranicenje').value == "")
	{
		if(document.getElementById('counterVijesti').value == "")	//ako su obje vrijednosti neunesene
		{
			Swal.fire({
				icon: 'error',
				title: 'Neunesene vrijednosti',
				text: 'Niste unjeli vrijednost ni za jedno polje!',
			})
		}
		else
		{
			Swal.fire({
				icon: 'success',
				title: 'Radnja dovršena',
				text: 'Promjena je uspješno spremljena!',
			})
			var counterRef = firebase.database().ref('counterVijesti');
			return counterRef.transaction(function(currentId) {
				return document.getElementById('counterVijesti').value;		//dodavanje vrijednosti u bazu
			});
		}
	}
	if(document.getElementById('counterVijesti').value != "" && document.getElementById('counterVijestiOgranicenje').value != "")	//ako su obje vrijednosti unešene
	{
		Swal.fire({
			icon: 'success',
			title: 'Radnja dovršena',
			text: 'Promjena je uspješno spremljena!',
		})
		var counterOgranicenjeRef = firebase.database().ref('counterVijestiOgranicenje');
			return counterOgranicenjeRef.transaction(function(currentId) {
				DovrsavanjeDodavanja();
				return document.getElementById('counterVijestiOgranicenje').value;	//dodavanje vrijednosti u bazu
			});
		function DovrsavanjeDodavanja()		//dodavanja counterVijesti nakon toga se nastavlja dodavanja counterVIjestiOgranicenje
		{
			var counterRef = firebase.database().ref('counterVijesti');
			return counterRef.transaction(function(currentId) {
				return document.getElementById('counterVijesti').value;		//dodavanje vrijednosti u bazu
			});
		}
	}
}