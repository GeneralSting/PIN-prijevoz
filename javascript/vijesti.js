var sveVijesti = $('#sve-vijesti');
sveVijesti.empty();
// događaj dohvaćanja podataka iz čvora vijesti
oDb_Vijesti.on('value', function (oOdgovorPosluzitelja)
{

    oOdgovorPosluzitelja.forEach(function (oVijestSnapshot)
    {
        var sVijestKey = oVijestSnapshot.key;
        var oVijest = oVijestSnapshot.val();
        sveVijesti.append('<div onclick="PozivVijesti()" class="card mt-4"><div class="card-body"><h5 class="card-title">'+oVijest.NazivVijesti+'</h5><p class="card-text">'+oVijest.OpisVijesti+'</p></div><div class="card-footer text-muted">'+oVijest.DatumVijesti+'</div></div>');
    });
    document.getElementsByClassName('background-image')[0].style.background = "url('img/patternIndexVijesti.jpg')"; 
    document.getElementsByClassName('background-image')[0].style.backgroundRepeat = "repeat";   //background pattern je postavljen da se ponavlja jer je stranica dinamična
});

function PozivVijesti()
{
    
}