const { firestoreAdmin } = require("../services/firebase-admin-service");
const { v4: uuid } = require("uuid");

const { existValueEmpty, sendMail } = require("../utils/utils");
const {
  subjectUserAlert,
  bodyUserAlert,
} = require("../utils/constantGenerics");
const { getBook } = require("./book");

const setTransacion = async (req, res) => {
  const transactionData = req.body;
  const uid = uuid();
  const transactionDate = new Date();
  const transactionDetail = { ...transactionData, transactionDate };
  const infoEmail = {
    bookName: "",
    bookOwner: "",
    bookInterested: "",
    transactionType: "",
    emailInterestedUser: "",
  };

  if (!existValueEmpty(transactionDetail)) {
    return res
      .status(400)
      .send({ message: "Uno o varios campos estan vacios." });
  }

  try {
    const serverRespose = await firestoreAdmin
      .collection("transactions")
      .doc(uid)
      .create(transactionDetail);

    await sendMail(
      transactionData.emailOwnerBook,
      subjectUserAlert,
      bodyUserAlert(infoEmail)
    );

    return res.status(200).send({ serverRespose });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

module.exports = { setTransacion };
