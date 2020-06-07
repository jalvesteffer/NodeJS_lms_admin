const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../main');

const should = chai.should();

chai.use(chaiHttp);

describe("LMS Test Suite - Common", () => {
    it('should throw 404 if url is incorrect', (done) => {
        chai.request(server).get("/lms/somthing").end((err, res) => {
            res.should.have.status(404);
            done();
        })
    })
    it('should verify healthcheck', (done) => {
        chai.request(server).get("/lms/healthcheck").end((err, res) => {
            res.should.have.status(200);
            done();
        })
    })
})