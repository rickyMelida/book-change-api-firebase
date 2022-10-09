const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const path = require("path");
require("dotenv").config({ path: path.join(process.cwd(), ".env") });

chai.use(chaiHttp);
const url = `${process.env.URL}/user`;
const uid = process.env.UID_VALID;

describe("User", () => {
  it("Get User By UID", (done) => {
    chai
      .request(url)
      .get(`/${uid}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
