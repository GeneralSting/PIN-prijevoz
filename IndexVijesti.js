oDb_Vijesti.on('value', function(oOdgovorPosluzitelja) 
{
    var oDatalistPolaziste = $('#odabirPolazista');

    var sekcijaUpisa = document.getElementById('sekcijaUpisaVijesti');
    sekcijaUpisa.empty;
	oOdgovorPosluzitelja.forEach(function(oGradSnapshot)
	{
		var sGradKey = oGradSnapshot.key;
		var oGrad = oGradSnapshot.val();
        //sekcijaUpisa.insertAdjacentHTML('beforeend', '<h1>' + oGrad.NazivVijesti + '</h1>');
        sekcijaUpisa.insertAdjacentHTML('beforeend', '<article><h4>' + oGrad.DatumVijesti + '</h4><div><h2>' + oGrad.NazivVijesti + '</h2><p>' + oGrad.OpisVijesti + '</p><a href = "#">Read more <span> >> </span></a></div><img src="' +oGrad.SlikaVijesti+'"></article>' );
        //oTablicaGradova.append('<tr><td>' + oGrad.GradNaziv + '</td><td>' + oGrad.Latitude + oGrad.LtStranaSvijeta + '</td><td>'+ oGrad.Longitude + oGrad.LngStranaSvijeta + '</td><td>' + oGrad.Aktivan + '</td><td><button type="button"  onclick="ModalUrediVijest(\''+sGradKey+'\')" class="btn btn-sm btn-info"><i class="fas fa-edit"></i></button></td><td><button onclick="ObrisiGrad(\''+sGradKey+'\')" type="button" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button></td></tr>');

	});
});