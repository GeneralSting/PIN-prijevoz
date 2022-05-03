var svrha = "";
//provjera prijave te svrha prijavljenog
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
        // User is signed in.
        FunkcijaKorisnika(user.uid);
    setTimeout(() =>
    {
      if(svrha == "Admin")    //prijavljeni je admin
      {
        document.getElementById("admin_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
        document.getElementById("user_div").style.display = "none";
        document.getElementById("korakUnazad").style.display = "none";
      }
      else      //prijavljeni je korisnik
      {
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
        document.getElementById("admin_div").style.display = "none";
        document.getElementById("korakUnazad").style.display = "block";
        var user = firebase.auth().currentUser;
        var name;
        if(user != null){
          PozdravKorisnika(user.uid);  // podzdrav korisnika njegovim imenom i prezimenom
          var email_id = user.email;
        }
      }
      //close();
    }, 2000)

  } else {
    // No user is signed in.
    document.getElementById("user_div").style.display = "none";
    document.getElementById("admin_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    document.getElementById("korakUnazad").style.display = "block";
  }
});

function login(){   //provjera tocnosti prijave

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    Swal.fire({
      icon: 'error',
      title: "Pogreška",
      text: errorMessage,
      })
  });
}

function Pozdrav()    //nepotrebna funkcija
{
  var rezultat = "";
  var oGradRef = oDb.ref('Registrirani');  
	oGradRef.once('value', function(oOdgovorPosluzitelja)
 {
  var oGrad = oOdgovorPosluzitelja.val();
  rezultat = oGrad.ime;
  korisnik = oGrad.ime;
});
alert(rezultat);
return rezultat;
}

function logout(){    // odjava
  firebase.auth().signOut();
}
