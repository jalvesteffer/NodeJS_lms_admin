
var routes = require('express').Router();
const bodyParse = require('body-parser');
const xmlparser = require('express-xml-bodyparser');
routes.use(xmlparser());
routes.use(bodyParse.json());
var adminService = require('../services/adminServices');

// Author
routes.get('/lms/admin/authors', adminService.getAllAuthors);
routes.get('/lms/admin/authors/:id', adminService.getAuthorById);
routes.put('/lms/admin/authors', adminService.updateAuthor);
routes.post('/lms/admin/authors', adminService.createAuthor);
routes.delete('/lms/admin/authors/:id', adminService.deleteAuthor);

// Books
routes.get('/lms/admin/books',adminService.getAllBooks);
routes.get('/lms/admin/books/:id',adminService.getBookById);
routes.put('/lms/admin/books', adminService.updateBook);
routes.post('/lms/admin/books', adminService.createBook);
routes.delete('/lms/admin/books/:id', adminService.deleteBook);

// Publishers
routes.get('/lms/admin/publishers', adminService.getAllPublishers);
routes.get('/lms/admin/publishers/:id', adminService.getPublisherById);
routes.put('/lms/admin/publishers', adminService.updatePublisher);
routes.post('/lms/admin/publishers', adminService.createPublisher);
routes.delete('/lms/admin/publishers/:id', adminService.deletePublisher);

// Genres
routes.get('/lms/admin/genres', adminService.getAllGenres);
routes.get('/lms/admin/genres/:id',adminService.getGenreById);
routes.put('/lms/admin/genres', adminService.updateGenre);
routes.post('/lms/admin/genres', adminService.createGenre);
routes.delete('/lms/admin/genres/:id', adminService.deleteGenre);

routes.get('/lms/admin/borrowers', adminService.getBorrowers);
routes.get('/lms/admin/borrowers/:id', adminService.getBorrowerById);
routes.put('/lms/admin/borrowers', adminService.updateBorrower);
routes.post('/lms/admin/borrowers', adminService.createBorrower);
routes.delete('/lms/admin/borrowers/:id', adminService.deleteBorrower);

routes.get('/lms/admin/branches', adminService.getBranches);
routes.get('/lms/admin/branches/:id', adminService.getBranchById);
routes.put('/lms/admin/branches', adminService.updateBranch);
routes.post('/lms/admin/branches', adminService.createBranch);
routes.delete('/lms/admin/branches/:id', adminService.deleteBranch);

// Book Loans
routes.put('/lms/admin/loans', adminService.extendLoan);

module.exports = routes;