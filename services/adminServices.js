let authorDao = require('../dao/authorDao');
let bookDao = require('../dao/bookDao');
let publisherDao = require('../dao/publisherDao');
let genreDao = require('../dao/genreDao');
let borrowerDao = require('../dao/borrowerDao');
let branchDao = require('../dao/branchDao');
let bookLoansDao = require('../dao/bookLoansDao');
let xml2js = require('xml2js');

exports.getAllAuthors = (function (req, res) {
    authorDao.getAllAuthors()
        .then(function (result) {
            if (req.accepts('json') || req.accepts('text/html')) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.send(result);
            } else if (req.accepts('application/xml')) {
                res.setHeader('Content-Type', 'text/xml');
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(result);
                res.status(200);
                res.send(xml);
            } else {
                res.send(406);
            }
        })
        .catch(function (err) {
            throw err;
        });
});

exports.getAuthorById = (function (req, res) {
    authorDao.getAuthorById(req.params.id)
        .then(function (result) {
            if (req.accepts('json') || req.accepts('text/html')) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.send(result);
            } else if (req.accepts('application/xml')) {
                let body = result[0];
                res.setHeader('Content-Type', 'text/xml');
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(body);
                res.status(200);
                res.send(xml);
            } else {
                res.send(406);
            }
        })
        .catch(function (err) {
            throw err;
        });
});

exports.updateAuthor = (function(req,res) {
    let body;
    let authorId;
    let authorName;

    if (req.is('application/json') == 'application/json' ) {
        body = req.body;
        authorId = body.authorId;
        authorName = body.authorName;
    }else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        authorId = body.authorid[0];
        authorName = body.authorname[0];
    }

    authorDao.updateAuthor( authorName,  authorId, function(err, result) {
        if(err){
            res.status(400);
            res.send('Update Failed!');
          }
          res.status(204);
          res.send('Update Successful!');
    });
});

exports.createAuthor = (function(req,res) {
    let body;
    let authorName;

    if (req.is('application/json') == 'application/json' ) {
        body = req.body;
        authorName = body.authorName;

    }else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        authorName = body.authorname[0];
    }
    authorDao.createAuthor(authorName, function(err, result) {
        if(err){
            res.status(400);
            res.send('Create Failed!');
          }
          res.status(204);
          res.send('Create Successful!');
    });
});

exports.deleteAuthor = async function deleteAuthorTransaction(req,res) {
    console.log("Before func call");
    await deleteBooksByAuthorId(req, res);
    console.log("After func call");

    await authorDao.deleteAuthor(req.params.id, function(err, result) {
        if(err){
            res.status(400);
            res.send('Delete Failed!');
        }    
        res.status(200);

    });
    /* console.log("Before func call");
    deleteBooksByAuthorId(req, res);
    console.log("After func call"); */

    res.send('Delete Successful!');
};

async function deleteBooksByAuthorId(req, res) {
    console.log("Before deletBooksByAuthorId, Author ID: " + req.params.id);
    await bookDao.deleteBooksByAuthorId(req.params.id, function(err, result) {
        if(err){
            console.log("Error");
            res.status(400);
        }
        console.log("Success");
        res.status(204);
        console.log("After deletBooksByAuthorId");
    });
}

exports.getAllBooks = (function (req, res) {
    bookDao.getAllBooks()
        .then(function (result) {
            if (req.accepts('json') || req.accepts('text/html')) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.send(result);
            } else if (req.accepts('application/xml')) {
                res.setHeader('Content-Type', 'text/xml');
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(result);
                res.status(200);
                res.send(xml);
            } else {
                res.send(406);
            }
        })
        .catch(function (err) {
            throw err;
        });
});

exports.getBookById = (function (req, res) {
    bookDao.getBookById(req.params.id)
        .then(function (result) {
            if (req.accepts('json') || req.accepts('text/html')) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.send(result);
            } else if (req.accepts('application/xml')) {
                let body = result[0];
                res.setHeader('Content-Type', 'text/xml');
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(body);
                res.status(200);
                res.send(xml);
            } else {
                res.send(406);
            }
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

exports.getAllPublishers = (function (req, res) {
    publisherDao.getAllPublishers()
        .then(function (result) {
            if (req.accepts('json') || req.accepts('text/html')) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.send(result);
            } else if (req.accepts('application/xml')) {
                res.setHeader('Content-Type', 'text/xml');
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(result);
                res.status(200);
                res.send(xml);
            } else {
                res.send(406);
            }
        })
        .catch(function (err) {
            throw err;
        });
});

exports.getPublisherById = (function (req, res) {
    publisherDao.getPublisherById(req.params.id)
        .then(function (result) {
            if (req.accepts('json') || req.accepts('text/html')) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.send(result);
            } else if (req.accepts('application/xml')) {
                let body = result[0];
                res.setHeader('Content-Type', 'text/xml');
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(body);
                res.status(200);
                res.send(xml);
            } else {
                res.send(406);
            }
        })
        .catch(function (err) {
            throw err;
        });
});

exports.updatePublisher = (function(req,res) {
    let body;
    let publisherId;
    let publisherName;
    let publisherAddress;
    let publisherPhone;

    if (req.is('application/json') == 'application/json' ) {
        body = req.body;
        publisherId = body.publisherId;
        publisherName = body.publisherName;
        publisherAddress = body.publisherAddress;
        publisherPhone = body.publisherPhone;
    }else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        publisherId = body.publisherid[0];
        publisherName = body.publishername[0];
        publisherAddress = body.publisheraddress[0];
        publisherPhone = body.publisherphone[0];
    }

    publisherDao.updatePublisher(publisherName, publisherAddress, publisherPhone, publisherId, function(err, result) {
        if(err){
            res.status(400);
            res.send('Update Failed!');
          }
          res.status(204);
          res.send('Update Successful!');
    });
});

exports.createPublisher = (function(req,res) {
    let body;
    let publisherId;
    let publisherName;
    let publisherAddress;
    let publisherPhone;

    if (req.is('application/json') == 'application/json' ) {
        body = req.body;
        publisherId = body.publisherId;
        publisherName = body.publisherName;
        publisherAddress = body.publisherAddress;
        publisherPhone = body.publisherPhone;
    }else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        publisherId = body.publisherid[0];
        publisherName = body.publishername[0];
        publisherAddress = body.publisheraddress[0];
        publisherPhone = body.publisherphone[0];
    }

    publisherDao.createPublisher(publisherName, publisherAddress, publisherPhone, publisherId, function(err, result) {
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
            if (req.accepts('json') || req.accepts('text/html')) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.send(result);
            } else if (req.accepts('application/xml')) {
                res.setHeader('Content-Type', 'text/xml');
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(result);
                res.status(200);
                res.send(xml);
            } else {
                res.send(406);
            }
        })
        .catch(function (err) {
            throw err;
        });
});

exports.getGenreById = (function (req, res) {
    genreDao.getGenreById(req.params.id)
        .then(function (result) {
            if (req.accepts('json') || req.accepts('text/html')) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.send(result);
            } else if (req.accepts('application/xml')) {
                let body = result[0];
                res.setHeader('Content-Type', 'text/xml');
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(body);
                res.status(200);
                res.send(xml);
            } else {
                res.send(406);
            }
        })
        .catch(function (err) {
            throw err;
        });
});

exports.updateGenre = (function(req,res) {
    let body;
    let genre_id;
    let genre_name;

    if (req.is('application/json') == 'application/json' ) {
        body = req.body;
        genre_id = body.genre_id;
        genre_name = body.genre_name;
    }else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        genre_id = body.genre_id[0];
        genre_name = body.genre_name[0];
    }

    genreDao.updateGenre(genre_name, genre_id, function(err, result) {
        if(err){
            res.status(400);
            res.send('Update Failed!');
          }
          res.status(204);
          res.send('Update Successful!');
    });
});

exports.createGenre = (function(req,res) {
    let body;
    let genre_name;

    if (req.is('application/json') == 'application/json' ) {
        body = req.body;
        genre_name = body.genre_name;
    }else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        genre_name = body.genre_name[0];
    }

    genreDao.createGenre(genre_name, function(err, result) {
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
            if (req.accepts('json') || req.accepts('text/html')) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.send(result);
            } else if (req.accepts('application/xml')) {
                res.setHeader('Content-Type', 'text/xml');
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(result);
                res.status(200);
                res.send(xml);
            } else {
                res.send(406);
            }
        })
        .catch(function (err) {
            throw err;
        });
});

exports.getBorrowerById = (function (req, res) {
    borrowerDao.getBorrowerById(req.params.id)
        .then(function (result) {
            if (req.accepts('json') || req.accepts('text/html')) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.send(result);
            } else if (req.accepts('application/xml')) {
                let body = result[0];
                res.setHeader('Content-Type', 'text/xml');
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(body);
                res.status(200);
                res.send(xml);
            } else {
                res.send(406);
            }
        })
        .catch(function (err) {
            throw err;
        });
});

exports.updateBorrower = (function(req,res) {
    let body;
    let name;
    let address;
    let phone;
    let cardNo;

    if (req.is('application/json') == 'application/json' ) {
        body = req.body;
        name = body.name;
        address = body.address;
        phone = body.phone;
        cardNo = body.cardNo;
    }else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        name = body.name[0];
        address = body.address[0];
        phone = body.phone[0];
        cardNo = body.cardno[0];
    }

    borrowerDao.updateBorrower(name, address, phone, cardNo, function(err, result) {
        if(err){
            res.status(400);
            res.send('Update Failed!');
          }
          res.status(204);
          res.send('Update Successful!');
    });
});

exports.createBorrower = (function(req,res) {
    let body;
    let name;
    let address;
    let phone;

    if (req.is('application/json') == 'application/json' ) {
        body = req.body;
        name = body.name;
        address = body.address;
        phone = body.phone;
    }else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        name = body.name[0];
        address = body.address[0];
        phone = body.phone[0];
    }

    borrowerDao.createBorrower(name, address, phone, function(err, result) {
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
            if (req.accepts('json') || req.accepts('text/html')) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.send(result);
            } else if (req.accepts('application/xml')) {
                res.setHeader('Content-Type', 'text/xml');
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(result);
                res.status(200);
                res.send(xml);
            } else {
                res.send(406);
            }
        })
        .catch(function (err) {
            throw err;
        });
});

exports.getBranchById = (function (req, res) {
    branchDao.getBranchById(req.params.id)
        .then(function (result) {
            if (req.accepts('json') || req.accepts('text/html')) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.send(result);
            } else if (req.accepts('application/xml')) {
                let body = result[0];
                res.setHeader('Content-Type', 'text/xml');
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(body);
                res.status(200);
                res.send(xml);
            } else {
                res.send(406);
            }
        })
        .catch(function (err) {
            throw err;
        });
});

exports.updateBranch = (function(req,res) {
    let body;
    let branchId;
    let branchName;
    let branchAddress;

    if (req.is('application/json') == 'application/json' ) {
        body = req.body;
        branchId = body.branchId;
        branchName = body.branchName;
        branchAddress = body.branchAddress;
    }else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        branchId = body.branchId[0];
        branchName = body.branchname[0];
        branchAddress= body.branchaddress[0];
    }

    branchDao.updateBranch(branchName, branchAddress, branchId, function(err, result) {
        if(err){
            res.status(400);
            res.send('Update Failed!');
          }
          res.status(204);
          res.send('Update Successful!');
    });
});

exports.createBranch = (function(req,res) {
    let body;
    let branchId;
    let branchName;
    let branchAddress;

    if (req.is('application/json') == 'application/json' ) {
        body = req.body;
        branchId = body.branchId;
        branchName = body.branchName;
        branchAddress = body.branchAddress;
    }else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        branchId = body.branchId[0];
        branchName = body.branchname[0];
        branchAddress= body.branchaddress[0];
    }

    branchDao.createBranch(branchName, branchAddress, branchId, function(err, result) {
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