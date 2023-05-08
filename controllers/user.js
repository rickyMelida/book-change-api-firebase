const { authAdmin } = require("../services/firebase-admin-service");
const getUser = (req, res) => {
  const { uid } = req.params;
  authAdmin
    .getUser(uid)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({ err });
    });
};

module.exports = { getUser };
