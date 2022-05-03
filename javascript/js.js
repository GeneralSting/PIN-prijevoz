const mainMenu = document.querySelector('.mainMenu');         /*Vraća prvi element unutar documenta koji se podudara sa specifičnim selektorom ili grupom selektora. ako nije pronađen dokument, vraća null*/
const closeMenu = document.querySelector('.closeMenu');
const Close = document.querySelectorAll('.sekcijaStranice');
const openMenu = document.querySelector('.openMenu');

openMenu.addEventListener('click',show);
closeMenu.addEventListener('click',close);
Close.forEach((Close1) => {                                   //svaka sekcija navbara.
Close1.addEventListener('click', close)
});

function show(){
    mainMenu.style.display = 'flex';                          //prikazuje padajuci izbornik
    mainMenu.style.top = '0';
}
function close(){                                             //zatvara padajuci izbornik.
    mainMenu.style.top = '-105%';
}