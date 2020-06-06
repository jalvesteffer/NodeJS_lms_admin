const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../main');
const nock = require('nock');

const should = chai.should();

chai.use(chaiHttp);

describe("LMS Test Suite - Admin - Get By Id", () => {
    it('should get an author by id when valid', (done) => {
        chai
            .request(server)
            .get("/lms/admin/authors/2")
            .end((err, res) => {
                should.equal(err, null);
                res.body.should.be.an('array');
                res.body.length.should.be.equal(1);
                res.should.have.status(200);
                done();
            })
    })
    it('should get a book by id when valid', (done) => {
        chai
            .request(server)
            .get("/lms/admin/books/98")
            .end((err, res) => {
                should.equal(err, null);
                res.body.should.be.an('array');
                res.body.length.should.be.equal(1);
                res.should.have.status(200);
                done();
            })
    })
    it('should get a publisher by id when valid', (done) => {
        chai
            .request(server)
            .get("/lms/admin/publishers/2")
            .end((err, res) => {
                should.equal(err, null);
                res.body.should.be.an('array');
                res.body.length.should.be.equal(1);
                res.should.have.status(200);
                done();
            })
    })
    it('should get a genre by id when valid', (done) => {
        chai
            .request(server)
            .get("/lms/admin/genres/2")
            .end((err, res) => {
                should.equal(err, null);
                res.body.should.be.an('array');
                res.body.length.should.be.equal(1);
                res.should.have.status(200);
                done();
            })
    })
    it('should get a borrower by id when valid', (done) => {
        chai
            .request(server)
            .get("/lms/admin/borrowers/2")
            .end((err, res) => {
                should.equal(err, null);
                res.body.should.be.an('array');
                res.body.length.should.be.equal(1);
                res.should.have.status(200);
                done();
            })
    })
    it('should get a branch by id when valid', (done) => {
        chai
            .request(server)
            .get("/lms/admin/branches/2")
            .end((err, res) => {
                should.equal(err, null);
                res.body.should.be.an('array');
                res.body.length.should.be.equal(1);
                res.should.have.status(200);
                done();
            })
    })

    it('should get an author by id when invalid', (done) => {
        chai
            .request(server)
            .get("/lms/admin/authors/1000")
            .end((err, res) => {
                should.equal(err, null);
                res.should.have.status(404);
                done();
            })
    })
    it('should get a book by id when invalid', (done) => {
        chai
            .request(server)
            .get("/lms/admin/books/1000")
            .end((err, res) => {
                should.equal(err, null);
                res.should.have.status(404);
                done();
            })
    })
    it('should get a publisher by id when invalid', (done) => {
        chai
            .request(server)
            .get("/lms/admin/publishers/1000")
            .end((err, res) => {
                should.equal(err, null);
                res.should.have.status(404);
                done();
            })
    })
    it('should get a genre by id when invalid', (done) => {
        chai
            .request(server)
            .get("/lms/admin/genres/1000")
            .end((err, res) => {
                should.equal(err, null);
                res.should.have.status(404);
                done();
            })
    })
    it('should get a borrower by id when invalid', (done) => {
        chai
            .request(server)
            .get("/lms/admin/borrowers/1000")
            .end((err, res) => {
                should.equal(err, null);
                res.should.have.status(404);
                done();
            })
    })
    it('should get a branch by id when invalid', (done) => {
        chai
            .request(server)
            .get("/lms/admin/branches/1000")
            .end((err, res) => {
                should.equal(err, null);
                res.should.have.status(404);
                done();
            })
    })
})