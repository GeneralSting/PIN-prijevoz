// događaj dohvaćanja podataka iz čvora vijesti
oDbGradovi.on('value', function (oOdgovorPosluzitelja)
{

    oOdgovorPosluzitelja.forEach(function (oGradSnapshot)
    {
        var sGradKey = oGradSnapshot.key;
        var oGrad = oGradSnapshot.val();
        sviGradovi.append('<div class="card mt-4"><div class="card-body"><h5 class="card-title">'+oGrad.vijest_naziv+'</h5><p class="card-text">'+oGrad.vijest_tekst+'</p></div><div class="card-footer text-muted">'+oGrad.datum+'</div></div>');
    });
});