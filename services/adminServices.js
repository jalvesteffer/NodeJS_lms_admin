let authorDao = require('../dao/authorDao');
let bookDao = require('../dao/bookDao');
let publisherDao = require('../dao/publisherDao');
let genreDao = require('../dao/genreDao');
let borrowerDao = require('../dao/borrowerDao');
let branchDao = require('../dao/branchDao');
let bookLoansDao = require('../dao/bookLoansDao');

/* 
This method returns the list of all authors
*/
exports.getAllAuthors = (async function (req, res) {
    try {
        // get all authors
        result = await authorDao.getAllAuthors();

        // for each author, get the books the author wrote
        for (author of result) {
            booksResult = await bookDao.getBooksByAuthorId(author.authorId);
            if (booksResult && booksResult.length > 0) {
                author.books = booksResult;
            }
        }
        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
});

/* 
This method returns an author by id
*/
exports.getAuthorById = (async function (req, res) {
    try {
        // get all authors
        result = await authorDao.getAuthorById(req.params.id);

        // if result is empty, author by id not found
        if (result.length == 0) {
            res.querySuccess = false;
            return;
        }

        // for author, get the books the author wrote
        booksResult = await bookDao.getBooksByAuthorId(req.params.id);
        if (booksResult && booksResult.length > 0) {
            result[0].books = booksResult;
        }

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
});

/* 
This method updates author information
*/
exports.updateAuthor = (async function (req, res) {
    let body; // payload of put request
    let authorId; // id of author to update
    let authorName; // new author name
    let books; // books written by author

    // prepare payload in json format
    if (req.is('application/json') == 'application/json') {
        body = req.body;
        authorId = body.authorId;
        authorName = body.authorName;
        books = body.books;
    }
    // prepare payload in xml format
    else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        authorId = body.authorid[0];
        authorName = body.authorname[0];
        books = body.books[0];
    }

    // if request specifies books...
    if (books) {
        // remove existing books/author relationships
        await bookDao.removeBookAuthorRelationshipsByAuthorId(authorId);

        // create new book-author relationships
        await createAuthorBooks(req, res);
    }

    try {
        // update the record
        result = await authorDao.updateAuthor(authorName, authorId);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
});

/* 
This method creates new book/author relationships to populate a books authors list
*/
async function createAuthorBooks(req, res) {
    let bookList = req.body.books;
    let bookArray = [];

    // for each author in book, create relationship
    for (let x = 0; x < bookList.length; x++) {
        bookArray = [bookList[x].bookId, req.body.authorId];

        bookDao.addBookAuthorRelationship(bookArray, function (err, result) {
            if (err) {
                res.status(400);
            } else {
                res.status(201);
            }
        });
    }
};

/* 
This method creates a new author
*/
exports.createAuthor = (async function (req, res) {
    let body; // payload of post request
    let authorName; // new author name
    let books; // books written by author

    // prepare payload in json format
    if (req.is('application/json') == 'application/json') {
        body = req.body;
        authorName = body.authorName;
        books = body.books;
    }
    // prepare payload in xml format
    else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        authorName = body.authorname[0];
        books = body.books[0];
    }

    try {
        // update the record
        const dbObj = await authorDao.createAuthor(authorName);
        req.body.authorId = dbObj.insertId;

        // if request specifies books...
        if (books) {
            // create new book-author relationships
            await createAuthorBooks(req, res);
        }

        res.querySuccess = true;
        res.queryResults = dbObj;
    } catch (err) {
        res.querySuccess = false;
    }
});

/* 
This method deletes a specified author by id
*/
exports.deleteAuthor = async function deleteAuthorTransaction(req, res) {

    // make sure id provided matches an existing record
    let result = await authorDao.getAuthorById(req.params.id);

    if (result.length == 0) {
        res.querySuccess = false;
        return;
    }

    try {
        // delete the record
        result = await authorDao.deleteAuthor(req.params.id);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
};

/* 
This method deletes all books by by an author's id
*/
async function deleteBooksByAuthorId(req, res) {
    await bookDao.deleteBooksByAuthorId(req.params.id, function (err, result) {
        if (err) {
            res.status(400);
        } else {
            res.status(204);
        }
    });
}

/* 
This method returns the list of all books
*/
exports.getAllBooks = async (req, res) => {
    try {
        // get all authors
        result = await bookDao.getAllBooks();

        // for each book, get other info
        for (book of result) {
            publisherResult = await bookDao.getPublisherByBookId(book.bookId);
            if (publisherResult && publisherResult.length > 0) {
                book.publisher = publisherResult;
            }
            authorsResult = await bookDao.getAuthorsByBookId(book.bookId);
            if (authorsResult && authorsResult.length > 0) {
                book.authors = authorsResult;
            }
            genresResult = await bookDao.getGenresByBookId(book.bookId);
            if (genresResult && genresResult.length > 0) {
                book.genres = genresResult;
            }
        }
        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
};

/* 
This method returns a book by id
*/
exports.getBookById = async (req, res) => {
    try {
        // get all authors
        result = await bookDao.getBookById(req.params.id);

        // if result is empty, author by id not found
        if (result.length == 0) {
            res.querySuccess = false;
            return;
        }

        // for book, get other info
        publisherResult = await bookDao.getPublisherByBookId(req.params.id);
        if (publisherResult && publisherResult.length > 0) {
            result[0].publisher = publisherResult;
        }
        authorsResult = await bookDao.getAuthorsByBookId(req.params.id);
        if (authorsResult && authorsResult.length > 0) {
            result[0].authors = authorsResult;
        }
        genresResult = await bookDao.getGenresByBookId(req.params.id);
        if (genresResult && genresResult.length > 0) {
            result[0].genres = genresResult;
        }

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
};

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
    else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        bookId = body.bookId[0];
        title = body.title[0];
        pubId = body.pubId[0];
    }

    // if request specifies authors...
    if (body.authors) {

        // remove existing books/author relationships
        await bookDao.removeBookAuthorRelationshipsByBookId(bookId);

        // create new book-author relationships
        await createBookAuthors(req, res);
    }

    // if request specifies genres...
    if (body.genres) {

        // remove existing books/author relationships
        await bookDao.removeBookGenreRelationshipsByBookId(bookId);

        // create new book-author relationships
        await createBookGenres(req, res);
    }

    try {
        // update the record
        result = await bookDao.updateBook(bookId, title, pubId);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
});

/* 
This method creates a new book transaction
*/
exports.createBook = async (req, res) => {
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
    else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        bookId = body.bookId[0];
        title = body.title[0];
        pubId = body.pubId[0];
    }

    try {
        // create new record in book table and get its key
        let key = await bookDao.createBook(body);
        req.body.bookId = key.insertId;

        // if request specifies authors...
        if (body.authors) {
            // create book-author relationships
            await createBookAuthors(req, res);
        }

        // if request specifies authors...
        if (body.genres) {
            // create book-genre relationships if genres are defined (optional)
            await createBookGenres(req, res);
        }

        res.querySuccess = true;
        res.queryResults = key;
    } catch (err) {
        res.querySuccess = false;
    }
};

/* 
This method a new record in the book table and returns its key
*/
async function createBookBase(req, res) {
    let book = req.body;

    const dbObj = await bookDao.createBook(book);
    return dbObj.insertId;
}

/* 
This method creates new book/author relationships to populate a books authors list
*/
async function createBookAuthors(req, res) {
    let book = req.body;
    let x = -1;
    let bookArray = [];

    // for each author in book, create relationship
    for (x in book.authors) {
        bookArray = [book.bookId, book.authors[x].authorId];
        bookDao.addBookAuthorRelationship(bookArray, function (err, result) {
            if (err) {
                res.status(400);
            } else {
                res.status(201);
            }
        });
    }
};

/* 
This method creates new book/genre relationships to populate a books genres list
*/
async function createBookGenres(req, res) {
    let book = req.body;
    let x = -1;
    let bookArray = [];

    // for each genre in book, create relationship
    for (x in book.genres) {
        bookArray = [book.genres[x].genre_id, book.bookId];
        console.log("Inside createBookGenres " + bookArray);
        bookDao.addBookGenreRelationship(bookArray, function (err, result) {
            if (err) {
                res.status(400);
            } else {
                res.status(201);
            }
        });
    }
};

/* 
This method deletes a specified book by id
*/
exports.deleteBook = async (req, res) => {

    // make sure id provided matches an existing record
    let result = await bookDao.getBookById(req.params.id);

    if (result.length == 0) {
        res.querySuccess = false;
        return;
    }

    try {
        // delete the record
        result = await bookDao.deleteBook(req.params.id);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
};

/* 
This method returns the list of all publishers
*/
exports.getAllPublishers = (async function (req, res) {
    try {
        // get all publishers
        result = await publisherDao.getAllPublishers();

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
});

/* 
This method returns a publisher by id
*/
exports.getPublisherById = (async function (req, res) {
    try {
        // get all authors
        result = await publisherDao.getPublisherById(req.params.id);

        // if result is empty, author by id not found
        if (result.length == 0) {
            res.querySuccess = false;
            return;
        }

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
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

    try {
        // update genre
        result = await publisherDao.updatePublisher(publisherName, publisherAddress, publisherPhone, publisherId);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
});

/* 
This method creates a new publisher
*/
exports.createPublisher = (async function (req, res) {
    let body; // payload of post request
    let publisherName; // new publisher name
    let publisherAddress; // new publisher address
    let publisherPhone; // new publisher phone

    // prepare payload in json format
    if (req.is('application/json') == 'application/json') {
        body = req.body;
        publisherName = body.publisherName;
        publisherAddress = body.publisherAddress;
        publisherPhone = body.publisherPhone;
    }
    // prepare payload in xml format
    else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        publisherName = body.publishername[0];
        publisherAddress = body.publisheraddress[0];
        publisherPhone = body.publisherphone[0];
    }

    try {
        // create the record
        const dbObj = await publisherDao.createPublisher(publisherName, publisherAddress, publisherPhone);

        res.querySuccess = true;
        res.queryResults = dbObj;
    } catch (err) {
        res.querySuccess = false;
    }
});

/* 
This method deletes a specified publisher by id
*/
exports.deletePublisher = (async function (req, res) {

    // make sure id provided matches an existing record
    let result = await publisherDao.getPublisherById(req.params.id);
    if (result.length == 0) {
        res.querySuccess = false;
        return;
    }

    try {
        // delete the record
        result = await publisherDao.deletePublisher(req.params.id);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
});

/* 
This method returns the list of all genres
*/
exports.getAllGenres = (async function (req, res) {

    try {
        // get all genres
        result = await genreDao.getAllGenres();

        // for each genre, get the books associated with it
        for (genre of result) {
            booksResult = await bookDao.getBooksByGenreId(genre.genre_id);
            if (booksResult && booksResult.length > 0) {
                genre.books = booksResult;
            }
        }
        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }

});

/* 
This method returns a genre by id
*/
exports.getGenreById = (async function (req, res) {
    try {
        // get all authors
        result = await genreDao.getGenreById(req.params.id);

        // if result is empty, author by id not found
        if (result.length == 0) {
            res.querySuccess = false;
            return;
        }

        // for genre, get the books the genre is associated with
        booksResult = await bookDao.getBooksByGenreId(req.params.id);
        if (booksResult && booksResult.length > 0) {
            result[0].books = booksResult;
        }

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
});

/* 
This method updates genre information
*/
exports.updateGenre = (async function (req, res) {
    let body; // payload of put request
    let genre_id; // id of genre to update
    let genre_name; // new genre name
    let books; // books written by author

    // prepare payload in json format
    if (req.is('application/json') == 'application/json') {
        body = req.body;
        genre_id = body.genre_id;
        genre_name = body.genre_name;
        books = body.books;
    }
    // prepare payload in xml format
    else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        genre_id = body.genre_id[0];
        genre_name = body.genre_name[0];
        books = body.books[0];
    }

    // if request specifies books...
    if (books) {
        // remove existing books/author relationships
        await bookDao.removeBookGenreRelationshipsByGenreId(genre_id);

        // create new book-author relationships
        await createGenreBooks(req, res);
    }

    try {
        // update genre
        result = await genreDao.updateGenre(genre_name, genre_id);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
});

/* 
This method creates new book/author relationships to populate a books authors list
*/
async function createGenreBooks(req, res) {
    let bookList = req.body.books;
    let bookArray = [];

    // for each book in genre, create relationship
    for (let x = 0; x < bookList.length; x++) {
        bookArray = [req.body.genre_id, bookList[x].bookId];

        bookDao.addBookGenreRelationship(bookArray, function (err, result) {
            if (err) {
                res.status(400);
            } else {
                res.status(201);
            }
        });
    }
};

/* 
This method updates genre information
*/
exports.createGenre = (async function (req, res) {
    let body; // payload of post request
    let genre_name; // new genre name
    let books; // books written by author

    // prepare payload in json format
    if (req.is('application/json') == 'application/json') {
        body = req.body;
        genre_name = body.genre_name;
        books = body.books;
    }
    // prepare payload in xml format
    else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        genre_name = body.genre_name[0];
        books = body.books[0];
    }

    try {
        // create the record
        const dbObj = await genreDao.createGenre(genre_name);
        req.body.genre_id = dbObj.insertId;

        // if request specifies books...
        if (books) {
            // create new book-author relationships
            await createGenreBooks(req, res);
        }

        res.querySuccess = true;
        res.queryResults = dbObj;
    } catch (err) {
        res.querySuccess = false;
    }
});

/* 
This method deletes a specified genre by id
*/
exports.deleteGenre = (async function (req, res) {

    // make sure id provided matches an existing record
    let result = await genreDao.getGenreById(req.params.id);
    if (result.length == 0) {
        res.querySuccess = false;
        return;
    }

    try {
        // delete the record
        result = await genreDao.deleteGenre(req.params.id);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
});

/* 
This method returns the list of all borrowers
*/
exports.getBorrowers = async (req, res) => {
    try {
        // get all authors
        result = await borrowerDao.getAllBorrowers();

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
};

/* 
This method returns a borrower by id
*/
exports.getBorrowerById = async (req, res) => {
    try {
        // get all borrowers
        result = await borrowerDao.getBorrowerById(req.params.id);

        // if result is empty, borrower by id not found
        if (result.length == 0) {
            res.querySuccess = false;
            return;
        }

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
};

/* 
This method updates borrower information
*/
exports.updateBorrower = async (req, res) => {
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

    try {
        // update the record
        result = await borrowerDao.updateBorrower(name, address, phone, cardNo);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
};

/* 
This method creates a new borrower
*/
exports.createBorrower = async (req, res) => {
    let body; // payload of post request
    let name; // new borrower name
    let address; // new address
    let phone; // new phone

    // prepare payload in json format
    if (req.is('application/json') == 'application/json') {
        body = req.body;
        name = body.name;
        address = body.address;
        phone = body.phone;
    }
    // prepare payload in xml format
    else if (req.is('application/xml') == 'application/xml') {
        body = req.body.root;
        name = body.name[0];
        address = body.address[0];
        phone = body.phone[0];
    }

    try {
        // update the record
        const dbObj = await borrowerDao.createBorrower(name, address, phone);
        req.body.cardNo = dbObj.insertId;

        res.querySuccess = true;
        res.queryResults = dbObj;
    } catch (err) {
        res.querySuccess = false;
    }
};

/* 
This method deletes a specified borrower by id
*/
exports.deleteBorrower = async (req, res) => {

    // make sure id provided matches an existing record
    let result = await borrowerDao.getBorrowerById(req.params.id);

    if (result.length == 0) {
        res.querySuccess = false;
        return;
    }

    try {
        // delete the record
        result = await borrowerDao.deleteBorrower(req.params.id);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
};

/* 
This method returns the list of all library branches
*/
exports.getBranches = (async function (req, res) {
    try {
        // get all publishers
        result = await branchDao.getAllBranches();

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
});

/* 
This method returns a branch by id
*/
exports.getBranchById = async (req, res) => {
    try {
        // get all authors
        result = await branchDao.getBranchById(req.params.id);

        // if result is empty, author by id not found
        if (result.length == 0) {
            res.querySuccess = false;
            return;
        }

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
};

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

    try {
        // update branch
        result = await branchDao.updateBranch(branchName, branchAddress, branchId);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
});

/* 
This method creates a new branch
*/
exports.createBranch = async (req, res) => {
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

    try {
        // create the record
        const dbObj = await branchDao.createBranch(branchName, branchAddress);

        res.querySuccess = true;
        res.queryResults = dbObj;
    } catch (err) {
        res.querySuccess = false;
    }
};

/* 
This method deletes a specified branch by id
*/
exports.deleteBranch = async (req, res) => {

    // make sure id provided matches an existing record
    let result = await branchDao.getBranchById(req.params.id);
    if (result.length == 0) {
        res.querySuccess = false;
        return;
    }

    try {
        // delete the record
        result = await branchDao.deleteBranch(req.params.id);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
};

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