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
            res.status(200);
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.getAuthorById = (function (req, res) {
    authorDao.getAuthorById(req.params.id)
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.updateAuthor = (function(req,res) {
    let author = req.body;
    let authorId = parseInt(req.body.authorId);
    let authorName = req.body.authorName;

    authorDao.updateAuthor(author, function(err, result) {
        if(err){
            res.status(400);
            res.send('Update Failed!');
          }
          res.status(204);
          res.send('Update Successful!');
    });
});

exports.getAllBooks = (function (req, res) {
    bookDao.getAllBooks()
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.getBookById = (function (id, req, res) {
    bookDao.getBookById(id)
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
/*             for (let i = 0; i < result.length; i++) {
                let r = result[i];

                publisherDao.getPublisherById(r.pubId)
                .then(function (pubResult)  {
                    console.log(pubResult.publisherName);
                    r.pubId = pubResult.publisherName;
                });
                
                console.log(r.pubId);
            } */
            res.status(200);
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
            res.status(200);
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.getPublisherById = (function (req, res) {
    publisherDao.getPublisherById(req.params.id)
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.updatePublisher = (function(req,res) {
    let publisher = req.body;

    publisherDao.updatePublisher(publisher, function(err, result) {
        if(err){
            res.status(400);
            res.send('Update Failed!');
          }
          res.status(204);
          res.send('Update Successful!');
    });
});

exports.getAllGenres = (function (req, res) {
    genreDao.getAllGenres()
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.getGenreById = (function (req, res) {
    genreDao.getGenreById(req.params.id)
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.updateGenre = (function(req,res) {
    let genre = req.body;

    genreDao.updateGenre(genre, function(err, result) {
        if(err){
            res.status(400);
            res.send('Update Failed!');
          }
          res.status(204);
          res.send('Update Successful!');
    });
});

exports.getBorrowers = (function (req, res) {
    borrowerDao.getAllBorrowers()
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.getBorrowerById = (function (req, res) {
    borrowerDao.getBorrowerById(req.params.id)
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.updateBorrower = (function(req,res) {
    let borrower = req.body;

    borrowerDao.updateBorrower(borrower, function(err, result) {
        if(err){
            res.status(400);
            res.send('Update Failed!');
          }
          res.status(204);
          res.send('Update Successful!');
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

exports.getBranchById = (function (req, res) {
    branchDao.getBranchById(req.params.id)
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(result);
        })
        .catch(function (err) {
            throw err;
        });
});

exports.updateBranch = (function(req,res) {
    let branch = req.body;

    branchDao.updateBranch(branch, function(err, result) {
        if(err){
            res.status(400);
            res.send('Update Failed!');
          }
          res.status(204);
          res.send('Update Successful!');
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