
var routes = require('express').Router();
var adminService = require('../services/adminServices');

routes.get('/lms/admin/authors',function(req,res){
    adminService.getAllAuthors(req, res);
});

routes.get('/lms/admin/authors/:id',function(req,res){
    adminService.getAuthorById(req.params.id, req, res);
});

routes.get('/lms/admin/books',function(req,res){
    adminService.getAllBooks(req,res);
});

routes.get('/lms/admin/books/:id',function(req,res){
    adminService.getBookById(req.params.id, req, res);
});

routes.get('/lms/admin/publishers',function(req,res){
    adminService.getAllPublishers(req,res);
});

routes.get('/lms/admin/publishers/:id',function(req,res){
    adminService.getPublisherById(req.params.id, req, res);
});

routes.get('/lms/admin/genres',function(req,res){
    adminService.getAllGenres(req,res);
});

routes.get('/lms/admin/genres/:id',function(req,res){
    adminService.getGenreById(req.params.id, req, res);
});

routes.get('/lms/admin/borrowers',function(req,res){
    adminService.getBorrowers(req,res);
});

routes.get('/lms/admin/borrowers/:id',function(req,res){
    adminService.getBorrowerById(req.params.id, req, res);
});

routes.get('/lms/admin/branches',function(req,res){
    adminService.getBranches(req,res);
});

routes.get('/lms/admin/branches/:id',function(req,res){
    adminService.getBranchById(req.params.id, req, res);
});

/* routes.get('/lms/library/branches/branch/:branchId',function(req,res){
    libraryService.getBranchByBranchId (req.params.branchId, req,res);
});

routes.put('/lms/library/branches/branch/:branchId',function(req,res){
    const branchName = req.body.branchName;
    const branchAddress = req.body.branchAddress;
    console.log(branchName);
    libraryService.updateBranch(req.params.branchId, branchName, branchAddress, req,res);
});

routes.get('/lms/library/branches/branch/:branchId/bookCopies',function(req,res){
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