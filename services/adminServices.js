/* var bookCopiesDao = require('../dao/bookCopiesDao'); */
let authorDao = require('../dao/authorDao');
let bookDao = require('../dao/bookDao');
let publisherDao = require('../dao/publisherDao');
let genreDao = require('../dao/genreDao');
let borrowerDao = require('../dao/borrowerDao');
let branchDao = require('../dao/branchDao');


exports.getAllAuthors = (function (req, res) {
    authorDao.getAllAuthors()
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.getAllBooks = (function (req, res) {
    bookDao.getAllBooks()
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.getAllPublishers = (function (req, res) {
    publisherDao.getAllPublishers()
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.getAllGenres = (function (req, res) {
    genreDao.getAllGenres()
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.getBorrowers = (function (req, res) {
    borrowerDao.getAllBorrowers()
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.getBranches = (function (req, res) {
    branchDao.getAllBranches()
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});



/* exports.getBranchByBranchId = (function(branchId,req, res) {
    libraryBranchDao.getLibraryBranchById(branchId)
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.updateBranch = (function(branchId, branchName, branchAddress, req, res) {
    console.log(branchAddress);
    libraryBranchDao.updateLibraryBranch(branchId, branchName, branchAddress, function (error, result) {
        if (error) {
            res.status(400);
            res.send('Update Library Branch Failed!');
        }
        res.status(201);
        res.send('Update Library Branch Successful!');
    });
});

exports.getBookCopies = (function(branchId, req, res) {
    bookCopiesDao.getBookCopiesByBranchId(branchId)
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.getBookCopy = (function(branchId, bookId, req, res) {
    bookCopiesDao.getBookCopiesById(branchId, bookId)
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.updateBookCopyCount = (function(req, res) {
    bookCopiesDao.updateNoOfBookCopies(bookCopy, branchId, bookId, function (error, result) {
        if (error) {
            res.status(400);
            res.send('Update nunber of Book Copies Failed!');
        }
        res.status(201);
        res.send('Update nunber of Book Copies Successful!');
    });
}); */