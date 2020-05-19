let authorDao = require('../dao/authorDao');
let bookDao = require('../dao/bookDao');
let publisherDao = require('../dao/publisherDao');
let genreDao = require('../dao/genreDao');
let borrowerDao = require('../dao/borrowerDao');
let branchDao = require('../dao/branchDao');
let bookLoansDao = require('../dao/bookLoansDao');
var LocalDate = require("@js-joda/core").LocalDate;

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

exports.deleteAuthor = (function(req,res) {
    authorDao.deleteAuthor(req.params.id, function(err, result) {
        if(err){
            res.status(400);
            res.send('Delete Failed!');
          }
          res.status(200);
          res.send('Delete Successful!');
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

exports.createBook = async function createBookTransaction(req, res) {
    let key = await createBookBase(req, res);
    console.log('Outside Key: ' + key);
    req.body.bookId = key;

    // create book-author relationships
    createBookAuthors(req, res);

    // create book-genre relationships if genres are defined (optional)
    //if (req.body.genres) {
        createBookGenres(req, res);
    //}

    res.send('Create book transaction completed');
};

async function createBookBase(req, res) {
    let book = req.body;

    const dbObj = await bookDao.createBook(book);
    return dbObj.insertId;
}

async function createBookAuthors(req,res) {
    let book = req.body;
    let x = -1;
    let bookArray = [];

    for (x in book.authors) {
        bookArray = [book.bookId, book.authors[x].authorId];
        bookDao.addBookAuthorRelationship(bookArray, function(err, result) {
            if(err){
                res.status(400);
              }
              res.status(204);
        });
        
    }

    /* res.send('Create book transaction completed'); */
};

async function createBookGenres(req,res) {
    let book = req.body;
    let x = -1;
    let bookArray = [];

    for (x in book.genres) {
        bookArray = [book.genres[x].genreId, book.bookId];
        bookDao.addBookGenreRelationship(bookArray, function(err, result) {
            if(err){
                res.status(400);
              }
              res.status(204);
        });
        
    }
};

exports.deleteBook = (function(req,res) {
    bookDao.deleteBook(req.params.id, function(err, result) {
        if(err){
            res.status(400);
            res.send('Delete Failed!');
          }
          res.status(200);
          res.send('Delete Successful!');
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

exports.deletePublisher = (function(req,res) {
    publisherDao.deletePublisher(req.params.id, function(err, result) {
        if(err){
            res.status(400);
            res.send('Delete Failed!');
          }
          res.status(200);
          res.send('Delete Successful!');
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

exports.deleteGenre = (function(req,res) {
    genreDao.deleteGenre(req.params.id, function(err, result) {
        if(err){
            res.status(400);
            res.send('Delete Failed!');
          }
          res.status(200);
          res.send('Delete Successful!');
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

exports.deleteBorrower = (function(req,res) {
    borrowerDao.deleteBorrower(req.params.id, function(err, result) {
        if(err){
            res.status(400);
            res.send('Delete Failed!');
          }
          res.status(200);
          res.send('Delete Successful!');
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

exports.deleteBranch = (function(req,res) {
    branchDao.deleteBranch(req.params.id, function(err, result) {
        if(err){
            res.status(400);
            res.send('Delete Failed!');
          }
          res.status(200);
          res.send('Delete Successful!');
    });
});

//
// extends book loan due date by 7 days
//
exports.extendLoan = async function extendLoan(req, res) {
    
    // make sure all key loan details provided to identify book loan to extend
    if (req.body.bookId && req.body.branchId && req.body.cardNo && req.body.dateOut) {
        // look for matching book loan to extend
        await bookLoansDao.findBookLoansById(req.body)
        .then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);

            // get loan due date
            let dateTime = new Date(result[0].dueDate.toISOString());

            // add 7 days to loan due date
            dateTime.setDate(dateTime.getDate() + parseInt(7));
            req.body.dueDate = dateTime.toISOString().slice(0, 10);

            // save new due date for loan
            bookLoansDao.saveBookLoansById(req.body)
            .then(function (result) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
            })
            .catch(function (err) {
                res.status(400);
            });

            res.send(result);
        })
        .catch(function (err) {
            console.log("Error processing request");
            res.status(400);
        });

    } else {
        console.log("Insufficient loan details provided.  Could not process request.");
        res.status(400);
    }
};