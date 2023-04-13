const { authAdmin } = require("../services/firebase-admin-service");
const { auth } = require("../services/firebase-service");
const {
  signInWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signOut,
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
  const authentication = getAuth();
  signOut(authentication)
    .then(() => {
      res.status(200).send({ message: "Cierre de sesion exitoso." });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Hubo un error al intentar cerrar la sesion" });
    });
};

const verifyAuth = (req, res) => {
  const user = auth.currentUser;

  if (user) return res.status(200).send({ status: "200", userData: user });

  return res
    .status(401)
    .send({ status: "401", message: "Usuario no autenticado" });
};

module.exports = { signIn, signUp, logOut, verifyAuth };
