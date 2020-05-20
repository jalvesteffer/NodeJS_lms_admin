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
    if (!authorName || !authorName || !authorName) {
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