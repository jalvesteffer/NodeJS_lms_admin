const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../main');

const should = chai.should();

chai.use(chaiHttp);

describe("LMS Test Suite - Admin - Get Like", () => {
    it('should search authors by keyword', (done) => {
        chai
            .request(server)
            .get("/lms/admin/authors/like/a")
            .end((err, res) => {
                should.equal(err, null);
                res.body.should.be.an('array');
                res.body.length.should.be.above(0);
                res.should.have.status(200);
                done();
            })
    })
    it('should search books by keyword', (done) => {
        chai
            .request(server)
            .get("/lms/admin/books/like/a")
            .end((err, res) => {
                should.equal(err, null);
                res.body.should.be.an('array');
                res.body.length.should.be.above(0);
                res.should.have.status(200);
                done();
            })
    })
    it('should search publishers by keyword', (done) => {
        chai
            .request(server)
            .get("/lms/admin/publishers/like/a")
            .end((err, res) => {
                should.equal(err, null);
                res.body.should.be.an('array');
                res.body.length.should.be.above(0);
                res.should.have.status(200);
                done();
            })
    })
    it('should search genres by keyword', (done) => {
        chai
            .request(server)
            .get("/lms/admin/genres/like/a")
            .end((err, res) => {
                should.equal(err, null);
                res.body.should.be.an('array');
                res.body.length.should.be.above(0);
                res.should.have.status(200);
                done();
            })
    })
    it('should search borrowers by keyword', (done) => {
        chai
            .request(server)
            .get("/lms/admin/borrowers/like/a")
            .end((err, res) => {
                should.equal(err, null);
                res.body.should.be.an('array');
                res.body.length.should.be.above(0);
                res.should.have.status(200);
                done();
            })
    })
    it('should search branches by keyword', (done) => {
        chai
            .request(server)
            .get("/lms/admin/branches/like/a")
            .end((err, res) => {
                should.equal(err, null);
                res.body.should.be.an('array');
                res.body.length.should.be.above(0);
                res.should.have.status(200);
                done();
            })
    })
    it('should search overdue loans by keyword', (done) => {
        chai
            .request(server)
            .get("/lms/admin/loans/like/5")
            .end((err, res) => {
                should.equal(err, null);
                res.body.should.be.an('array');
                res.body.length.should.be.above(0);
                res.should.have.status(200);
                done();
            })
    })
})