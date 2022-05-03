var sUrl = window.location.href ;
console.log(sUrl);
var oUrl = new URL(sUrl);
console.log(oUrl);
var sVijestKey = oUrl.searchParams.get("vijest_key");
console.log(sVijestKey);
var oVijestRef = oDb.ref('Vijesti/' + sVijestKey);		//otvaranje nove stranice za odredenu vrijednost

oVijestRef.once('value', function(oOdgovorPosluzitelja)		//ispunjavanje naziva i opisa vijesti za odabranu vijest
{
	var oVijest = oOdgovorPosluzitelja.val();
	// Popunjavanje elemenata
	$('#vijest-naziv').prepend(oVijest.NazivVijesti);
	$('#vijest-datum').text(oVijest.DatumVijesti);
	$('#vijest-tekst').html(oVijest.OpisVijesti);

});