const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../main');
const nock = require('nock');

const should = chai.should();

chai.use(chaiHttp);

describe("LMS Test Suite - Admin - Post", () => {
    it('should create a new author', (done) => {
        nock('http://localhost:3001/lms')
            .post('/admin/authors')
            .reply(201);
        chai
            .request(server)
            .post("/lms/admin/authors")
            .send({
                authorName: 'John Doe',
                books: [{
                    bookId: 114,
                    title: "Book Title"
                }],
                genres: [{
                    genre_id: 2,
                    genre_name: "Science Fiction"
                }]
            })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            })
    })
    it('should create a new book', (done) => {
        nock('http://localhost:3001/lms')
            .post('/admin/books')
            .reply(201);
        chai
            .request(server)
            .post("/lms/admin/books")
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
                res.should.have.status(201);
                done();
            })
    })
    it('should create a new publisher', (done) => {
        nock('http://localhost:3001/lms')
            .post('/admin/publishers')
            .reply(201);
        chai
            .request(server)
            .post("/lms/admin/publishers")
            .send({
                "publisherName": "Anchor Books",
                "publisherAddress": "New York, USA",
                "publisherPhone": "365-659-6598"
            })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            })
    })
    it('should create a new genre', (done) => {
        nock('http://localhost:3001/lms')
            .post('/admin/genres')
            .reply(201);
        chai
            .request(server)
            .post("/lms/admin/genres")
            .send({
                "genre_name": "Biographies & Memoirs",
                "books": [{
                    "bookId": 98
                }]
            })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            })
    })
    it('should create a new borrower', (done) => {
        nock('http://localhost:3001/lms')
            .post('/admin/borrowers')
            .reply(201);
        chai
            .request(server)
            .post("/lms/admin/borrowers")
            .send({
                "name": "Bill Brown",
                "address": "Williamsburg, VA",
                "phone": "757-458-8788"
            })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            })
    })
    it('should create a new branch', (done) => {
        nock('http://localhost:3001/lms')
            .post('/admin/branches')
            .reply(201);
        chai
            .request(server)
            .post("/lms/admin/branches")
            .send({
                "branchName": "Arlington Public Library",
                "branchAddress": "Arlington, VA"
            })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            })
    })

    it('should error if required author info not provided', (done) => {
        chai
            .request(server)
            .post("/lms/admin/authors")
            .send({
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
    it('should error if required book info not provided', (done) => {
        chai
            .request(server)
            .post("/lms/admin/books")
            .send({
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
    it('should error if required publisher info not provided', (done) => {
        chai
            .request(server)
            .post("/lms/admin/publishers")
            .send({
                "publisherAddress": "New York, USA",
                "publisherPhone": "365-659-6598"
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
    })
    it('should error if required genre info not provided', (done) => {
        chai
            .request(server)
            .post("/lms/admin/genres")
            .send({
                "genrename": "Biographies & Memoirs"
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
    })
    it('should error if required borrower info not provided', (done) => {
        chai
            .request(server)
            .post("/lms/admin/borrowers")
            .send({
                "address": "Williamsburg, VA",
                "phone": "757-458-8788"
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
    })
    it('should error if required branch info not provided', (done) => {
        chai
            .request(server)
            .post("/lms/admin/branches")
            .send({
                "branchAddress": "Arlington, VA"
            })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
    })
})