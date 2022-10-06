let chai = require("chai");
let chaiHttp = require("chai-http");
const should = chai.should;
let { server } = require("../bin/www");

chai.use(chaiHttp);
describe("API", () => {
  describe("/GET files", () => {
    it("it should GET all the files already formatted", (done) => {
      chai
        .request(server)
        .get("/files/data")
        .end((err, res) => {
          chai.should().exist(res);
          chai.should(res.status).equal = 200;
          chai.should(res.body).equal = "array";
          chai.should(res.body.length).equal = 5;
          done();
        });
    });
  });
});
