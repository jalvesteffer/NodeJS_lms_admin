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

exports.createAuthor = (function(req,res) {
    let author = req.body;

    authorDao.createAuthor(author, function(err, result) {
        if(err){
            res.status(400);
            res.send('Create Failed!');
          }
          res.status(204);
          res.send('Create Successful!');
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

exports.getBookById = (function (req, res) {
    bookDao.getBookById(req.params.id)
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

exports.updateBook = (function(req,res) {
    let book = req.body;

    bookDao.updateBook(book, function(err, result) {
        if(err){
            res.status(400);
            res.send('Update Failed!');
          }
          res.status(204);
          res.send('Update Successful!');
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

exports.createPublisher = (function(req,res) {
    let publisher = req.body;

    publisherDao.createPublisher(publisher, function(err, result) {
        if(err){
            res.status(400);
            res.send('Create Failed!');
          }
          res.status(204);
          res.send('Create Successful!');
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

exports.createGenre = (function(req,res) {
    let genre = req.body;

    genreDao.createGenre(genre, function(err, result) {
        if(err){
            res.status(400);
            res.send('Create Failed!');
          }
          res.status(204);
          res.send('Create Successful!');
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

exports.createBorrower = (function(req,res) {
    let borrower = req.body;

    borrowerDao.createBorrower(borrower, function(err, result) {
        if(err){
            res.status(400);
            res.send('Create Failed!');
          }
          res.status(204);
          res.send('Create Successful!');
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

exports.createBranch = (function(req,res) {
    let branch = req.body;

    branchDao.createBranch(branch, function(err, result) {
        if(err){
            res.status(400);
            res.send('Create Failed!');
          }
          res.status(204);
          res.send('Create Successful!');
    });
});