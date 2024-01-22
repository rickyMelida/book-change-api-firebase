const { authAdmin, admin } = require("../services/firebase-admin-service");
const { auth } = require("../services/firebase-service");
const path = require("path");
const {
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  onAuthStateChanged,
} = require("firebase/auth");
require("dotenv").config({ path: path.join(process.cwd(), ".env") });

module.exports.authService = {
  signUp: async (userInfo) => {
    const { email } = userInfo;
    try {
      auth.useDeviceLanguage();
      const dataUserCreated = await authAdmin.createUser(userInfo);
      const linkEmailVerification =  await authAdmin.generateEmailVerificationLink(email);
      const spanishLinkVerification = linkEmailVerification.replace("lang=en", "lang=es");

      return await { name: dataUserCreated.displayName, email, spanishLinkVerification };
    } catch (err) {
      throw(err);
    }
  },
  signIn: async (userInfo) =>{
    const { email, password } = userInfo;

    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password); 
        return await userCredential.user;

    }catch(err){
        throw(err)
    }
  },
  logOut: async () =>{
    try{
        const authentication = getAuth();

        return await signOut(authentication); 
    }catch(err){
        throw(err)
    }
  },
  isAuthenticated: async (token) =>{
    try{
        await authAdmin.verifyIdToken(token);
        return true;
    }catch(err){
        return false;
    }
  }

};
