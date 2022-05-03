//inicijalizacija firebase-a
const firebaseConfig = {
  apiKey: "AIzaSyBbDM_m_ckmCwNsnZlAqo997g4_AqzqWjY",
  authDomain: "registriranikorisnici.firebaseapp.com",
  databaseURL: "https://registriranikorisnici-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "registriranikorisnici",
  storageBucket: "registriranikorisnici.appspot.com",
  messagingSenderId: "1070128720438",
  appId: "1:1070128720438:web:66a3e7811d6317a72bc697"
};

  firebase.initializeApp(firebaseConfig);

// Kreiranje objekta Firebase baze
var oDb = firebase.database();  //kompletna baza
var oDb_Gradovi = oDb.ref('Gradovi');  //čvor Gradovi
var oDb_Pogodnosti = oDb.ref('Pogodnosti');  //čvor Pogodnosti
var oDb_Registrirani = oDb.ref('Registrirani');  //čvor Registrirani
var oDb_Karte = oDb.ref('Karte');
var oDb_Vijesti = oDb.ref('Vijesti');