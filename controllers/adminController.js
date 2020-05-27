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
        if (req.accepts('json') || req.accepts('text/html')) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(res.queryResults);
        }
        // send results as xml if requested
        else if (req.accepts('application/xml')) {
            res.setHeader('Content-Type', 'text/xml');
            var builder = new xml2js.Builder();
            var xml = builder.buildObject(res.queryResults);
            res.status(200);
            res.send(xml);
        }
        // content negotiation failure
        else {
            res.send(406);
        }
    } else {
        res.status(400);
    }
});

routes.get('/lms/admin/authors/:id', async (req, res) => {
    // call service to get author by id
    await adminService.getAuthorById(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        if (req.accepts('json') || req.accepts('text/html')) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(res.queryResults);
        }
        // send results as xml if requested
        else if (req.accepts('application/xml')) {
            res.setHeader('Content-Type', 'text/xml');
            var builder = new xml2js.Builder();
            var xml = builder.buildObject(res.queryResults);
            res.status(200);
            res.send(xml);
        }
        // content negotiation failure
        else {
            res.send(406);
        }
    } else {
        res.status(404);
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
        if (req.accepts('json') || req.accepts('text/html')) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(res.queryResults);
        }
        // send results as xml if requested
        else if (req.accepts('application/xml')) {
            res.setHeader('Content-Type', 'text/xml');
            var builder = new xml2js.Builder();
            var xml = builder.buildObject(res.queryResults);
            res.status(200);
            res.send(xml);
        }
        // content negotiation failure
        else {
            res.send(406);
        }
    } else {
        res.status(400);
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
        if (req.accepts('json') || req.accepts('text/html')) {
            res.setHeader('Content-Type', 'application/json');
            res.status(201);
            res.send();
        }
        // send results as xml if requested
        else if (req.accepts('application/xml')) {
            res.setHeader('Content-Type', 'text/xml');
            var builder = new xml2js.Builder();
            var xml = builder.buildObject(res.queryResults);
            res.status(201);
            res.send();
        }
        // content negotiation failure
        else {
            res.send(406);
        }
    } else {
        res.status(400);
    }
});

routes.delete('/lms/admin/authors/:id', async (req, res) => {
    // call service to delete
    await adminService.deleteAuthor(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        if (req.accepts('json') || req.accepts('text/html')) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(res.queryResults);
        }
        // send results as xml if requested
        else if (req.accepts('application/xml')) {
            res.setHeader('Content-Type', 'text/xml');
            var builder = new xml2js.Builder();
            var xml = builder.buildObject(res.queryResults);
            res.status(200);
            res.send(xml);
        }
        // content negotiation failure
        else {
            res.send(406);
        }
    } else {
        res.status(404);
    }
});

// Books
routes.get('/lms/admin/books', adminService.getAllBooks);
routes.get('/lms/admin/books/:id', adminService.getBookById);
routes.put('/lms/admin/books', adminService.updateBook);
routes.post('/lms/admin/books', adminService.createBook);
routes.delete('/lms/admin/books/:id', adminService.deleteBook);

// Publishers
routes.get('/lms/admin/publishers', adminService.getAllPublishers);
routes.get('/lms/admin/publishers/:id', adminService.getPublisherById);
routes.put('/lms/admin/publishers', adminService.updatePublisher);
routes.post('/lms/admin/publishers', adminService.createPublisher);
routes.delete('/lms/admin/publishers/:id', adminService.deletePublisher);

//
// Genres
//
routes.get('/lms/admin/genres', async (req, res) => {
    // call service to get all
    await adminService.getAllGenres(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        if (req.accepts('json') || req.accepts('text/html')) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(res.queryResults);
        }
        // send results as xml if requested
        else if (req.accepts('application/xml')) {
            res.setHeader('Content-Type', 'text/xml');
            var builder = new xml2js.Builder();
            var xml = builder.buildObject(res.queryResults);
            res.status(200);
            res.send(xml);
        }
        // content negotiation failure
        else {
            res.send(406);
        }
    } else {
        res.status(400);
    }
});

routes.get('/lms/admin/genres/:id', async (req, res) => {
    // call service to get genre by id
    await adminService.getGenreById(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        if (req.accepts('json') || req.accepts('text/html')) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(res.queryResults);
        }
        // send results as xml if requested
        else if (req.accepts('application/xml')) {
            res.setHeader('Content-Type', 'text/xml');
            var builder = new xml2js.Builder();
            var xml = builder.buildObject(res.queryResults);
            res.status(200);
            res.send(xml);
        }
        // content negotiation failure
        else {
            res.send(406);
        }
    } else {
        res.status(404);
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
        if (req.accepts('json') || req.accepts('text/html')) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(res.queryResults);
        }
        // send results as xml if requested
        else if (req.accepts('application/xml')) {
            res.setHeader('Content-Type', 'text/xml');
            var builder = new xml2js.Builder();
            var xml = builder.buildObject(res.queryResults);
            res.status(200);
            res.send(xml);
        }
        // content negotiation failure
        else {
            res.send(406);
        }
    } else {
        res.status(400);
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
        if (req.accepts('json') || req.accepts('text/html')) {
            res.setHeader('Content-Type', 'application/json');
            res.status(201);
            res.send();
        }
        // send results as xml if requested
        else if (req.accepts('application/xml')) {
            res.setHeader('Content-Type', 'text/xml');
            var builder = new xml2js.Builder();
            var xml = builder.buildObject(res.queryResults);
            res.status(201);
            res.send();
        }
        // content negotiation failure
        else {
            res.send(406);
        }
    } else {
        res.status(400);
    }
});

routes.delete('/lms/admin/genres/:id', async (req, res) => {
    // call service to delete
    await adminService.deleteGenre(req, res);

    // prepare & send response depending on success of previous service call
    if (res.querySuccess) {
        // send results as json
        if (req.accepts('json') || req.accepts('text/html')) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(res.queryResults);
        }
        // send results as xml if requested
        else if (req.accepts('application/xml')) {
            res.setHeader('Content-Type', 'text/xml');
            var builder = new xml2js.Builder();
            var xml = builder.buildObject(res.queryResults);
            res.status(200);
            res.send(xml);
        }
        // content negotiation failure
        else {
            res.send(406);
        }
    } else {
        res.status(404);
    }
});

// Borrowers
routes.get('/lms/admin/borrowers', adminService.getBorrowers);
routes.get('/lms/admin/borrowers/:id', adminService.getBorrowerById);
routes.put('/lms/admin/borrowers', adminService.updateBorrower);
routes.post('/lms/admin/borrowers', adminService.createBorrower);
routes.delete('/lms/admin/borrowers/:id', adminService.deleteBorrower);

// Library Branches
routes.get('/lms/admin/branches', adminService.getBranches);
routes.get('/lms/admin/branches/:id', adminService.getBranchById);
routes.put('/lms/admin/branches', adminService.updateBranch);
routes.post('/lms/admin/branches', adminService.createBranch);
routes.delete('/lms/admin/branches/:id', adminService.deleteBranch);

// Book Loans
routes.put('/lms/admin/loans', adminService.extendLoan);

module.exports = routes;