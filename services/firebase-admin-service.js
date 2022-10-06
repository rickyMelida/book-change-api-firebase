require("dotenv").config();
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getAuth } = require("firebase-admin/auth");

const app = initializeApp({
  credential: applicationDefault(),
});
const authAdmin = getAuth();
const firestoreAdmin = getFirestore();

module.exports = { authAdmin, firestoreAdmin };
