oDbVijesti.on('value', function(oOdgovorPosluzitelja) 
{
	var oTablicaVijesti = $('#tablica-postovi tbody');
	oTablicaVijesti.empty();
	var nRbr = 1;
	oOdgovorPosluzitelja.forEach(function(oVijestSnapshot)
	{
		var sVijestKey = oVijestSnapshot.key;
		var oVijest = oVijestSnapshot.val();
		oTablicaVijesti.append('<tr><td>' + nRbr++ + '.</td><td>' + oVijest.datum + '</td><td><a href="vijest.html?vijest_key='+sVijestKey+'">' + oVijest.vijest_naziv + '</a></td><td><button type="button"  onclick="ModalUrediVijest(\''+sVijestKey+'\')" class="btn btn-sm btn-info"><i class="fas fa-edit"></i></button></td><td><button onclick="ObrisiVijest(\''+sVijestKey+'\')" type="button" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button></td></tr>');
		
	});
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

function DodajVijest() 
{

	var sVijestNaziv = $('#inptNazivVijesti').val();
	var sVijestTekst = $('#txtTekstVijesti').val();

	// Generiranje novoga ključa u bazi
	var sKey = firebase.database().ref().child('vijesti').push().key;

    var oVijest = 
    {
        datum: DajDanasnjiDatum(),
        vijest_naziv: sVijestNaziv,
        vijest_tekst: sVijestTekst,
    };

    // Zapiši u Firebase
    var oZapis = {};
    oZapis[sKey] = oVijest;
    oDbVijesti.update(oZapis);
	//brisanje vrijednost inputa
	$('#inptNazivVijesti').val('');
	$('#txtTekstVijesti').val('');
	//zatvaranje modala
	$('#dodaj-vijest').modal('hide');
}

function ObrisiVijest(sVijestKey)
{
	var oVijestRef = oDb.ref('vijesti/' + sVijestKey);
	oVijestRef.remove();
}

function ModalUrediVijest(sVijestKey)
{	
	var oVijestRef = oDb.ref('vijesti/' + sVijestKey);
	oVijestRef.once('value', function(oOdgovorPosluzitelja)
	{
		var oVijest = oOdgovorPosluzitelja.val();
		// Popunjavanje elemenata forme za uređivanje
		$('#inptEditNazivVijesti').val(oVijest.vijest_naziv);
		$('#txtEditTekstVijesti').val(oVijest.vijest_tekst);
		$('#btnUrediVijest').attr('onclick', 'SpremiUredjenuVijest("'+sVijestKey+'")');

		$('#uredi-vijest').modal('show');
	});
}

function SpremiUredjenuVijest(sVijestKey)
{
	var oVijestRef = oDb.ref('vijesti/' + sVijestKey);

	var sVijestNaziv = $('#inptEditNazivVijesti').val();
	var sVijestTekst = $('#txtEditTekstVijesti').val();

	var oVijest = 
	{
		'vijest_naziv': sVijestNaziv, 
		'vijest_tekst': sVijestTekst
	};
	oVijestRef.update(oVijest);
	$('#uredi-vijest').modal('hide');
}
