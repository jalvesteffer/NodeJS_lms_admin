const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../main');
const nock = require('nock');

const should = chai.should();

chai.use(chaiHttp);

describe("LMS Test Suite - Admin - Delete", () => {
    it('should delete an author by id', (done) => {
        nock('http://localhost:3001/lms')
            .delete('/admin/authors/1')
            .reply(200);
        chai
            .request('http://localhost:3001/lms')
            .delete("/admin/authors/1")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it('should delete a book by id', (done) => {
        nock('http://localhost:3001/lms')
            .delete('/admin/books/1')
            .reply(200);
        chai
            .request('http://localhost:3001/lms')
            .delete("/admin/books/1")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it('should delete a publisher by id', (done) => {
        nock('http://localhost:3001/lms')
            .delete('/admin/publishers/1')
            .reply(200);
        chai
            .request('http://localhost:3001/lms')
            .delete("/admin/publishers/1")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it('should delete a genre by id', (done) => {
        nock('http://localhost:3001/lms')
            .delete('/admin/genres/1')
            .reply(200);
        chai
            .request('http://localhost:3001/lms')
            .delete("/admin/genres/1")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it('should delete a borrower by cardNo', (done) => {
        nock('http://localhost:3001/lms')
            .delete('/admin/borrowers/1')
            .reply(200);
        chai
            .request('http://localhost:3001/lms')
            .delete("/admin/borrowers/1")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it('should delete a branch by id', (done) => {
        nock('http://localhost:3001/lms')
            .delete('/admin/branches/1')
            .reply(200);
        chai
            .request('http://localhost:3001/lms')
            .delete("/admin/branches/1")
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })


    it('should error on author with invalid id', (done) => {
        chai
            .request(server)
            .delete("/lms/admin/authors/1000")
            .end((err, res) => {
                res.should.have.status(404);
                done();
            })
    })
    it('should error on book with invalid id', (done) => {
        chai
            .request(server)
            .delete("/lms/admin/books/1000")
            .end((err, res) => {
                res.should.have.status(404);
                done();
            })
    })
    it('should error on publisher with invalid id', (done) => {
        chai
            .request(server)
            .delete("/lms/admin/publishers/1000")
            .end((err, res) => {
                res.should.have.status(404);
                done();
            })
    })
    it('should error on genre with invalid id', (done) => {
        chai
            .request(server)
            .delete("/lms/admin/genres/1000")
            .end((err, res) => {
                res.should.have.status(404);
                done();
            })
    })
    it('should error on borrower with invalid id', (done) => {
        chai
            .request(server)
            .delete("/lms/admin/borrowers/1000")
            .end((err, res) => {
                res.should.have.status(404);
                done();
            })
    })
    it('should error on branch with invalid id', (done) => {
        chai
            .request(server)
            .delete("/lms/admin/branches/1000")
            .end((err, res) => {
                res.should.have.status(404);
                done();
            })
    })
})