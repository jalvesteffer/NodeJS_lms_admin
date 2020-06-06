const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../main');
const nock = require('nock');

const should = chai.should();

chai.use(chaiHttp);

describe("LMS Test Suite - Admin - Get All", () => {
    it('should get a list of authors', (done) => {
        chai
            .request(server)
            .get("/lms/admin/authors")
            .end((err, res) => {
                should.equal(err, null);
                res.body.should.be.an('array');
                res.body.length.should.be.above(0);
                res.should.have.status(200);
                done();
            })
    })
    it('should get a list of books', (done) => {
        chai
            .request(server)
            .get("/lms/admin/books")
            .end((err, res) => {
                should.equal(err, null);
                res.body.should.be.an('array');
                res.body.length.should.be.above(0);
                res.should.have.status(200);
                done();
            })
    })
    it('should get a list of publishers', (done) => {
        chai
            .request(server)
            .get("/lms/admin/publishers")
            .end((err, res) => {
                should.equal(err, null);
                res.body.should.be.an('array');
                res.body.length.should.be.above(0);
                res.should.have.status(200);
                done();
            })
    })
    it('should get a list of genres', (done) => {
        chai
            .request(server)
            .get("/lms/admin/genres")
            .end((err, res) => {
                should.equal(err, null);
                res.body.should.be.an('array');
                res.body.length.should.be.above(0);
                res.should.have.status(200);
                done();
            })
    })
    it('should get a list of borrowers', (done) => {
        chai
            .request(server)
            .get("/lms/admin/borrowers")
            .end((err, res) => {
                should.equal(err, null);
                res.body.should.be.an('array');
                res.body.length.should.be.above(0);
                res.should.have.status(200);
                done();
            })
    })
    it('should get a list of branches', (done) => {
        chai
            .request(server)
            .get("/lms/admin/branches")
            .end((err, res) => {
                should.equal(err, null);
                res.body.should.be.an('array');
                res.body.length.should.be.above(0);
                res.should.have.status(200);
                done();
            })
    })
    it('should get a list of overdue loans', (done) => {
        chai
            .request(server)
            .get("/lms/admin/loans")
            .end((err, res) => {
                should.equal(err, null);
                res.body.should.be.an('array');
                res.body.length.should.be.above(0);
                res.should.have.status(200);
                done();
            })
    })
})