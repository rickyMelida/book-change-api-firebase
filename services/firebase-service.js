const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { firebaseConfig } = require("../firebase.json");
const { firebaseConfig } = require("/etc/secrets/firebase.json");
//const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

module.exports = { app, auth };
