function ShowHide(checked)
{
	if(checked == true)
	{
		$('#hiddenField').fadeIn();
	}
	else
	{
		$('#hiddenField').fadeOut();
	}
}

$('#brojPutnikaPrijava').bind('keyup mouseup', function()
{
	if(document.getElementById('brojPutnikaPrijava').value >= 2)
	{
		$('#prikazPogodnosti2').fadeIn();
		if(document.getElementById('brojPutnikaPrijava').value >= 3)
		{
			$('#prikazPogodnosti3').fadeIn();
			if(document.getElementById('brojPutnikaPrijava').value >= 4)
		{
			$('#prikazPogodnosti4').fadeIn();
			if(document.getElementById('brojPutnikaPrijava').value >= 5)
		{
			$('#prikazPogodnosti5').fadeIn();
			if(document.getElementById('brojPutnikaPrijava').value >= 6)
		{
			$('#prikazPogodnosti6').fadeIn();
		}
		else
		{
			$('#prikazPogodnosti6').fadeOut();
			$('#odabirPogodnosti6').value = null;
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

function DajDanasnjiDatum() 
{
    var tdate = new Date();
    var dd = tdate.getDate();
    var MM = tdate.getMonth(); 
    var yyyy = tdate.getFullYear(); 
    var sDatum = dd + "." + (MM + 1) + "." + yyyy;

    return sDatum;
}