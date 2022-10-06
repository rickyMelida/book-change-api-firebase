const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const path = require("path");
require("dotenv").config({ path: path.join(process.cwd(), ".env") });

chai.use(chaiHttp);
const url = `${process.env.URL}/auth`;

describe("Users Authentication", () => {
  it("New User Registering", (done) => {
    chai
      .request(url)
      .post("/signup")
      .send({
        email: "test@gmail.com",
        password: "asd15a15.qQa44",
        displayName: "User Testing",
        photoURL:
          "https://miro.medium.com/max/1024/1*Y07KF-_laqG2cJ1Squ0Bag.png",
        phoneNumber: "+595991123456",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("User Authentication", (done) => {
    chai
      .request(url)
      .post("/signin")
      .send({
        email: process.env.EMAIL_VALID,
        password: process.env.PASSWORD_VALID,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
