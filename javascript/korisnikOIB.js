function DodavanjeVrijednostiOib(korisnikOib)       //vrijednost korisnikovog oiba
{
    var oibKorisnika = korisnikOib;
    sessionStorage.setItem('oib', oibKorisnika);
}
function OtvaranjeTabliceKorisnika()
{
    window.open('C:/wamp64/www/PIN-prijevoz/TablicaKartiKorisnika.html');  
}

    
