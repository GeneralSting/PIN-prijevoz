var sUrl = window.location.href ;
console.log(sUrl);
var oUrl = new URL(sUrl);
console.log(oUrl);
var sVijestKey = oUrl.searchParams.get("grad_key");
console.log(sVijestKey);
var oVijestRef = oDb.ref('gradovi/' + sVijestKey);

oVijestRef.once('value', function(oOdgovorPosluzitelja)
{
	var oVijest = oOdgovorPosluzitelja.val();
	// Popunjavanje elemenata forme za uređivanje
	$('#vijest-naziv').prepend(oVijest.vijest_naziv);
	$('#vijest-datum').text(oVijest.datum);
	$('#vijest-tekst').html(oVijest.vijest_tekst);

});