oDb_Pogodnosti.on('value', function(oOdgovorPosluzitelja) 
{
	var oSelectPogodnosti = $('#odabirPogodnosti');
	var oSelectPogodnosti2 = $('#odabirPogodnosti2');
	var oSelectPogodnosti3 = $('#odabirPogodnosti3');
	var oSelectPogodnosti4 = $('#odabirPogodnosti4');
	var oSelectPogodnosti5 = $('#odabirPogodnosti5');
	var oSelectPogodnosti6 = $('#odabirPogodnosti6');
	oSelectPogodnosti.empty();
	oSelectPogodnosti2.empty();
	oSelectPogodnosti3.empty();
	oSelectPogodnosti4.empty();
	oSelectPogodnosti5.empty();
	oSelectPogodnosti6.empty();
	oOdgovorPosluzitelja.forEach(function(oPogodnostiSnapshot)
	{
		var sPogodnostKey = oPogodnostiSnapshot.key;
		var oPogodnost = oPogodnostiSnapshot.val();
        oSelectPogodnosti.append('<option>'+oPogodnost.NazivPogodnosti+'</option>');
		oSelectPogodnosti2.append('<option>'+oPogodnost.NazivPogodnosti+'</option>');
		oSelectPogodnosti3.append('<option>'+oPogodnost.NazivPogodnosti+'</option>');
		oSelectPogodnosti4.append('<option>'+oPogodnost.NazivPogodnosti+'</option>');
		oSelectPogodnosti5.append('<option>'+oPogodnost.NazivPogodnosti+'</option>');
		oSelectPogodnosti6.append('<option>'+oPogodnost.NazivPogodnosti+'</option>');
	});
});