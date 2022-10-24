const { authAdmin } = require("../services/firebase-admin-service");
const { auth } = require("../services/firebase-service");

const {
  signInWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} = require("firebase/auth");

const signUp = (req, res) => {
  try {
    const { email, password, displayName, photoURL, phoneNumber } = req.body;

    authAdmin
      .createUser({
        email,
        password,
        displayName,
        photoURL,
        phoneNumber,
      })
      .then((rs) => {
        return res.status(200).send({ Message: rs });
      })
      .catch((er) => {
        return res.status(500).send({ Message: er });
      });
  } catch (err) {
    return res.status(500).send({ message: `${err}` });
  }
};

const signIn = (req, res) => {
  const { email, password } = req.body;

  if (email == null || password == null)
    return res.status(400).send({ message: "Algunos campos estan vacios" });

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      res.cookie("user-uid", userCredential.user.uid);
      res.status(200).send({ userData: userCredential.user });
      console.log(userCredential.user);
    })
    .catch((error) =>
      res
        .status(400)
        .send({ error: error, message: "Email o Contraseña incorrecta" })
    );
};

const sendMailVerification = async (userRegisterd) => {
  await sendEmailVerification(userRegisterd);
};

const logOut = (req, res) => {
  res.clearCookie("user-uid");
};

module.exports = { signIn, signUp, logOut };
