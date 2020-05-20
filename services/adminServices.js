let authorDao = require('../dao/authorDao');
let bookDao = require('../dao/bookDao');
let publisherDao = require('../dao/publisherDao');
let genreDao = require('../dao/genreDao');
let borrowerDao = require('../dao/borrowerDao');
let branchDao = require('../dao/branchDao');
let bookLoansDao = require('../dao/bookLoansDao');
let xml2js = require('xml2js');

/* 
This method returns the list of all authors
*/
exports.getAllAuthors = (function (req, res) {
    authorDao.getAllAuthors()
        // query success, process results
        .then(function (result) {
            // send results as json
            if (req.accepts('json') || req.accepts('text/html')) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.send(result);
            }
            // send results as xml if requested
            else if (req.accepts('application/xml')) {
                res.setHeader('Content-Type', 'text/xml');
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(result);
                res.status(200);
                res.send(xml);
            }
            // content negotiation failure
            else {
                res.send(406);
            }
        })
        // query failure
        .catch(function (err) {
            console.log('getAllAuthors query failed');
            res.send(400);
        });
});

/* 
This method returns an author by id
*/
exports.getAuthorById = (function (req, res) {
    authorDao.getAuthorById(req.params.id)
        // query success, process results
        .then(function (result) {
            // if result is empty, author by id not found
            if (result.length == 0) {
                res.status(404);
                res.send("No matching author found");
            } else {
                // send results as json
                if (req.accepts('json') || req.accepts('text/html')) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200);
                    res.send(result);
                }
                // send results as xml if requested
                else if (req.accepts('application/xml')) {
                    let body = result[0];
                    res.setHeader('Content-Type', 'text/xml');
                    var builder = new xml2js.Builder();
                    var xml = builder.buildObject(body);
                    res.status(200);
                    res.send(xml);
                }
                // content negotiation failure
                else {
                    res.send(406);
                }
            }
        })
        // query failure
        .catch(function (err) {
            console.log('getAuthorById query failed');
            res.send(400);
        });
});

/* 
This method updates author information
*/
exports.updateAuthor = (async function (req, res) {
    let body; // payload of put request
    let authorId; // id of author to update
    let authorName; // new author name

    // prepare payload in json format
    if (req.is('application/json') == 'application/json') {
        body = req.body;
        authorId = body.authorId;
        authorName = body.authorName;
    }
    // prepare payload in xml format
    else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        authorId = body.authorid[0];
        authorName = body.authorname[0];
    }

    // error if need update values not provided
    if (!authorId || !authorName) {
        res.status(400);
        res.send('Request does not provide all neccessary information');
        return;
    }

    // make sure id provided matches an existing record
    let result = await authorDao.getAuthorById(authorId);
    if (result.length == 0) {
        res.status(404);
        res.send('ID provided does not match any existing records');
        return;
    }

    // update the record
    authorDao.updateAuthor(authorName, authorId, function (err, result) {
        // error with query
        if (err) {
            res.status(400);
            res.send('Update Failed!');
        }
        // update successful 
        else {
            res.status(204);
            res.send('Update Successful!');
        }
    });
});

/* 
This method creates a new author
*/
exports.createAuthor = (function (req, res) {
    let body; // payload of post request
    let authorName; // new author name

    // prepare payload in json format
    if (req.is('application/json') == 'application/json') {
        body = req.body;
        authorName = body.authorName;

    }
    // prepare payload in xml format
    else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        authorName = body.authorname[0];
    }

    // error if need update values not provided
    if (!authorName) {
        res.status(400);
        res.send('Request does not provide all neccessary information');
        return;
    }

    // create the record
    authorDao.createAuthor(authorName, function (err, result) {
        // error with query
        if (err) {
            res.status(400);
            res.send('Create Failed!');
        }
        // create successful 
        else {
            res.status(204);
            res.send('Update Successful!');
        }
    });
});

exports.deleteAuthor = async function deleteAuthorTransaction(req, res) {
    console.log("Before func call");
    await deleteBooksByAuthorId(req, res);
    console.log("After func call");

    await authorDao.deleteAuthor(req.params.id, function (err, result) {
        if (err) {
            res.status(400);
            res.send('Delete Failed!');
        }
        res.status(200);

    });

    res.send('Delete Successful!');
};

async function deleteBooksByAuthorId(req, res) {
    console.log("Before deletBooksByAuthorId, Author ID: " + req.params.id);
    await bookDao.deleteBooksByAuthorId(req.params.id, function (err, result) {
        if (err) {
            console.log("Error");
            res.status(400);
        }
        console.log("Success");
        res.status(204);
        console.log("After deletBooksByAuthorId");
    });
}

/* 
This method returns the list of all books
*/
exports.getAllBooks = (function (req, res) {
    bookDao.getAllBooks()
        // query success, process results
        .then(function (result) {
            // send results as json
            if (req.accepts('json') || req.accepts('text/html')) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.send(result);
            }
            // send results as xml if requested
            else if (req.accepts('application/xml')) {
                res.setHeader('Content-Type', 'text/xml');
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(result);
                res.status(200);
                res.send(xml);
            } else {
                res.send(406);
            }
        })
        // content negotiation failure
        .catch(function (err) {
            console.log('getAllBooks query failed');
            res.send(400);
        });
});

/* 
This method returns a book by id
*/
exports.getBookById = (function (req, res) {
    bookDao.getBookById(req.params.id)
        // query success, process results
        .then(function (result) {
            // if result is empty, book by id not found
            if (result.length == 0) {
                res.status(404);
                res.send("No matching book found");
            } else {
                // send results as json
                if (req.accepts('json') || req.accepts('text/html')) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200);
                    res.send(result);
                }
                // send results as xml if requested
                else if (req.accepts('application/xml')) {
                    let body = result[0];
                    res.setHeader('Content-Type', 'text/xml');
                    var builder = new xml2js.Builder();
                    var xml = builder.buildObject(body);
                    res.status(200);
                    res.send(xml);
                }
                // content negotiation failure
                else {
                    res.send(406);
                }
            }
        })
        // query failure
        .catch(function (err) {
            console.log('getBookById query failed');
            res.send(400);
        });
});

/* 
This method updates book information
*/
exports.updateBook = (async function (req, res) {
    let body; // payload of put request
    let bookId; // id of book to update
    let title; // new book title
    let pubId; // new publisher id

    // prepare payload in json format
    if (req.is('application/json') == 'application/json') {
        body = req.body;
        bookId = body.bookId;
        title = body.title;
        pubId = body.pubId;
    }
    // prepare payload in xml format
    /*     else if (req.is('application/xml') == 'application/xml') {
            body = req.body.root;
            bookId = body.bookId[0];
            title = body.title[0];
            pubId = body.pubId[0];
        } */

    // error if need update values not provided
    if (!bookId || !title || !pubId) {
        res.status(400);
        res.send('Request does not provide all neccessary information');
        return;
    }

    // make sure id provided matches an existing record
    let result = await bookDao.getBookById(bookId);
    if (result.length == 0) {
        res.status(404);
        res.send('ID provided does not match any existing records');
        return;
    }

    // update the record
    bookDao.updateBook(bookId, title, pubId, function (err, result) {
        // error with query
        if (err) {
            res.status(400);
            res.send('Update Failed!');
        }
        // update successful 
        else {
            res.status(204);
            res.send('Update Successful!');
        }
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

async function createBookAuthors(req, res) {
    let book = req.body;
    let x = -1;
    let bookArray = [];

    for (x in book.authors) {
        bookArray = [book.bookId, book.authors[x].authorId];
        bookDao.addBookAuthorRelationship(bookArray, function (err, result) {
            if (err) {
                res.status(400);
            }
            res.status(204);
        });

    }

    /* res.send('Create book transaction completed'); */
};

exports.deleteBook = (function (req, res) {
    bookDao.deleteBook(req.params.id, function (err, result) {
        if (err) {
            res.status(400);
            res.send('Delete Failed!');
        }
        res.status(200);
        res.send('Delete Successful!');
    });
});

async function createBookGenres(req, res) {
    let book = req.body;
    let x = -1;
    let bookArray = [];

    for (x in book.genres) {
        bookArray = [book.genres[x].genreId, book.bookId];
        bookDao.addBookGenreRelationship(bookArray, function (err, result) {
            if (err) {
                res.status(400);
            }
            res.status(204);
        });
    }
};

/* 
This method returns the list of all publishers
*/
exports.getAllPublishers = (function (req, res) {
    publisherDao.getAllPublishers()
        // query success, process results
        .then(function (result) {
            // send results as json
            if (req.accepts('json') || req.accepts('text/html')) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.send(result);
            }
            // send results as xml if requested
            else if (req.accepts('application/xml')) {
                res.setHeader('Content-Type', 'text/xml');
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(result);
                res.status(200);
                res.send(xml);
            }
            // content negotiation failure
            else {
                res.send(406);
            }
        })
        // query failure
        .catch(function (err) {
            console.log('getAllPublishers query failed');
            res.send(400);
        });
});

/* 
This method returns a publisher by id
*/
exports.getPublisherById = (function (req, res) {
    publisherDao.getPublisherById(req.params.id)
        // query success, process results
        .then(function (result) {
            // if result is empty, publisher by id not found
            if (result.length == 0) {
                res.status(404);
                res.send("No matching publisher found");
            } else {
                // send results as json
                if (req.accepts('json') || req.accepts('text/html')) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200);
                    res.send(result);
                }
                // send results as xml if requested
                else if (req.accepts('application/xml')) {
                    let body = result[0];
                    res.setHeader('Content-Type', 'text/xml');
                    var builder = new xml2js.Builder();
                    var xml = builder.buildObject(body);
                    res.status(200);
                    res.send(xml);
                }
                // content negotiation failure
                else {
                    res.send(406);
                }
            }
        })
        // query failure
        .catch(function (err) {
            console.log('getPublisherById query failed');
            res.send(400);
        });
});

/* 
This method updates publisher information
*/
exports.updatePublisher = (async function (req, res) {
    let body; // payload of put request
    let publisherId; // id of publisher to update
    let publisherName; // new publisher name
    let publisherAddress; // new publisher address
    let publisherPhone; // new publisher phone

    // prepare payload in json format
    if (req.is('application/json') == 'application/json') {
        body = req.body;
        publisherId = body.publisherId;
        publisherName = body.publisherName;
        publisherAddress = body.publisherAddress;
        publisherPhone = body.publisherPhone;
    }
    // prepare payload in xml format
    else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        publisherId = body.publisherid[0];
        publisherName = body.publishername[0];
        publisherAddress = body.publisheraddress[0];
        publisherPhone = body.publisherphone[0];
    }

    // error if need update values not provided
    if (!publisherId || !publisherName || !publisherAddress || !publisherPhone) {
        res.status(400);
        res.send('Request does not provide all neccessary information');
        return;
    }

    // make sure id provided matches an existing record
    let result = await publisherDao.getPublisherById(publisherId);
    if (result.length == 0) {
        res.status(404);
        res.send('ID provided does not match any existing records');
        return;
    }

    // update the record
    publisherDao.updatePublisher(publisherName, publisherAddress, publisherPhone, publisherId, function (err, result) {
        // error with query
        if (err) {
            res.status(400);
            res.send('Update Failed!');
        }
        // update successful 
        else {
            res.status(204);
            res.send('Update Successful!');
        }
    });
});

exports.createPublisher = (function (req, res) {
    let body;
    let publisherId;
    let publisherName;
    let publisherAddress;
    let publisherPhone;

    if (req.is('application/json') == 'application/json') {
        body = req.body;
        publisherId = body.publisherId;
        publisherName = body.publisherName;
        publisherAddress = body.publisherAddress;
        publisherPhone = body.publisherPhone;
    } else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        publisherId = body.publisherid[0];
        publisherName = body.publishername[0];
        publisherAddress = body.publisheraddress[0];
        publisherPhone = body.publisherphone[0];
    }

    publisherDao.createPublisher(publisherName, publisherAddress, publisherPhone, publisherId, function (err, result) {
        if (err) {
            res.status(400);
            res.send('Create Failed!');
        }
        res.status(204);
        res.send('Create Successful!');
    });
});

exports.deletePublisher = (function (req, res) {
    publisherDao.deletePublisher(req.params.id, function (err, result) {
        if (err) {
            res.status(400);
            res.send('Delete Failed!');
        }
        res.status(200);
        res.send('Delete Successful!');
    });
});

/* 
This method returns the list of all genres
*/
exports.getAllGenres = (function (req, res) {
    genreDao.getAllGenres()
        // query success, process results
        .then(function (result) {
            // send results as json
            if (req.accepts('json') || req.accepts('text/html')) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.send(result);
            }
            // send results as xml if requested
            else if (req.accepts('application/xml')) {
                res.setHeader('Content-Type', 'text/xml');
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(result);
                res.status(200);
                res.send(xml);
            }
            // content negotiation failure
            else {
                res.send(406);
            }
        })
        // query failure
        .catch(function (err) {
            console.log('getAllGenres query failed');
            res.send(400);
        });
});

/* 
This method returns a genre by id
*/
exports.getGenreById = (function (req, res) {
    genreDao.getGenreById(req.params.id)
        // query success, process results
        .then(function (result) {
            // if result is empty, genre by id not found
            if (result.length == 0) {
                res.status(404);
                res.send("No matching author found");
            } else {
                // send results as json
                if (req.accepts('json') || req.accepts('text/html')) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200);
                    res.send(result);
                }
                // send results as xml if requested
                else if (req.accepts('application/xml')) {
                    let body = result[0];
                    res.setHeader('Content-Type', 'text/xml');
                    var builder = new xml2js.Builder();
                    var xml = builder.buildObject(body);
                    res.status(200);
                    res.send(xml);
                }
                // content negotiation failure
                else {
                    res.send(406);
                }
            }
        })
        // query failure
        .catch(function (err) {
            console.log('getGenreById query failed');
            res.send(400);
        });
});

/* 
This method updates genre information
*/
exports.updateGenre = (async function (req, res) {
    let body; // payload of put request
    let genre_id; // id of genre to update
    let genre_name; // new genre name

    // prepare payload in json format
    if (req.is('application/json') == 'application/json') {
        body = req.body;
        genre_id = body.genre_id;
        genre_name = body.genre_name;
    }
    // prepare payload in xml format
    else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        genre_id = body.genre_id[0];
        genre_name = body.genre_name[0];
    }

    // error if need update values not provided
    if (!genre_id || !genre_name) {
        res.status(400);
        res.send('Request does not provide all neccessary information');
        return;
    }

    // make sure id provided matches an existing record
    let result = await genreDao.getGenreById(genre_id);
    if (result.length == 0) {
        res.status(404);
        res.send('ID provided does not match any existing records');
        return;
    }

    // update the record
    genreDao.updateGenre(genre_name, genre_id, function (err, result) {
        // error with query
        if (err) {
            res.status(400);
            res.send('Update Failed!');
        }
        // update successful 
        else {
            res.status(204);
            res.send('Update Successful!');
        }
    });
});

exports.createGenre = (function (req, res) {
    let body;
    let genre_name;

    if (req.is('application/json') == 'application/json') {
        body = req.body;
        genre_name = body.genre_name;
    } else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        genre_name = body.genre_name[0];
    }

    genreDao.createGenre(genre_name, function (err, result) {
        if (err) {
            res.status(400);
            res.send('Create Failed!');
        }
        res.status(204);
        res.send('Create Successful!');
    });
});

exports.deleteGenre = (function (req, res) {
    genreDao.deleteGenre(req.params.id, function (err, result) {
        if (err) {
            res.status(400);
            res.send('Delete Failed!');
        }
        res.status(200);
        res.send('Delete Successful!');
    });
});

/* 
This method returns the list of all borrowers
*/
exports.getBorrowers = (function (req, res) {
    borrowerDao.getAllBorrowers()
        // query success, process results
        .then(function (result) {
            // send results as json
            if (req.accepts('json') || req.accepts('text/html')) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.send(result);
            }
            // send results as xml if requested
            else if (req.accepts('application/xml')) {
                res.setHeader('Content-Type', 'text/xml');
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(result);
                res.status(200);
                res.send(xml);
            }
            // content negotiation failure
            else {
                res.send(406);
            }
        })
        // query failure
        .catch(function (err) {
            console.log('getAllBorrowers query failed');
            res.send(400);
        });
});

/* 
This method returns a borrower by id
*/
exports.getBorrowerById = (function (req, res) {
    borrowerDao.getBorrowerById(req.params.id)
        // query success, process results
        .then(function (result) {
            // if result is empty, borrower by id not found
            if (result.length == 0) {
                res.status(404);
                res.send("No matching author found");
            } else {
                // send results as json
                if (req.accepts('json') || req.accepts('text/html')) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200);
                    res.send(result);
                }
                // send results as xml if requested
                else if (req.accepts('application/xml')) {
                    let body = result[0];
                    res.setHeader('Content-Type', 'text/xml');
                    var builder = new xml2js.Builder();
                    var xml = builder.buildObject(body);
                    res.status(200);
                    res.send(xml);
                }
                // content negotiation failure
                else {
                    res.send(406);
                }
            }
        })
        // query failure
        .catch(function (err) {
            console.log('getBorrowerById query failed');
            res.send(400);
        });
});

/* 
This method updates borrower information
*/
exports.updateBorrower = (async function (req, res) {
    let body; // payload of put request
    let name; // id of borrower to update
    let address; // new address
    let phone; // new phone
    let cardNo; // new cardNo

    // prepare payload in json format
    if (req.is('application/json') == 'application/json') {
        body = req.body;
        name = body.name;
        address = body.address;
        phone = body.phone;
        cardNo = body.cardNo;
    }
    // prepare payload in xml format
    else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        name = body.name[0];
        address = body.address[0];
        phone = body.phone[0];
        cardNo = body.cardno[0];
    }

    // error if need update values not provided
    if (!name || !address || !phone || !cardNo) {
        res.status(400);
        res.send('Request does not provide all neccessary information');
        return;
    }

    // make sure id provided matches an existing record
    let result = await borrowerDao.getBorrowerById(cardNo);
    if (result.length == 0) {
        res.status(404);
        res.send('ID provided does not match any existing records');
        return;
    }

    // update the record
    borrowerDao.updateBorrower(name, address, phone, cardNo, function (err, result) {
        // error with query
        if (err) {
            res.status(400);
            res.send('Update Failed!');
        }
        // update successful 
        else {
            res.status(204);
            res.send('Update Successful!');
        }
    });
});

exports.createBorrower = (function (req, res) {
    let body;
    let name;
    let address;
    let phone;

    if (req.is('application/json') == 'application/json') {
        body = req.body;
        name = body.name;
        address = body.address;
        phone = body.phone;
    } else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        name = body.name[0];
        address = body.address[0];
        phone = body.phone[0];
    }

    borrowerDao.createBorrower(name, address, phone, function (err, result) {
        if (err) {
            res.status(400);
            res.send('Create Failed!');
        }
        res.status(204);
        res.send('Create Successful!');
    });
});

exports.deleteBorrower = (function (req, res) {
    borrowerDao.deleteBorrower(req.params.id, function (err, result) {
        if (err) {
            res.status(400);
            res.send('Delete Failed!');
        }
        res.status(200);
        res.send('Delete Successful!');
    });
});

/* 
This method returns the list of all library branches
*/
exports.getBranches = (function (req, res) {
    branchDao.getAllBranches()
        // query success, process results
        .then(function (result) {
            if (req.accepts('json') || req.accepts('text/html')) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200);
                res.send(result);
            }
            // send results as xml if requested
            else if (req.accepts('application/xml')) {
                res.setHeader('Content-Type', 'text/xml');
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(result);
                res.status(200);
                res.send(xml);
            }
            // content negotiation failure
            else {
                res.send(406);
            }
        })
        // query failure
        .catch(function (err) {
            console.log('getAllBranches query failed');
            res.send(400);
        });
});

/* 
This method returns a branch by id
*/
exports.getBranchById = (function (req, res) {
    branchDao.getBranchById(req.params.id)
        // query success, process results
        .then(function (result) {
            // if result is empty, branch by id not found
            if (result.length == 0) {
                res.status(404);
                res.send("No matching author found");
            } else {
                // send results as json
                if (req.accepts('json') || req.accepts('text/html')) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200);
                    res.send(result);
                }
                // send results as xml if requested
                else if (req.accepts('application/xml')) {
                    let body = result[0];
                    res.setHeader('Content-Type', 'text/xml');
                    var builder = new xml2js.Builder();
                    var xml = builder.buildObject(body);
                    res.status(200);
                    res.send(xml);
                }
                // content negotiation failure
                else {
                    res.send(406);
                }
            }
        })
        // query failure
        .catch(function (err) {
            console.log('getBranchById query failed');
            res.send(400);
        });
});

/* 
This method updates branch information
*/
exports.updateBranch = (async function (req, res) {
    let body; // payload of put request
    let branchId; // id of branch to update
    let branchName; // new branch name
    let branchAddress; // new address

    // prepare payload in json format
    if (req.is('application/json') == 'application/json') {
        body = req.body;
        branchId = body.branchId;
        branchName = body.branchName;
        branchAddress = body.branchAddress;
    }
    // prepare payload in xml format
    else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        branchId = body.branchId[0];
        branchName = body.branchname[0];
        branchAddress = body.branchaddress[0];
    }

    // error if need update values not provided
    if (!branchId || !branchName || !branchAddress) {
        res.status(400);
        res.send('Request does not provide all neccessary information');
        return;
    }

    // make sure id provided matches an existing record
    let result = await branchDao.getBranchById(branchId);
    if (result.length == 0) {
        res.status(404);
        res.send('ID provided does not match any existing records');
        return;
    }

    // update the record
    branchDao.updateBranch(branchName, branchAddress, branchId, function (err, result) {
        // error with query
        if (err) {
            res.status(400);
            res.send('Update Failed!');
        }
        // update successful 
        else {
            res.status(204);
            res.send('Update Successful!');
        }
    });
});

/* 
This method creates a new branch
*/
exports.createBranch = (function (req, res) {
    let body; // payload of post request 
    let branchName; // new branch name
    let branchAddress; // new branch address

    // prepare payload in json format
    if (req.is('application/json') == 'application/json') {
        body = req.body;
        branchName = body.branchName;
        branchAddress = body.branchAddress;
    }
    // prepare payload in xml format
    else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        branchName = body.branchname[0];
        branchAddress = body.branchaddress[0];
    }

    // error if need update values not provided
    if (!branchName || !branchAddress) {
        res.status(400);
        res.send('Request does not provide all neccessary information');
        return;
    }

    // create the record
    branchDao.createBranch(branchName, branchAddress, function (err, result) {
        // error with query
        if (err) {
            res.status(400);
            res.send('Create Failed!');
        }
        // create successful 
        else {
            res.status(204);
            res.send('Update Successful!');
        }
    });
});

exports.deleteBranch = (function (req, res) {
    branchDao.deleteBranch(req.params.id, function (err, result) {
        if (err) {
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