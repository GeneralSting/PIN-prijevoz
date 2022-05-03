/*document.getElementById('jednosmjerna').disabled = true;
document.getElementById('povratna').disabled = true;*/

//funkcija za prikaz ili skrivanje datuma povratka,
function ShowHide(checked)
{
	if(checked == true)
	{
		$('#hiddenField').fadeIn();
		return true;
	}
	else
	{
		$('#hiddenField').fadeOut();
		return false;
	}
}

//prikaz broj pogodnosti ovisno o broju odabranih putnika
//#prikazPogodnosti -> div
//#odabirPogodnosti -> select element
$('#brojPutnika').bind('keyup mouseup', function()
{
	if(document.getElementById('brojPutnika').value >= 2)
	{
		$('#prikazPogodnosti2').fadeIn();
		if(document.getElementById('brojPutnika').value >= 3)
		{
			$('#prikazPogodnosti3').fadeIn();
			if(document.getElementById('brojPutnika').value >= 4)
		{
			$('#prikazPogodnosti4').fadeIn();
			if(document.getElementById('brojPutnika').value >= 5)
		{
			$('#prikazPogodnosti5').fadeIn();
			if(document.getElementById('brojPutnika').value >= 6)
		{
			$('#prikazPogodnosti6').fadeIn();
		}
		else
		{
			$('#prikazPogodnosti6').fadeOut();
			$('#odabirPogodnosti6').value = null;               //ako nije prikazan select element dobiva null vrijednost
		}
		}
		else
		{
			$('#prikazPogodnosti5').fadeOut();
			//$('#odabirPogodnosti5').value = null;
		}
		}
		else
		{
			$('#prikazPogodnosti4').fadeOut();
			//$('#odabirPogodnosti4').value = null;
		}
		}
		else
		{
			$('#prikazPogodnosti3').fadeOut();
			//$('#odabirPogodnosti3').value = null;
		}
	}
	else
	{
		$('#prikazPogodnosti2').fadeOut();
		$('#odabirPogodnosti2').value = "Redovna cijena";
	}
})

/*
var DanasnjiDatum = new Date();
datumPovartka.min = DanasnjiDatum.toISOString().split("T")[0];
datumPolaska.min = DanasnjiDatum.toISOString().split("T")[0];*/

//funkcija se ne koristi u index.html-u
function DajDanasnjiDatum() 
{
    var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();

	if (dd < 10) {
	dd = '0' + dd;
	}

	if (mm < 10) {
	mm = '0' + mm;
	} 
		
	today = yyyy + '-' + mm + '-' + dd;
	document.getElementById("datumPovratka").setAttribute("max", today);
}
