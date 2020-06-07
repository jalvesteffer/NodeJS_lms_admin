const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../main');
const nock = require('nock');

const should = chai.should();

chai.use(chaiHttp);

describe("LMS Test Suite - Admin - Put", () => {
    it('should update an author by id', (done) => {
        nock('http://localhost:3001/lms')
            .put('/admin/authors')
            .reply(200);
        chai
            .request(server)
            .put("/lms/admin/authors")
            .send({
                authorId: 74,
                authorName: 'John Doe',
                books: [{
                    bookId: 114,
                    title: "Book Title"
                }]
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it('should update an book by id', (done) => {
        nock('http://localhost:3001/lms')
            .put('/admin/books')
            .reply(200);
        chai
            .request(server)
            .put("/lms/admin/books")
            .send({
                "bookId": 101,
                "title": "1984",
                "pubId": 2,
                "publisher": [{
                    "publisherId": 2,
                    "publisherName": "Penguin Random House"
                }],
                "authors": [{
                    "authorId": 70,
                    "authorName": "George Orwell"
                }],
                "genres": [{
                    "genre_id": 3,
                    "genre_name": "Literature"
                }]
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it('should update an publisher by id', (done) => {
        nock('http://localhost:3001/lms')
            .put('/admin/publishers')
            .reply(200);
        chai
            .request(server)
            .put("/lms/admin/publishers")
            .send({
                "publisherId": 19,
                "publisherName": "Anchor Books",
                "publisherAddress": "New York, USA",
                "publisherPhone": "365-659-6598"
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it('should update an genre by id', (done) => {
        nock('http://localhost:3001/lms')
            .put('/admin/genres')
            .reply(200);
        chai
            .request(server)
            .put("/lms/admin/genres")
            .send({
                "genre_id": 38,
                "genre_name": "Biographies & Memoirs"
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it('should update an borrower by cardNo', (done) => {
        nock('http://localhost:3001/lms')
            .put('/admin/borrowers')
            .reply(200);
        chai
            .request(server)
            .put("/lms/admin/borrowers")
            .send({
                "cardNo": 7,
                "name": "Bill Brown",
                "address": "Williamsburg, VA",
                "phone": "757-458-8788"
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it('should update an branch by id', (done) => {
        nock('http://localhost:3001/lms')
            .put('/admin/branches')
            .reply(200);
        chai
            .request(server)
            .put("/lms/admin/branches")
            .send({
                "branchId": 3,
                "branchName": "Arlington Public Library",
                "branchAddress": "Arlington, VA"
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
    it('should extend an loan by id', (done) => {
        chai
            .request(server)
            .put("/lms/admin/loans")
            .send({
                "loanId": 5,
                "bookId": 114,
                "branchId": 13,
                "cardNo": 3,
                "dateOut": "2020-05-10T04:28:29.000Z",
                "dueDate": "2020-05-31T04:28:29.000Z",
                "dateIn": null,
                "book": [{
                    "bookId": 114,
                    "title": "How to Win Friends & Influence People",
                    "pubId": 6
                }],
                "branch": [{
                    "branchId": 13,
                    "branchName": "Sterling Library",
                    "branchAddress": "Sterling, VA"
                }],
                "borrower": [{
                    "cardNo": 3,
                    "name": "James Wilson",
                    "address": "Arlington, VA",
                    "phone": "757-787-5523"
                }]
            })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })

    it('should error if not all require author info provided', (done) => {
        chai
            .request(server)
            .put("/lms/admin/authors")
            .send({
                authorName: 'John Doe',
                books: [{
                    bookId: 114,
                    title: "Book Title"
                }]
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
    })
    it('should error if not all required book info provided', (done) => {
        chai
            .request(server)
            .put("/lms/admin/books")
            .send({
                "title": "1984",
                "pubId": 2,
                "publisher": [{
                    "publisherId": 2,
                    "publisherName": "Penguin Random House"
                }],
                "authors": [{
                    "authorId": 70,
                    "authorName": "George Orwell"
                }],
                "genres": [{
                    "genre_id": 3,
                    "genre_name": "Literature"
                }]
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
    })
    it('should error if not all required publisher info provided', (done) => {
        chai
            .request(server)
            .put("/lms/admin/publishers")
            .send({
                "publisherName": "Anchor Books",
                "publisherAddress": "New York, USA",
                "publisherPhone": "365-659-6598"
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
    })
    it('should error if not all required genre info provided', (done) => {
        chai
            .request(server)
            .put("/lms/admin/genres")
            .send({
                "genre_name": "Biographies & Memoirs"
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
    })
    it('should error if not all required borrower info provided', (done) => {
        chai
            .request(server)
            .put("/lms/admin/borrowers")
            .send({
                "name": "Bill Brown",
                "address": "Williamsburg, VA",
                "phone": "757-458-8788"
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
    })
    it('should error if not all required branch info provided', (done) => {
        chai
            .request(server)
            .put("/lms/admin/branches")
            .send({
                "branchName": "Arlington Public Library",
                "branchAddress": "Arlington, VA"
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
    })
})