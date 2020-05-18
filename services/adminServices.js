/* var bookCopiesDao = require('../dao/bookCopiesDao'); */
let authorDao = require('../dao/authorDao');
let bookDao = require('../dao/bookDao');
let publisherDao = require('../dao/publisherDao');
let genreDao = require('../dao/genreDao');
let borrowerDao = require('../dao/borrowerDao');
let branchDao = require('../dao/branchDao');
let key = -1;

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

exports.createBook = async function createBookTransaction(req,res) {
    
    
    let key = await createBookOne(req,res);

    console.log("Outside Key: " + key);
    // this function need the key of newly created book from above method
    createBookAuthors(req,res);
    
    
}

async function createBookOne(req,res) {
    let book = req.body;

    bookDao.createBook(book, function(err, result) {
        if(err){
            res.status(400);
            res.send('Update Failed!');
          }
          
          res.status(204);

          // THIS IS THE KEY OF THE NEW BOOK CREATED
          // Need this value in parent createBook method
          // in order to pass it to the next method "createBookAuthors"
          // that establishes author-book relationships in tbl_book_authors
          console.log("Inside Key: " + result.insertId);
          return result.insertId;
          
          console.log(result.insertId);
          

          /* res.send('Update Successful!'); */
    });
};

async function createBookAuthors(req,res) {
    let book = req.body;
    console.log(book);
    
    console.log("Inside createBookTwo");
    bookDao.addBookAuthorRelationship(book, function(err, result) {
        if(err){
            res.status(400);
          }
          res.status(204);
          res.send('Create book transaction completed');
    });
};

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