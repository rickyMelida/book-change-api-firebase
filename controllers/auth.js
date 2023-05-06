const { authAdmin } = require("../services/firebase-admin-service");
const { auth } = require("../services/firebase-service");
const cookieParser = require("cookie-parser");
const {
  signInWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
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
      res.status(200).send(userCredential.user);
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

const verifyAuth = async (uidRequest) => {
  return new Promise((resolve, reject) => {
    const unsuscribe = onAuthStateChanged(
      auth,
      (user) => {
        try {
          if (!user) resolve({ message: "Usuario no autenticado" });
          const { uid } = user;
          if (uid === uidRequest) resolve(user);
          else resolve({ message: "Usuario no autenticado" });
          unsuscribe();
        } catch (err) {
          resolve({ message: "Usuario no autenticado" });
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const isAuth = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await verifyAuth(uid);
    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

module.exports = { signIn, signUp, logOut, isAuth };
