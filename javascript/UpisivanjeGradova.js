
var lGradovi = [];
/* 1-sortiranje liste gradova po abecedi
   2-popunjavanje datalist odrediste i polaziste sortiranim gradovima
   3-popunjavanje tablice gradova sortiranim gradovima */
oDb_Gradovi.on('value', function(oOdgovorPosluzitelja) 
{
	var oTablicaGradova = $('#tablica-postovi tbody');
	var oDatalistOdrediste = $('#odabirOdredista');
	var oDatalistPolaziste = $('#odabirPolazista');
	oDatalistOdrediste.empty();
	oDatalistPolaziste.empty();
	oTablicaGradova.empty();
	oOdgovorPosluzitelja.forEach(function(oGradSnapshot)
	{
		var sGradKey = oGradSnapshot.key;
		var oGrad = oGradSnapshot.val();
		lGradovi.push(oGrad.GradNaziv);
	});
	lGradovi.sort();
	for(var brojGradova = 0; brojGradova < lGradovi.length; brojGradova++)
	{
		oOdgovorPosluzitelja.forEach(function(oGradSnapshot)
		{
			var sGradKey = oGradSnapshot.key;
			var oGrad = oGradSnapshot.val();
			if(lGradovi[brojGradova] == oGrad.GradNaziv)
			{
				if(oGrad.Aktivan == "Da")
				{
					oDatalistPolaziste.append('<option value="'+oGrad.GradNaziv + '"/>');
					oDatalistOdrediste.append('<option value="'+oGrad.GradNaziv + '"/>');
				}
				oTablicaGradova.append('<tr><td>' + oGrad.GradNaziv + '</td><td>' + oGrad.Latitude + oGrad.LtStranaSvijeta + '</td><td>'+ oGrad.Longitude + oGrad.LngStranaSvijeta + '</td><td>' + oGrad.Aktivan + '</td><td><button type="button"  onclick="ModalUrediVijest(\''+sGradKey+'\')" class="btn btn-sm btn-info"><i class="fas fa-edit"></i></button></td><td><button onclick="ObrisiGrad(\''+sGradKey+'\')" type="button" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button></td></tr>');
			}
		});
	}
	lGradovi = [];
});



var brojac = 0;
var aktivnost = "Ne";
function ButtonToggle()                     //pritiskom na button aktivnosti grada, dodaje se vrijednost varijabli aktivnost ovinso o broju pritiskanja buttona.
{
	brojac++;
	if(brojac % 2 == 0 && brojac > 0)
	{
		aktivnost = "Ne";
	}
	else
	{
		aktivnost = "Da";
	}
}

var provjeraAktivnosti = "";
//funkcija se ne koristi
function ProvjeraAktivnosti()
{
	return provjeraAktivnosti;
}

var odabranaLngStranaSvijeta = "°E";
function OdabirLngStraneSvijeta(stranaSvijeta)      //funkcija koja javnoj, public varijabli dodaje vrijednost za longitudu
{
	odabranaLngStranaSvijeta = stranaSvijeta;
}

var odabranaLtStranaSvijeta = "°N";
function OdabirLtStraneSvijeta(stranaSvijeta)		//funkcija koja javnoj, public varijabli dodaje vrijednost za latitudu
{
	odabranaLtStranaSvijeta = stranaSvijeta;
}

function PrikazUvjeta()								//prikaz koji uvjeti se moraju ispuniti da bi unos bio valjan.
{
	Swal.fire({
		title:'Koji su uvjeti?',
		html:'0 < <b>Longituda</b> < 180<br/>0 < <b>Latituda</b> < 90<br/><b>Naziv grada</b> mora imati bar jedan znak!',
		icon:'question'
	})
}

function DodajGrad() 								//funkcija koja dodaje novi grad
{	
	var sGradNaziv = $('#nazivGrada').val();
    var sGradLatituda = $('#latitudaGrada').val();
    var sGradLongituda = $('#longitudaGrada').val();
	//provjera unesenih podataka vezanih za novi grad
	if(sGradNaziv == "" || sGradNaziv == " " || document.getElementById("longitudaGrada").value.length == 0 || document.getElementById("longitudaGrada").value < 0 || document.getElementById("longitudaGrada").value > 180 || document.getElementById("latitudaGrada").value < 0 || document.getElementById("latitudaGrada").value > 90 ||document.getElementById("latitudaGrada").value.length == 0)
	{
		Swal.fire({
			icon: 'error',
			title: 'Nepravilan unos',
			text: 'Niste pravilno unjeli podatke, provjerite',
			footer: '<a href="#" onclick="PrikazUvjeta()">Prikaži uvjete podataka</a>'
		  })
		  return;
	}
	var sGradLngStranaSvijeta = odabranaLngStranaSvijeta;
	var sGradLtStranaSvijeta = odabranaLtStranaSvijeta;
	if(brojac == 0)
	{
		//button nije ni jednom pritisnut pa ima početnu vrijednost, a to je Ne.
		var sGradAktivnost = "Ne";
	}
	else
	{
		//button je bar jednom pritisnut.
    	var sGradAktivnost = aktivnost;
	}
	// Generiranje novoga ključa u bazi
	var sKey = firebase.database().ref().child('Gradovi').push().key;
    var oGrad = 
    {
        GradNaziv: sGradNaziv,  
        Latitude: sGradLatituda,
		LtStranaSvijeta: sGradLtStranaSvijeta,
        Longitude: sGradLongituda,
		LngStranaSvijeta: sGradLngStranaSvijeta,
        Aktivan: sGradAktivnost
    };
    // Zapiši u Firebase
    var oZapis = {};
    oZapis[sKey] = oGrad;
    oDb_Gradovi.update(oZapis);
	//brisanje vrijednost inputa
	$('#nazivGrada').val('');
	$('#latitudaGrada').val('');
    $('#longitudaGrada').val('');
    document.getElementById("Sjever").checked = true;
	$('#Istok').prop("checked", true);
	$('#aktivnostGrada').prop("checked", false);
	Swal.fire(
		'Dodano!',
		'Grad je uspješno dodan',
		'success'
	)
	//zatvaranje modala
}

function ResetBrojaca()       			//funkcija koja se poziva kada se klikne button spremi ili resetiraj u modala kod upisivanja novog grada ili kod uredivanja grada.
{
	brojac = 0;
}

function ResetPodataka()           		//button reset, briše sve vrijednosti te vraća na početno stanje.
{
	$('#nazivGrada').val('');
	$('#latitudaGrada').val('');
    $('#longitudaGrada').val('');
    document.getElementById("Sjever").checked = true;
	$('#Istok').prop("checked", true);
	$('#aktivnostGrada').prop("checked", false);
}

function ObrisiGrad(sGradKey)         				//funkcija briše grad iz baze, sGradKey je dodijeljen pri ispunjavanju tablice gradova
{
	var oGradRef = oDb.ref('Gradovi/' + sGradKey);
	oGradRef.once('value', function(oOdgovorPosluzitelja)
	{
		var oGrad = oOdgovorPosluzitelja.val();
		Swal.fire({
			title: 'Želite li izbrisati ' + oGrad.GradNaziv,
			text: "Trajno će se obrisati grad",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Obriši'
		  }).then((result) => {
			if (result.isConfirmed) {
				oGradRef.remove();
			  Swal.fire(
				'Obrisano!',
				'Grad je uspješno obrisan',
				'success'
			  )
			}
		  })
	});
}

function ModalUrediVijest(sGradKey)					//funkcija otvara modal za azuriranje grada, sGradKey je dodijeljen pri ispunjavanju tablice gradova
{													//ova funkcija daje mogućnost mijenjanja grada, ona ne sprema promjene
	var oGradRef = oDb.ref('Gradovi/' + sGradKey);
	oGradRef.once('value', function(oOdgovorPosluzitelja)
	{
		var oGrad = oOdgovorPosluzitelja.val();
		// Popunjavanje elemenata forme za uređivanje
		$('#editNazivGrada').val(oGrad.GradNaziv);
		$('#editLatitudaGrada').val(oGrad.Latitude);
		$('#editLongitudaGrada').val(oGrad.Longitude);
		if(oGrad.Aktivan == "Da")
		{
			$('#editAktivnostGrada').prop("checked", true);
		}
		else
		{
			$('#editAktivnostGrada').prop("checked", false);
		}
		if(oGrad.LngStranaSvijeta == "°E")
		{
			document.getElementById("editIstok").checked = true;
		}
		else
		{
			document.getElementById("editZapad").checked = true;
		}
		if(oGrad.LtStranaSvijeta == "°N")
		{
			document.getElementById("editSjever").checked = true;
		}
		else
		{
			document.getElementById("editJug").checked = true;
		}
		$('#btnUrediGrad').attr('onclick', 'SpremiUredjeniGrad("'+sGradKey+'")');
		$('#uredi-grad').modal('show');
	});
	
}

function ProvjeraButtonToggle()				//provjera da li je button za aktivnost pritisnut ili nije
{
	var isChecked = document.getElementById('editAktivnostGrada').checked
	if(isChecked)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function SpremiUredjeniGrad(sGradKey)
{
	var oGradRef = oDb.ref('Gradovi/' + sGradKey);
	var sGradNaziv = $('#editNazivGrada').val();
    var sGradLatituda = $('#editLatitudaGrada').val();
    var sGradLongituda = $('#editLongitudaGrada').val();
	var sGradLngStranaSvijeta = odabranaLngStranaSvijeta;
	var sGradLtStranaSvijeta = odabranaLtStranaSvijeta;
	if(ProvjeraButtonToggle() == true)
	{
		brojac = 1;					//ako je pritisnut, brojac mora poprimit novu vrijednost, a to je 1 jer 1 znaci da je button pritisnut
		if(brojac % 2 == 0)			//provjera je ista, samo je brojac promjenjen.	
		{
			var sGradAktivnost = "Ne";
		}
		else
		{
			var sGradAktivnost = "Da";
		}
	}
	if(ProvjeraButtonToggle() == false)
	{
		brojac = 2;					//brojac = 2 = 0, nema promjene, isti je uvjet
		if(brojac % 2 == 0)
		{
			var sGradAktivnost = "Ne";
		}
		else
		{
			var sGradAktivnost = "Da";
		}
	}
	//provjera uvjeta
	if(sGradNaziv == "" || sGradNaziv == " " || document.getElementById("editLongitudaGrada").value.length == 0 || document.getElementById("editLongitudaGrada").value < 0 || document.getElementById("editLongitudaGrada").value > 180 || document.getElementById("editLatitudaGrada").value < 0 || document.getElementById("editLatitudaGrada").value > 90 ||document.getElementById("editLatitudaGrada").value.length == 0)
	{
		Swal.fire({
			icon: 'error',
			title: 'Nepravilan unos',
			text: 'Niste pravilno unjeli podatke, provjerite',
			footer: '<a href="#" onclick="PrikazUvjeta()">Prikaži uvjete podataka</a>'
		  })
		  return;
	}
    var oGrad = 
    {
        GradNaziv: sGradNaziv,  
        Latitude: sGradLatituda,
		LtStranaSvijeta: sGradLtStranaSvijeta,
        Longitude: sGradLongituda,
		LngStranaSvijeta: sGradLngStranaSvijeta,
        Aktivan: sGradAktivnost
    };
	oGradRef.update(oGrad);
	Swal.fire(
		'Promjenjeno!',
		'Grad je uspješno promjenjen',
		'success'
	  )
	$('#uredi-grad').modal('hide');
	//davanje početne vrijednosti brojacu.
	brojac = 0;
}