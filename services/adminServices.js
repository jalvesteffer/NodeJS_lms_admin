let authorDao = require('../dao/authorDao');
let bookDao = require('../dao/bookDao');
let publisherDao = require('../dao/publisherDao');
let genreDao = require('../dao/genreDao');
let borrowerDao = require('../dao/borrowerDao');
let branchDao = require('../dao/branchDao');
let bookLoansDao = require('../dao/bookLoansDao');
const db = require("../db").getDb();

/* 
This method returns the list of all authors
*/
exports.getAllAuthors = async (req, res) => {
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
};

/* 
This method returns the list of all authors by search name
*/
exports.getAllAuthorsLike = async (name, req, res) => {
    try {
        // get all authors by search name
        result = await authorDao.getAllAuthorsLike(name);

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
};

/* 
This method returns an author by id
*/
exports.getAuthorById = async (req, res) => {
    try {
        // get all authors
        result = await authorDao.getAuthorById(req.params.id);

        // if result is empty, author by id not found
        if (!result[0]) {
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
};

/* 
This method updates author information
*/
exports.updateAuthor = async (req, res) => {
    let body; // payload of put request
    let authorId; // id of author to update
    let authorName; // new author name
    let books; // books written by author

    body = req.body;
    authorId = body.authorId;
    authorName = body.authorName;
    books = body.books;

    try {
        // start a new database transaction
        await db.beginTransaction();

        // if request specifies books...
        if (books) {
            // remove existing books/author relationships
            await bookDao.removeBookAuthorRelationshipsByAuthorId(authorId);

            // create new book-author relationships
            await createAuthorBooks(req, res);
        }

        // update the record
        result = await authorDao.updateAuthor(authorName, authorId);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }

    // end of database transaction;
    // either commit or rollback depending on querySuccess
    if (res.querySuccess) {
        await db.commit();
    } else {
        await db.rollback();
    }
};

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
                res.querySuccess = false;
            } else {
                res.querySuccess = true;
            }
        });
    }
};

/* 
This method creates a new author
*/
exports.createAuthor = async (req, res) => {
    let body; // payload of post request
    let authorName; // new author name
    let books; // books written by author

    body = req.body;
    authorName = body.authorName;
    books = body.books;

    try {
        // start a new database transaction
        await db.beginTransaction();

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

    // end of database transaction;
    // either commit or rollback depending on querySuccess
    if (res.querySuccess) {
        await db.commit();
    } else {
        await db.rollback();
    }
};

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
        // start a new database transaction
        await db.beginTransaction();

        // delete the record
        result = await authorDao.deleteAuthor(req.params.id);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }

    // end of database transaction;
    // either commit or rollback depending on querySuccess
    if (res.querySuccess) {
        await db.commit();
    } else {
        await db.rollback();
    }
};

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
This method returns the list of all books by search title
*/
exports.getAllBooksLike = async (title, req, res) => {
    try {
        // get all authors
        result = await bookDao.getAllBooksLike(title);

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

    body = req.body;
    bookId = body.bookId;
    title = body.title;
    pubId = body.pubId;

    try {
        // start a new database transaction
        await db.beginTransaction();

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

        // update the record
        result = await bookDao.updateBook(bookId, title, pubId);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }

    // end of database transaction;
    // either commit or rollback depending on querySuccess
    if (res.querySuccess) {
        await db.commit();
    } else {
        await db.rollback();
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

    body = req.body;
    bookId = body.bookId;
    title = body.title;
    pubId = body.pubId;

    try {
        // start a new database transaction
        await db.beginTransaction();

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

    // end of database transaction;
    // either commit or rollback depending on querySuccess
    if (res.querySuccess) {
        await db.commit();
    } else {
        await db.rollback();
    }
};

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
                res.querySuccess = false;
            } else {
                res.querySuccess = true;
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
        bookDao.addBookGenreRelationship(bookArray, function (err, result) {
            if (err) {
                res.querySuccess = false;
            } else {
                res.querySuccess = true;
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
        // start a new database transaction
        await db.beginTransaction();

        // delete the record
        result = await bookDao.deleteBook(req.params.id);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }

    // end of database transaction;
    // either commit or rollback depending on querySuccess
    if (res.querySuccess) {
        await db.commit();
    } else {
        await db.rollback();
    }
};

/* 
This method returns the list of all publishers
*/
exports.getAllPublishers = async (req, res) => {
    try {
        // get all publishers
        result = await publisherDao.getAllPublishers();

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
};

/* 
This method returns the list of all publishers by search name
*/
exports.getAllPublishersLike = async (name, req, res) => {
    try {
        // get all publishers
        result = await publisherDao.getAllPublishersLike(name);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
};

/* 
This method returns a publisher by id
*/
exports.getPublisherById = async (req, res) => {
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
};

/* 
This method updates publisher information
*/
exports.updatePublisher = async (req, res) => {
    let body; // payload of put request
    let publisherId; // id of publisher to update
    let publisherName; // new publisher name
    let publisherAddress; // new publisher address
    let publisherPhone; // new publisher phone

    body = req.body;
    publisherId = body.publisherId;
    publisherName = body.publisherName;
    publisherAddress = body.publisherAddress;
    publisherPhone = body.publisherPhone;

    try {
        // start a new database transaction
        await db.beginTransaction();

        // update genre
        result = await publisherDao.updatePublisher(publisherName, publisherAddress, publisherPhone, publisherId);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }

    // end of database transaction;
    // either commit or rollback depending on querySuccess
    if (res.querySuccess) {
        await db.commit();
    } else {
        await db.rollback();
    }
};

/* 
This method creates a new publisher
*/
exports.createPublisher = async (req, res) => {
    let body; // payload of post request
    let publisherName; // new publisher name
    let publisherAddress; // new publisher address
    let publisherPhone; // new publisher phone

    body = req.body;
    publisherName = body.publisherName;
    publisherAddress = body.publisherAddress;
    publisherPhone = body.publisherPhone;

    try {
        // start a new database transaction
        await db.beginTransaction();

        // create the record
        const dbObj = await publisherDao.createPublisher(publisherName, publisherAddress, publisherPhone);

        res.querySuccess = true;
        res.queryResults = dbObj;
    } catch (err) {
        res.querySuccess = false;
    }

    // end of database transaction;
    // either commit or rollback depending on querySuccess
    if (res.querySuccess) {
        await db.commit();
    } else {
        await db.rollback();
    }
};

/* 
This method deletes a specified publisher by id
*/
exports.deletePublisher = async (req, res) => {

    // make sure id provided matches an existing record
    let result = await publisherDao.getPublisherById(req.params.id);
    if (result.length == 0) {
        res.querySuccess = false;
        return;
    }

    try {
        // start a new database transaction
        await db.beginTransaction();

        // delete the record
        result = await publisherDao.deletePublisher(req.params.id);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }

    // end of database transaction;
    // either commit or rollback depending on querySuccess
    if (res.querySuccess) {
        await db.commit();
    } else {
        await db.rollback();
    }
};

/* 
This method returns the list of all genres
*/
exports.getAllGenres = async (req, res) => {

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

};

/* 
This method returns the list of all genres by search name
*/
exports.getAllGenresLike = async (name, req, res) => {
    try {
        // get all genres
        result = await genreDao.getAllGenresLike(name);

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
};

/* 
This method returns a genre by id
*/
exports.getGenreById = async (req, res) => {
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
};

/* 
This method updates genre information
*/
exports.updateGenre = async (req, res) => {
    let body; // payload of put request
    let genre_id; // id of genre to update
    let genre_name; // new genre name
    let books; // books written by author

    body = req.body;
    genre_id = body.genre_id;
    genre_name = body.genre_name;
    books = body.books;

    try {
        // start a new database transaction
        await db.beginTransaction();

        // if request specifies books...
        if (books) {
            // remove existing books/author relationships
            await bookDao.removeBookGenreRelationshipsByGenreId(genre_id);

            // create new book-author relationships
            await createGenreBooks(req, res);
        }

        // update genre
        result = await genreDao.updateGenre(genre_name, genre_id);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }

    // end of database transaction;
    // either commit or rollback depending on querySuccess
    if (res.querySuccess) {
        await db.commit();
    } else {
        await db.rollback();
    }
};

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
                res.querySuccess = false;
            } else {
                res.querySuccess = true;
            }
        });
    }
};

/* 
This method updates genre information
*/
exports.createGenre = async (req, res) => {
    let body; // payload of post request
    let genre_name; // new genre name
    let books; // books written by author

    body = req.body;
    genre_name = body.genre_name;
    books = body.books;

    try {
        // start a new database transaction
        await db.beginTransaction();

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

    // end of database transaction;
    // either commit or rollback depending on querySuccess
    if (res.querySuccess) {
        await db.commit();
    } else {
        await db.rollback();
    }
};

/* 
This method deletes a specified genre by id
*/
exports.deleteGenre = async (req, res) => {

    // make sure id provided matches an existing record
    let result = await genreDao.getGenreById(req.params.id);
    if (result.length == 0) {
        res.querySuccess = false;
        return;
    }

    try {
        // start a new database transaction
        await db.beginTransaction();

        // delete the record
        result = await genreDao.deleteGenre(req.params.id);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }

    // end of database transaction;
    // either commit or rollback depending on querySuccess
    if (res.querySuccess) {
        await db.commit();
    } else {
        await db.rollback();
    }
};

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
This method returns the list of all borrowers by search name
*/
exports.getBorrowersLike = async (name, req, res) => {
    try {
        // get all authors
        result = await borrowerDao.getAllBorrowersLike(name);

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

    body = req.body;
    name = body.name;
    address = body.address;
    phone = body.phone;
    cardNo = body.cardNo;

    try {
        // start a new database transaction
        await db.beginTransaction();

        // update the record
        result = await borrowerDao.updateBorrower(name, address, phone, cardNo);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }

    // end of database transaction;
    // either commit or rollback depending on querySuccess
    if (res.querySuccess) {
        await db.commit();
    } else {
        await db.rollback();
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

    body = req.body;
    name = body.name;
    address = body.address;
    phone = body.phone;

    try {
        // start a new database transaction
        await db.beginTransaction();

        // update the record
        const dbObj = await borrowerDao.createBorrower(name, address, phone);
        req.body.cardNo = dbObj.insertId;

        res.querySuccess = true;
        res.queryResults = dbObj;
    } catch (err) {
        res.querySuccess = false;
    }

    // end of database transaction;
    // either commit or rollback depending on querySuccess
    if (res.querySuccess) {
        await db.commit();
    } else {
        await db.rollback();
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
        // start a new database transaction
        await db.beginTransaction();

        // delete the record
        result = await borrowerDao.deleteBorrower(req.params.id);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }

    // end of database transaction;
    // either commit or rollback depending on querySuccess
    if (res.querySuccess) {
        await db.commit();
    } else {
        await db.rollback();
    }
};

/* 
This method returns the list of all library branches
*/
exports.getBranches = async (req, res) => {
    try {
        // get all publishers
        result = await branchDao.getAllBranches();

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
};

/* 
This method returns the list of all library branches by search name
*/
exports.getBranchesLike = async (name, req, res) => {
    try {
        // get all publishers
        result = await branchDao.getAllBranchesLike(name);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
};

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
exports.updateBranch = async (req, res) => {
    let body; // payload of put request
    let branchId; // id of branch to update
    let branchName; // new branch name
    let branchAddress; // new address

    body = req.body;
    branchId = body.branchId;
    branchName = body.branchName;
    branchAddress = body.branchAddress;

    try {
        // start a new database transaction
        await db.beginTransaction();

        // update branch
        result = await branchDao.updateBranch(branchName, branchAddress, branchId);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }

    // end of database transaction;
    // either commit or rollback depending on querySuccess
    if (res.querySuccess) {
        await db.commit();
    } else {
        await db.rollback();
    }
};

/* 
This method creates a new branch
*/
exports.createBranch = async (req, res) => {
    let body; // payload of post request 
    let branchName; // new branch name
    let branchAddress; // new branch address

    body = req.body;
    branchName = body.branchName;
    branchAddress = body.branchAddress;

    try {
        // start a new database transaction
        await db.beginTransaction();

        // create the record
        const dbObj = await branchDao.createBranch(branchName, branchAddress);

        res.querySuccess = true;
        res.queryResults = dbObj;
    } catch (err) {
        res.querySuccess = false;
    }

    // end of database transaction;
    // either commit or rollback depending on querySuccess
    if (res.querySuccess) {
        await db.commit();
    } else {
        await db.rollback();
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
        // start a new database transaction
        await db.beginTransaction();

        // delete the record
        result = await branchDao.deleteBranch(req.params.id);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }

    // end of database transaction;
    // either commit or rollback depending on querySuccess
    if (res.querySuccess) {
        await db.commit();
    } else {
        await db.rollback();
    }
};

/* 
This method returns the list of all overdue book loans
*/
exports.getOverdueBookLoans = async (req, res) => {
    let loan = null; // current loan in for loop

    // holds query results for diffent entity types
    let bookResult = null;
    let branchResult = null;
    let borrowerResult = null;

    try {
        // get all overdue book loans
        let result = await bookLoansDao.getOverdueBookLoans();

        // for each loan, get other info
        for (loan of result) {
            bookResult = await bookDao.getBookById(loan.bookId);
            if (bookResult && bookResult.length > 0) {
                loan.book = bookResult;
            }
            branchResult = await branchDao.getBranchById(loan.branchId);
            if (branchResult && branchResult.length > 0) {
                loan.branch = branchResult;
            }
            borrowerResult = await borrowerDao.getBorrowerById(loan.cardNo);
            if (borrowerResult && borrowerResult.length > 0) {
                loan.borrower = borrowerResult;
            }
        }

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
};

/* 
This method returns the list of all overdue book loans by cardNo
*/
exports.getOverdueBookLoansLike = async (cardNo, req, res) => {
    let loan = null; // current loan in for loop

    // holds query results for diffent entity types
    let bookResult = null;
    let branchResult = null;
    let borrowerResult = null;

    try {
        // get all overdue book loans
        let result = await bookLoansDao.getOverdueBookLoansLike(cardNo);

        // for each loan, get other info
        for (loan of result) {
            bookResult = await bookDao.getBookById(loan.bookId);
            if (bookResult && bookResult.length > 0) {
                loan.book = bookResult;
            }
            branchResult = await branchDao.getBranchById(loan.branchId);
            if (branchResult && branchResult.length > 0) {
                loan.branch = branchResult;
            }
            borrowerResult = await borrowerDao.getBorrowerById(loan.cardNo);
            if (borrowerResult && borrowerResult.length > 0) {
                loan.borrower = borrowerResult;
            }
        }

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }
};

//
// extends book loan due date by 7 days
//
exports.extendLoan = async (req, res) => {

    // look for matching book loan to extend
    let result = await bookLoansDao.findBookLoansById(req.body.loanId);
    if (result.length == 0) {
        res.querySuccess = false;
        return;
    }

    try {
        // start a new database transaction
        await db.beginTransaction();

        // call query to extend overdue book loan by 7 days
        await bookLoansDao.extendOverdueBookLoan(req.body.loanId);

        res.querySuccess = true;
        res.queryResults = result;
    } catch (err) {
        res.querySuccess = false;
    }

    // end of database transaction;
    // either commit or rollback depending on querySuccess
    if (res.querySuccess) {
        await db.commit();
    } else {
        await db.rollback();
    }
};