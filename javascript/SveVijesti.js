const btnHam = document.querySelector('.ham-btn');
const btnTimes = document.querySelector('.times-btn');
const navBar = document.getElementById('nav-bar');    //navbar koji sadrzi kategorije

btnHam.addEventListener('click', function(){      //hamburger menu
    if(btnHam.className !== ""){
        btnHam.style.display = "none";
        btnTimes.style.display = "block";
        navBar.classList.add("show-nav");         //prikazuje navbar
      }
})

btnTimes.addEventListener('click', function(){    //iksic za zatvoriti hamburger menu, iksic se pojavi kada je ham-menu otvoren.
    if(btnHam.className !== ""){
        this.style.display = "none";
        btnHam.style.display = "block";
        navBar.classList.remove("show-nav");      //sakriva navbar
    } 
})

  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyBbDM_m_ckmCwNsnZlAqo997g4_AqzqWjY",
    authDomain: "registriranikorisnici.firebaseapp.com",
    databaseURL: "https://registriranikorisnici-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "registriranikorisnici",
    storageBucket: "registriranikorisnici.appspot.com",
    messagingSenderId: "1070128720438",
    appId: "1:1070128720438:web:66a3e7811d6317a72bc697"
  };
    firebase.initializeApp(config);
    var oDb = firebase.database();  //kompletna baza
    var oDb_Pogodnosti = oDb.ref('Pogodnosti');  //čvor Pogodnosti
    var oDb_Gradovi = oDb.ref('Gradovi');  //čvor Gradovi
    var oDb_Karte = oDb.ref('Karte');
    var oDb_Vijesti = oDb.ref('Vijesti');


var sekcijaUpisa = document.getElementById('sekcijaUpisaVijesti');        //desni dio
var sekcijaUpisaDesna = document.getElementById('slika');                 //lijevi dio

oDb_Vijesti.on('value', function(oOdgovorPosluzitelja)              //funkcija koja popunjava sekcije ovisno o broju vijesti, prvo krece od lijeve sekcije
{
  sekcijaUpisa.empty;
  sekcijaUpisaDesna.empty;
  var brojVijesti = 0;
	oOdgovorPosluzitelja.forEach(function(oGradSnapshot)
	{
    brojVijesti++;
	});
  var LijevoDesno = 1;          //varijabla uz pomoć modula određuje gdje će se postaviti vijesti, na ljevu ili desnu starnu.
  var brojVijestiKrozPetlju = 1;    //varijabla koja se povećava prolazom kroz foreach petlju te se svaki put poveća, svaki put zadovolji jednom uvjet jer bude isti iznos kao i brojacVijesti
  for(let brojacVijesti = brojVijesti; brojacVijesti > 0; brojacVijesti--)
	{
    oOdgovorPosluzitelja.forEach(function(oGradSnapshot)
    {
			if(brojacVijesti == brojVijestiKrozPetlju)  // s ovim postizemo da zadnja dodana vijest bude prikazana prva
      {
        var sGradKey = oGradSnapshot.key;
        var oGrad = oGradSnapshot.val();
        if(LijevoDesno % 2 == 1)
        {
          LijevoDesno++;
          sekcijaUpisa.insertAdjacentHTML('beforeend', '<article><h4>' + oGrad.DatumVijesti + '</h4><div><h2>' + oGrad.NazivVijesti + '</h2><p>' + oGrad.OpisVijesti + '</p><a style="text-decoration: none;" href = "#">Cijela vijest <span> >> </span></a></div><img src="' +oGrad.SlikaVijesti+'"></article>' );
        }
        else
        {
          LijevoDesno++;
          sekcijaUpisaDesna.insertAdjacentHTML('beforeend', '<article><h4>' + oGrad.DatumVijesti + '</h4><div><h2>' + oGrad.NazivVijesti + '</h2><p>' + oGrad.OpisVijesti + '</p><a style="text-decoration: none;" href = "#">Cijela vijest <span> >> </span></a></div><img src="' +oGrad.SlikaVijesti+'"></article>' );
        }
        //sekcijaUpisa.insertAdjacentHTML('beforeend', '<h1>' + oGrad.NazivVijesti + '</h1>');
        //oTablicaGradova.append('<tr><td>' + oGrad.GradNaziv + '</td><td>' + oGrad.Latitude + oGrad.LtStranaSvijeta + '</td><td>'+ oGrad.Longitude + oGrad.LngStranaSvijeta + '</td><td>' + oGrad.Aktivan + '</td><td><button type="button"  onclick="ModalUrediVijest(\''+sGradKey+'\')" class="btn btn-sm btn-info"><i class="fas fa-edit"></i></button></td><td><button onclick="ObrisiGrad(\''+sGradKey+'\')" type="button" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button></td></tr>');
      }
      brojVijestiKrozPetlju++;
    })
    brojVijestiKrozPetlju = 1;  //jednom je zadovoljen uvjet, ponovno postavljanje varijable na početnu vrijednost, petlje se ponavljaju
  }
});

//funkcija se poziva pritiskom na link sve, sve kategorije
function VijestiSve()   //isto kao gornja funkcija samo što se sada ovo odnosi na sve vijesti, sve kategorije
{
  oDb_Vijesti.on('value', function(oOdgovorPosluzitelja) 
{
  sekcijaUpisa.innerHTML = "";
  sekcijaUpisaDesna.innerHTML = "";
  var brojVijesti = 0;
	oOdgovorPosluzitelja.forEach(function(oGradSnapshot)
	{
    brojVijesti++;
	});
  var LijevoDesno = 1;
  var brojVijestiKrozPetlju = 1;
  for(let brojacVijesti = brojVijesti; brojacVijesti > 0; brojacVijesti--)
	{
    oOdgovorPosluzitelja.forEach(function(oGradSnapshot)
    {
			if(brojacVijesti == brojVijestiKrozPetlju)
      {
        var sGradKey = oGradSnapshot.key;
        var oGrad = oGradSnapshot.val();
        if(LijevoDesno % 2 == 1)
        {
          LijevoDesno++;
          sekcijaUpisa.insertAdjacentHTML('beforeend', '<article><h4>' + oGrad.DatumVijesti + '</h4><div><h2>' + oGrad.NazivVijesti + '</h2><p>' + oGrad.OpisVijesti + '</p><a style="text-decoration: none;" href = "#">Cijela vijest <span> >> </span></a></div><img src="' +oGrad.SlikaVijesti+'"></article>' );
        }
        else
        {
          LijevoDesno++;
          sekcijaUpisaDesna.insertAdjacentHTML('beforeend', '<article><h4>' + oGrad.DatumVijesti + '</h4><div><h2>' + oGrad.NazivVijesti + '</h2><p>' + oGrad.OpisVijesti + '</p><a style="text-decoration: none;" href = "#">Cijela vijest <span> >> </span></a></div><img src="' +oGrad.SlikaVijesti+'"></article>' );
        }
        //sekcijaUpisa.insertAdjacentHTML('beforeend', '<h1>' + oGrad.NazivVijesti + '</h1>');
        //oTablicaGradova.append('<tr><td>' + oGrad.GradNaziv + '</td><td>' + oGrad.Latitude + oGrad.LtStranaSvijeta + '</td><td>'+ oGrad.Longitude + oGrad.LngStranaSvijeta + '</td><td>' + oGrad.Aktivan + '</td><td><button type="button"  onclick="ModalUrediVijest(\''+sGradKey+'\')" class="btn btn-sm btn-info"><i class="fas fa-edit"></i></button></td><td><button onclick="ObrisiGrad(\''+sGradKey+'\')" type="button" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button></td></tr>');
      }
      brojVijestiKrozPetlju++;
    })
    brojVijestiKrozPetlju = 1;
  }
});
}

function VijestiTvrtka()        //isto kao gornja funkcija samo što se sada ovo odnosi na sve vijesti iz kategorije tvrtka
{
  oDb_Vijesti.on('value', function(oOdgovorPosluzitelja) 
  {
    sekcijaUpisa.innerHTML = "";
    sekcijaUpisaDesna.innerHTML = "";
    var brojVijesti = 0;
    var jednaVijestiKategorija = 0;       //dodatna varijabla koja označava da li kategorija ima samo jednu vijest ili više
    oOdgovorPosluzitelja.forEach(function(oGradSnapshot)
    {
      var oGrad = oGradSnapshot.val();
      if(oGrad.KategorijaVijesti == "tvrtka")
      {
        jednaVijestiKategorija++;
      }
      brojVijesti++;
    });
    var LijevoDesno = 1;
    var brojVijestiKrozPetlju = 1;
    for(let brojacVijesti = brojVijesti; brojacVijesti > 0; brojacVijesti--)
    {
      oOdgovorPosluzitelja.forEach(function(oGradSnapshot)
      {
        var oGrad = oGradSnapshot.val();
        if(brojacVijesti == brojVijestiKrozPetlju)
        {
          if(oGrad.KategorijaVijesti == "tvrtka")     //dodatan uvjet, da li je vijest kategorije tvrtka
          {
            var sGradKey = oGradSnapshot.key;
            if(LijevoDesno % 2 == 1 || jednaVijestiKategorija == 1)   //dodatan uvjet, vijest ide na lijevu strani ako je jedina u svojoj kategoriji.
            {
              LijevoDesno++;
              sekcijaUpisa.insertAdjacentHTML('beforeend', '<article><h4>' + oGrad.DatumVijesti + '</h4><div><h2>' + oGrad.NazivVijesti + '</h2><p>' + oGrad.OpisVijesti + '</p><a style="text-decoration: none;" href = "#">Cijela vijest <span> >> </span></a></div><img src="' +oGrad.SlikaVijesti+'"></article>' );
            }
            else
            {
              LijevoDesno++;
              sekcijaUpisaDesna.insertAdjacentHTML('beforeend', '<article><h4>' + oGrad.DatumVijesti + '</h4><div><h2>' + oGrad.NazivVijesti + '</h2><p>' + oGrad.OpisVijesti + '</p><a style="text-decoration: none;" href = "#">Cijela vijest <span> >> </span></a></div><img src="' +oGrad.SlikaVijesti+'"></article>' );
            }
            //sekcijaUpisa.insertAdjacentHTML('beforeend', '<h1>' + oGrad.NazivVijesti + '</h1>');
            //oTablicaGradova.append('<tr><td>' + oGrad.GradNaziv + '</td><td>' + oGrad.Latitude + oGrad.LtStranaSvijeta + '</td><td>'+ oGrad.Longitude + oGrad.LngStranaSvijeta + '</td><td>' + oGrad.Aktivan + '</td><td><button type="button"  onclick="ModalUrediVijest(\''+sGradKey+'\')" class="btn btn-sm btn-info"><i class="fas fa-edit"></i></button></td><td><button onclick="ObrisiGrad(\''+sGradKey+'\')" type="button" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button></td></tr>');
          }
        }
        brojVijestiKrozPetlju++;
      })
      brojVijestiKrozPetlju = 1;
    }
  });
  
}

function VijestiIzmjene()       //isto kao gornja funkcija samo što se sada ovo odnosi na sve vijesti iz kategorije izmjene
{
  oDb_Vijesti.on('value', function(oOdgovorPosluzitelja) 
  {
    sekcijaUpisa.innerHTML = "";
    sekcijaUpisaDesna.innerHTML = "";
    var brojVijesti = 0;
    var jednaVijestiKategorija = 0;       //dodatna varijabla koja označava da li kategorija ima samo jednu vijest ili više
    oOdgovorPosluzitelja.forEach(function(oGradSnapshot)
    {
      var oGrad = oGradSnapshot.val();
      if(oGrad.KategorijaVijesti == "izmjene")
      {
        jednaVijestiKategorija++;
      }
      brojVijesti++;
    });
    var LijevoDesno = 1;
    var brojVijestiKrozPetlju = 1;
    for(let brojacVijesti = brojVijesti; brojacVijesti > 0; brojacVijesti--)
    {
      oOdgovorPosluzitelja.forEach(function(oGradSnapshot)
      {
        var oGrad = oGradSnapshot.val();
        if(brojacVijesti == brojVijestiKrozPetlju)
        {
          if(oGrad.KategorijaVijesti == "izmjene")      //dodatan uvjet, da li je vijest kategorije izmjene
          {
            var sGradKey = oGradSnapshot.key;
            if(LijevoDesno % 2 == 1 || jednaVijestiKategorija == 1)     //dodatan uvjet, vijest ide na lijevu strani ako je jedina u svojoj kategoriji.
            {
              LijevoDesno++;
              sekcijaUpisa.insertAdjacentHTML('beforeend', '<article><h4>' + oGrad.DatumVijesti + '</h4><div><h2>' + oGrad.NazivVijesti + '</h2><p>' + oGrad.OpisVijesti + '</p><a style="text-decoration: none;" href = "#">Cijela vijest<span> >> </span></a></div><img src="' +oGrad.SlikaVijesti+'"></article>' );
            }
            else
            {
              LijevoDesno++;
              sekcijaUpisaDesna.insertAdjacentHTML('beforeend', '<article><h4>' + oGrad.DatumVijesti + '</h4><div><h2>' + oGrad.NazivVijesti + '</h2><p>' + oGrad.OpisVijesti + '</p><a style="text-decoration: none;" href = "#">Cijela vijest <span> >> </span></a></div><img src="' +oGrad.SlikaVijesti+'"></article>' );
            }
            //sekcijaUpisa.insertAdjacentHTML('beforeend', '<h1>' + oGrad.NazivVijesti + '</h1>');
            //oTablicaGradova.append('<tr><td>' + oGrad.GradNaziv + '</td><td>' + oGrad.Latitude + oGrad.LtStranaSvijeta + '</td><td>'+ oGrad.Longitude + oGrad.LngStranaSvijeta + '</td><td>' + oGrad.Aktivan + '</td><td><button type="button"  onclick="ModalUrediVijest(\''+sGradKey+'\')" class="btn btn-sm btn-info"><i class="fas fa-edit"></i></button></td><td><button onclick="ObrisiGrad(\''+sGradKey+'\')" type="button" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button></td></tr>');
          }
        }
        brojVijestiKrozPetlju++;
      })
      brojVijestiKrozPetlju = 1;
    }
  });
}

function VijestiPutovanja()       //isto kao gornja funkcija samo što se sada ovo odnosi na sve vijesti iz kategorije putovanja
{
  oDb_Vijesti.on('value', function(oOdgovorPosluzitelja) 
  {
    sekcijaUpisa.innerHTML = "";
    sekcijaUpisaDesna.innerHTML = "";
    var brojVijesti = 0;
    var jednaVijestiKategorija = 0;       //dodatna varijabla koja označava da li kategorija ima samo jednu vijest ili više
    oOdgovorPosluzitelja.forEach(function(oGradSnapshot)
    {
      var oGrad = oGradSnapshot.val();
      if(oGrad.KategorijaVijesti == "putovanja")
      {
        jednaVijestiKategorija++;
      }
      brojVijesti++;
    });
    var brojVijestiKrozPetlju = 1;
    for(let brojacVijesti = brojVijesti; brojacVijesti > 0; brojacVijesti--)
    {
      oOdgovorPosluzitelja.forEach(function(oGradSnapshot)
      {
        var oGrad = oGradSnapshot.val();
        if(brojacVijesti == brojVijestiKrozPetlju)
        {
          if(oGrad.KategorijaVijesti == "putovanja")        //dodatan uvjet, da li je vijest kategorije putovanja
          {
            var sGradKey = oGradSnapshot.key;
            if(brojacVijesti % 2 == 0 || jednaVijestiKategorija == 1)       //dodatan uvjet, vijest ide na lijevu strani ako je jedina u svojoj kategoriji.
            {
              sekcijaUpisa.insertAdjacentHTML('beforeend', '<article><h4>' + oGrad.DatumVijesti + '</h4><div><h2>' + oGrad.NazivVijesti + '</h2><p>' + oGrad.OpisVijesti + '</p><a style="text-decoration: none;" href = "#">Cijela vijest <span> >> </span></a></div><img src="' +oGrad.SlikaVijesti+'"></article>' );
            }
            else
            {
              sekcijaUpisaDesna.insertAdjacentHTML('beforeend', '<article><h4>' + oGrad.DatumVijesti + '</h4><div><h2>' + oGrad.NazivVijesti + '</h2><p>' + oGrad.OpisVijesti + '</p><a style="text-decoration: none;" href = "#">Cijela vijest <span> >> </span></a></div><img src="' +oGrad.SlikaVijesti+'"></article>' );
            }
            //sekcijaUpisa.insertAdjacentHTML('beforeend', '<h1>' + oGrad.NazivVijesti + '</h1>');
            //oTablicaGradova.append('<tr><td>' + oGrad.GradNaziv + '</td><td>' + oGrad.Latitude + oGrad.LtStranaSvijeta + '</td><td>'+ oGrad.Longitude + oGrad.LngStranaSvijeta + '</td><td>' + oGrad.Aktivan + '</td><td><button type="button"  onclick="ModalUrediVijest(\''+sGradKey+'\')" class="btn btn-sm btn-info"><i class="fas fa-edit"></i></button></td><td><button onclick="ObrisiGrad(\''+sGradKey+'\')" type="button" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></button></td></tr>');
          }
        }
        brojVijestiKrozPetlju++;
      })
      brojVijestiKrozPetlju = 1;
    }
  });
}

function Newsletter()       //utipkavanje svog emaila za newsletters, najnuznija provjera mail-a
{
  Swal.fire
  ({
    title: 'Unesite svoju email adresu',
    input: 'text',
    inputAttributes: {
    autocapitalize: 'off'
},
    showCancelButton: true,
    confirmButtonText: 'Pošalji',
    showLoaderOnConfirm: true,
    preConfirm: (login) => 
    {
    if(login.includes("@") && login.length > 4 && login.includes("."))
    {
      Swal.fire({
      position: 'center',
      icon: 'success',
      title: login,
      footer: "Zahtjev za primanje PIN-prijevoz newsletters-a je poslan na unesenu adresu",
      showConfirmButton: false,
      timer: 5000
    })
  }
    else
    {
      Swal.fire({
        icon: 'error',
        title: 'Neispravan oblik',
        text: 'Provjerite točnost unesenog e-maila',
      })
    }
  }
})
}

var id = 0;
//Declare a function that increment a counter in a transaction
function getId() {      //funkcija dobavlja counterVijesti iz baze te vraća counterVijesti-1 što će kasnije biti ID za novu vijest
    var counterVijestiRef = firebase.database().ref('counterVijesti');
    return counterVijestiRef.transaction(function(currentId) {
      return currentId - 1;
    });
  }

//dodavanje ID-a vijesti, ID se nalazi u bazi podataka
function DodavanjeId()
{
  //Call the asynchronous getID() function
  getId().then(function(transactionResult,) {     //prvo se ide u getId funkciju zatim se nastavlja izvoditi trenutna funkcija
    var newId = transactionResult.snapshot.val(); //ovo je rezultat funkcije getId, rezultat ce biti ID vijesti
    id = newId;
  });
  setTimeout(() =>{
    //DodavanjeKarte();
  }, 1000)
}