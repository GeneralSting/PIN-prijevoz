
oDb_Vijesti.on('value', function(oOdgovorPosluzitelja) 
{
	var oTablicaGradova = $('#tablica-postovi tbody');
	var oDatalistOdrediste = $('#odabirOdredista');
	var oDatalistPolaziste = $('#odabirPolazista');
	oTablicaGradova.empty();
	oOdgovorPosluzitelja.forEach(function(oGradSnapshot)
	{
		var sGradKey = oGradSnapshot.key;
		var oGrad = oGradSnapshot.val();
		oTablicaGradova.append('<tr><td>' + oGrad.NazivVijesti + '</td><td>' + oGrad.OpisVijesti + '</td><td>' +  oGrad.DatumVijesti + '</td><td><button type="button"  onclick="ModalUrediVijest(\''+sGradKey+'\')" class="btn btn-sm btn-info"><i class="fas fa-edit"></i></button></td><td><button onclick="ObrisiGrad(\''+sGradKey+'\')" type="button" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button></td></tr>');
	});
});






function PrikazUvjeta()
{
	Swal.fire({
		title:'Koji su uvjeti?',
		html:'0 < <b>Longituda</b> < 180<br/>0 < <b>Latituda</b> < 90<br/><b>Naziv grada</b> mora imati bar jedan znak!',
		icon:'question'
	})
}

function DodajGrad() 
{	
	var sGradNaziv = $('#nazivGrada').val();
    var sGradLatituda = $('#latitudaGrada').val();
    var sGradLongituda = $('#longitudaGrada').val();
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
		var sGradAktivnost = "Ne";
	}
	else
	{
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


function ResetPodataka()
{
	$('#nazivGrada').val('');
	$('#latitudaGrada').val('');
    $('#longitudaGrada').val('');
    document.getElementById("Sjever").checked = true;
	$('#Istok').prop("checked", true);
	$('#aktivnostGrada').prop("checked", false);
}

function ObrisiGrad(sGradKey)
{
	var oGradRef = oDb.ref('Vijesti/' + sGradKey);
	oGradRef.once('value', function(oOdgovorPosluzitelja)
	{
		var oGrad = oOdgovorPosluzitelja.val();
		Swal.fire({
			title: 'Želite li izbrisati ' + oGrad.NazivVijesti,
			text: "Trajno će se obrisati vijest",
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
				'Vijest je uspješno obrisana',
				'success'
			  )
			}
		  })
	});
}
function ModalUrediVijest(sGradKey)
{	
	var oGradRef = oDb.ref('Vijesti/' + sGradKey);
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

function ProvjeraButtonToggle()
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
		brojac = 1;
		if(brojac % 2 == 0)
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
		brojac = 2;
		if(brojac % 2 == 0)
		{
			var sGradAktivnost = "Ne";
		}
		else
		{
			var sGradAktivnost = "Da";
		}
	}
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
	brojac = 0;
}