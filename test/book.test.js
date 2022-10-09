const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const path = require("path");
require("dotenv").config({ path: path.join(process.cwd(), ".env") });

chai.use(chaiHttp);
const url = `${process.env.URL}/book`;

describe("Books", () => {
  it("Get All Books", (done) => {
    chai
      .request(url)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
