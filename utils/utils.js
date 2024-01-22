const nodemailer = require("nodemailer");
const { promisify } = require("util");
const path = require("path");
const fs = require("fs");

require("dotenv").config({ path: path.join(process.cwd(), ".env") });

module.exports.timestampToDate = (timestamp) => {
  let date = timestamp.toDate();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  let yyyy = date.getFullYear();

  date = dd + "/" + mm + "/" + yyyy;
  return date;
};

module.exports.readAndEncryptFiles = async (folderPath) => {
  const readdir = promisify(fs.readdir);
  const readFile = promisify(fs.readFile);
  const imagesBase64 = [];

  try {
    const files = await readdir(folderPath);

    const promises = files.map(async (file) => {
      const filePath = `${folderPath}/${file}`;

      try {
        const data = await readFile(filePath);
        const base64Data = Buffer.from(data).toString("base64");

        imagesBase64.push(base64Data);
      } catch (error) {
        return imagesBase64;
      }
    });

    await Promise.all(promises);
  } catch (error) {
    return imagesBase64;
  }

  return imagesBase64;
};

const sendEmail = async (recipient, subject, body) => {
  const mailOptions = {
    from: "bookchange.admin@gmail.com",
    to: recipient,
    subject,
    html: body,
  };
  const config = {
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL_ADMIN,
      pass: process.env.PASSWORD_ADMIN,
    },
  };

  const transport = nodemailer.createTransport(config);

  return await transport.sendMail(mailOptions);
};

const existValueEmpty = (objectToValue) => {
  for (var key in objectToValue) {
    if (objectToValue.hasOwnProperty(key)) {
      var value = objectToValue[key];

      if (
        value === null ||
        value === undefined ||
        (typeof value === "string" && value.trim() === "")
      ) {
        return true;
      }

      if (typeof value === "object" && !Array.isArray(value)) {
        if (!existValueEmpty(value)) {
          return true;
        }
      }
    }
  }

  return false;
};

const setCookie = (res, name, value) => res.cookie(name, value);

module.exports = { existValueEmpty, sendEmail, setCookie };
