const { authAdmin } = require("../services/firebase-admin-service");

const isAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "No tiene autorizacion" });
  }

  try {
    const tokenId = req.headers.authorization.split(" ")[1];

    authAdmin
      .verifyIdToken(tokenId)
      .then((userCredential) => {
        next();
      })
      .catch((error) => {
        res.status(400).send({ error });
      });
  } catch (err) {
    res.status(400).send({ err });
  }
};

module.exports = { isAuth };
