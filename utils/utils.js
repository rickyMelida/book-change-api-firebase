const fs = require("fs");
const { promisify } = require("util");

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
