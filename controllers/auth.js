const { authAdmin, admin } = require("../services/firebase-admin-service");
const { auth } = require("../services/firebase-service");
const path = require("path");
const nodemailer = require("nodemailer");
const {
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  onAuthStateChanged,
} = require("firebase/auth");
require("dotenv").config({ path: path.join(process.cwd(), ".env") });

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
        authAdmin
          .getUserByEmail(email)
          .then((userRecord) => {
            return authAdmin.generateEmailVerificationLink(userRecord.email);
          })
          .then((link) => {
            const mailOptions = {
              from: "bookchange.admin@gmail.com",
              to: email,
              subject: "Verificación de correo electrónico",
              html: `
                <div>
                  <p>
                    Gracias por registrarte! <br />
                    <p style='margin-bottom: 2%;'>
                      Tu cuenta ha sido creada, puedes iniciar sesión con lo siguiente
                      credenciales después de haber activado su cuenta presionando la url
                      abajo.
                    </p>
                    <hr>
                      Username: ${email} <br>
                      Password: ${password} <br>
                    <hr>
                  </p>
                  <p>
                    Haga clic en este enlace para activar su cuenta:
                  </p>
                  <a href='${link}'>Verificar Correo</a>
                </div>
              `,
            };

            sendMailVerification(mailOptions)
              .then((rm) => {
                return res.status(200).send(rs);
              })
              .catch((err) => {
                return res.status(500).send({
                  message:
                    "Hubo un error al enviar el correo de verificacion. Favor vuelva a intentar mas tarde.",
                  err,
                });
              });
          })
          .catch((err) => {
            return res.status(500).send({
              message:
                "Hubo un error al enviar el correo de verificacion. Favor vuelva a intentar mas tarde.",
              err,
            });
          });
      })
      .catch((er) => {
        return res.status(500).send({
          message:
            "Hubo un error al intentar registrarse. Favor vuelva a intentar mas tarde.",
          err,
        });
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

const sendMailVerification = async (message) => {
  const config = {
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL_ADMIN,
      pass: process.env.PASSWORD_ADMIN,
    },
  };

  const transport = nodemailer.createTransport(config);

  return await transport.sendMail(message);
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
