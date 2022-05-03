const buttons = document.querySelectorAll('a');     //dodavanje elementa pritiska na gumb, ne koristi se
    buttons.forEach(btn => {
    btn.addEventListener('click', function(e){
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;

        let ripples = document.createElement('span');
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        this.appendChild(ripples);

        setTimeout(() =>
        {
            ripples.remove()
        },1000);
    })
})

var buttonGradovi = document.getElementById('btnAdminGradova');
var buttonKarte = document.getElementById('btnPregledKarti');
var buttonVijesti = document.getElementById('btnPregledVijesti');
var body = document.body;

buttonGradovi.onmouseover = function() {                    //ovdje se dodaje klasa gumbu na kojem se mis nalazi
    body.className = 'hoveredGradovi';                      //klasa sadrzi css koji mjenja pozadinu ovisno o klasi
}                                                           //odnosno ovisno koji button smo prešli mišem.

buttonGradovi.onmouseout = function() {
    body.className = '';
}

buttonKarte.onmouseover = function() {
    body.className = 'hoveredKarte';
}

buttonKarte.onmouseout = function() {
    body.className = '';
}
buttonVijesti.onmouseover = function() {
    body.className = 'hoveredVijesti';
}

buttonVijesti.onmouseout = function() {
    body.className = '';
}