var routes = require('express').Router();
const bodyParse = require('body-parser');
const xmlparser = require('express-xml-bodyparser');
routes.use(xmlparser());
routes.use(bodyParse.json());
var adminService = require('../services/adminServices');
let xml2js = require('xml2js');

var cors = require('cors');
routes.use(cors());

//
// Author
//
routes.get('/lms/admin/authors', async (req, res) => {
    // call service to get all
    await adminService.getAllAuthors(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(400);
    }
});

routes.get('/lms/admin/authors/like/:name', async (req, res) => {
    // call service to get all
    await adminService.getAllAuthorsLike(req.params.name, req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(400);
    }
});

routes.get('/lms/admin/authors/:id', async (req, res) => {
    // call service to get author by id
    await adminService.getAuthorById(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(404);
    }
});

routes.put('/lms/admin/authors', async (req, res) => {

    // error if need update values not provided
    if (!req.body.authorId || !req.body.authorName) {
        res.status(400);
        res.send('Request does not provide all neccessary information');
        return;
    }

    // call service to update
    await adminService.updateAuthor(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(400);
    }
});

routes.post('/lms/admin/authors', async (req, res) => {

    // error if need create values not provided
    if (!req.body.authorName) {
        res.status(400);
        res.send('Request does not provide all neccessary information');
        return;
    }

    // call service to create
    await adminService.createAuthor(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(201);
        res.send();
    } else {
        res.sendStatus(400);
    }
});

routes.delete('/lms/admin/authors/:id', async (req, res) => {
    // call service to delete
    await adminService.deleteAuthor(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(404);
    }
});

// Books
routes.get('/lms/admin/books', async (req, res) => {
    // call service to get all
    await adminService.getAllBooks(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(400);
    }
});

routes.get('/lms/admin/books/like/:title', async (req, res) => {
    // call service to get all
    await adminService.getAllBooksLike(req.params.title, req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(400);
    }
});

routes.get('/lms/admin/books/:id', async (req, res) => {
    // call service to get book by id
    await adminService.getBookById(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(404);
    }
});

routes.put('/lms/admin/books', async (req, res) => {

    // error if need update values not provided
    if (!req.body.bookId || !req.body.title) {
        res.status(400);
        res.send('Request does not provide all neccessary information');
        return;
    }

    // call service to update
    await adminService.updateBook(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(400);
    }
});

routes.post('/lms/admin/books', async (req, res) => {

    // error if need create values not provided
    if (!req.body.title) {
        res.status(400);
        res.send('Request does not provide all neccessary information');
        return;
    }

    // call service to create
    await adminService.createBook(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(201);
        res.send();
    } else {
        res.sendStatus(400);
    }
});

routes.delete('/lms/admin/books/:id', async (req, res) => {
    // call service to delete
    await adminService.deleteBook(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(404);
    }
});

// Publishers
routes.get('/lms/admin/publishers', async (req, res) => {
    // call service to get all
    await adminService.getAllPublishers(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(400);
    }
});

routes.get('/lms/admin/publishers/like/:name', async (req, res) => {
    // call service to get all
    await adminService.getAllPublishersLike(req.params.name, req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(400);
    }
});

routes.get('/lms/admin/publishers/:id', async (req, res) => {
    // call service to get publisher by id
    await adminService.getPublisherById(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(404);
    }
});

routes.put('/lms/admin/publishers', async (req, res) => {

    // error if need update values not provided
    if (!req.body.publisherId || !req.body.publisherName) {
        res.status(400);
        res.send('Request does not provide all neccessary information');
        return;
    }

    // call service to update
    await adminService.updatePublisher(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(400);
    }
});

routes.post('/lms/admin/publishers', async (req, res) => {

    // error if need create values not provided
    if (!req.body.publisherName) {
        res.status(400);
        res.send('Request does not provide all neccessary information');
        return;
    }

    // call service to create
    await adminService.createPublisher(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(201);
        res.send();

    } else {
        res.sendStatus(400);
    }
});

routes.delete('/lms/admin/publishers/:id', async (req, res) => {
    // call service to delete
    await adminService.deletePublisher(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(404);
    }
});

//
// Genres
//
routes.get('/lms/admin/genres', async (req, res) => {
    // call service to get all
    await adminService.getAllGenres(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(400);
    }
});

routes.get('/lms/admin/genres/like/:name', async (req, res) => {
    // call service to get all
    await adminService.getAllGenresLike(req.params.name, req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);

    } else {
        res.sendStatus(400);
    }
});

routes.get('/lms/admin/genres/:id', async (req, res) => {
    // call service to get genre by id
    await adminService.getGenreById(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(404);
    }
});

routes.put('/lms/admin/genres', async (req, res) => {

    // error if need update values not provided
    if (!req.body.genre_id || !req.body.genre_name) {
        res.status(400);
        res.send('Request does not provide all neccessary information');
        return;
    }

    // call service to update
    await adminService.updateGenre(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(400);
    }
});

routes.post('/lms/admin/genres', async (req, res) => {

    // error if need create values not provided
    if (!req.body.genre_name) {
        res.status(400);
        res.send('Request does not provide all neccessary information');
        return;
    }

    // call service to create
    await adminService.createGenre(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(201);
        res.send();
    } else {
        res.sendStatus(400);
    }
});

routes.delete('/lms/admin/genres/:id', async (req, res) => {
    // call service to delete
    await adminService.deleteGenre(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(404);
    }
});

// Borrowers
routes.get('/lms/admin/borrowers', async (req, res) => {
    // call service to get all
    await adminService.getBorrowers(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(400);
    }
});

routes.get('/lms/admin/borrowers/like/:name', async (req, res) => {
    // call service to get all
    await adminService.getBorrowersLike(req.params.name, req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(400);
    }
});

routes.get('/lms/admin/borrowers/:id', async (req, res) => {
    // call service to get borrower by id
    await adminService.getBorrowerById(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(404);
    }
});

routes.put('/lms/admin/borrowers', async (req, res) => {

    // error if need update values not provided
    if (!req.body.cardNo || !req.body.name) {
        res.status(400);
        res.send('Request does not provide all neccessary information');
        return;
    }

    // call service to update
    await adminService.updateBorrower(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(400);
    }
});

routes.post('/lms/admin/borrowers', async (req, res) => {

    // error if need create values not provided
    if (!req.body.name) {
        res.status(400);
        res.send('Request does not provide all neccessary information');
        return;
    }

    // call service to create
    await adminService.createBorrower(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(201);
        res.send();
    } else {
        res.sendStatus(400);
    }
});

routes.delete('/lms/admin/borrowers/:id', async (req, res) => {
    // call service to delete
    await adminService.deleteBorrower(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(404);
    }
});

// Library Branches
routes.get('/lms/admin/branches', async (req, res) => {
    // call service to get all
    await adminService.getBranches(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(400);
    }
});

routes.get('/lms/admin/branches/like/:name', async (req, res) => {
    // call service to get all
    await adminService.getBranchesLike(req.params.name, req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(400);
    }
});

routes.get('/lms/admin/branches/:id', async (req, res) => {
    // call service to get branch by id
    await adminService.getBranchById(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(404);
    }
});

routes.put('/lms/admin/branches', async (req, res) => {

    // error if need update values not provided
    if (!req.body.branchId || !req.body.branchName) {
        res.status(400);
        res.send('Request does not provide all neccessary information');
        return;
    }

    // call service to update
    await adminService.updateBranch(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(400);
    }
});

routes.post('/lms/admin/branches', async (req, res) => {

    // error if need create values not provided
    if (!req.body.branchName) {
        res.status(400);
        res.send('Request does not provide all neccessary information');
        return;
    }

    // call service to create
    await adminService.createBranch(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(201);
        res.send();
    } else {
        res.sendStatus(400);
    }
});

routes.delete('/lms/admin/branches/:id', async (req, res) => {
    // call service to delete
    await adminService.deleteBranch(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(404);
    }
});

// Book Loans
routes.get('/lms/admin/loans', async (req, res) => {
    // call service to get all overdue book loans
    await adminService.getOverdueBookLoans(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(400);
    }
});

routes.get('/lms/admin/loans/like/:cardno', async (req, res) => {
    // call service to get all
    await adminService.getOverdueBookLoansLike(req.params.cardno, req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(400);
    }
});

// Book Loans
routes.put('/lms/admin/loans', async (req, res) => {
    // call service to delete
    await adminService.extendLoan(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(res.queryResults);
    } else {
        res.sendStatus(404);
    }
});

module.exports = routes;