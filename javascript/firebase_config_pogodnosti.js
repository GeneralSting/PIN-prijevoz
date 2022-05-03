const firebaseConfigPogodnosti = {
    apiKey: "AIzaSyA1kLUs2BtwAnyiMIA1S9E47WpHe-NXBM0",
    authDomain: "pogodnosti-70e94.firebaseapp.com",
    databaseURL: "https://pogodnosti-70e94-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pogodnosti-70e94",
    storageBucket: "pogodnosti-70e94.appspot.com",
    messagingSenderId: "691528389430",
    appId: "1:691528389430:web:fdafa9640b4536ee08d997"
  };

  await firebase.initializeApp(firebaseConfigPogodnosti);
  
// Kreiranje objekta Firebase baze
var oDb = firebase.database();  //kompletna baza
var oDb_Pogodnosti = oDb.ref('Pogodnosti');  //čvor Gradovi