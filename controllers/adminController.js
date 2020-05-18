
var routes = require('express').Router();
var adminService = require('../services/adminServices');

routes.get('/lms/admin/authors', adminService.getAllAuthors);
routes.get('/lms/admin/authors/:id', adminService.getAuthorById);
routes.put('/lms/admin/authors', adminService.updateAuthor);

routes.get('/lms/admin/books',function(req,res){
    adminService.getAllBooks(req,res);
});

routes.get('/lms/admin/books/:id',function(req,res){
    adminService.getBookById(req.params.id, req, res);
});

routes.get('/lms/admin/publishers', adminService.getAllPublishers);
routes.get('/lms/admin/publishers/:id', adminService.getPublisherById);
routes.put('/lms/admin/publishers', adminService.updatePublisher);

routes.get('/lms/admin/genres', adminService.getAllGenres);
routes.get('/lms/admin/genres/:id',adminService.getGenreById);
routes.put('/lms/admin/genres', adminService.updateGenre);

routes.get('/lms/admin/borrowers', adminService.getBorrowers);
routes.get('/lms/admin/borrowers/:id', adminService.getBorrowerById);
routes.put('/lms/admin/borrowers', adminService.updateBorrower);

routes.get('/lms/admin/branches', adminService.getBranches);
routes.get('/lms/admin/branches/:id', adminService.getBranchById);
routes.put('/lms/admin/branches', adminService.updateBranch);



/*routes.get('/lms/library/branches/branch/:branchId/bookCopies',function(req,res){
    libraryService.getBookCopies(req.params.branchId, req,res);
});

routes.get('/lms/library/branches/branch/:branchId/bookCopies/book/:bookId',function(req,res){
    libraryService.getBookCopy(req.params.branchId, req.params.bookId, req,res);
});

routes.put('/lms/library/branches/branch/:branchId/bookCopies/book/:bookId',function(req,res){
    const bookCopy = req.body;
    libraryService.updateBookCopyCount(bookCopy,req.params.branchId, req.params.bookId, req,res);
}); */

module.exports = routes;