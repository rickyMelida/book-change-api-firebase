require("dotenv").config();
const { applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getAuth } = require("firebase-admin/auth");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: applicationDefault(),
});

const authAdmin = getAuth();
const firestoreAdmin = getFirestore();

module.exports = { authAdmin, firestoreAdmin, admin };
