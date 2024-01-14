const utils = require("../utils/utils");
const assert = require("assert");

describe("Utilities methods to use", () => {
  it("read and encrypt files in base64 and return array for that files", async () => {
    const folderFiles = "./upload";

    const result = await utils.readAndEncryptFiles(folderFiles);

    assert(Array.isArray(result), "This is not a array");
    assert.notStrictEqual(result.length, 0, "Array empty");
  });
});
