/* 
This method deletes a specified branch by id
*/
exports.deleteBranch = (async function (req, res) {

    // make sure id provided matches an existing record
    let result = await branchDao.getBranchById(req.params.id);
    if (result.length == 0) {
        res.status(404);
        res.send('ID provided does not match any existing records');
        return;
    }

    // delete the record
    branchDao.deleteBranch(req.params.id, function (err, result) {
        // error with query
        if (err) {
            res.status(400);
            res.send('Delete Failed!');
        }
        // delete successful
        else {
            res.status(204);
            res.send('Delete Successful!');
        }
    });
});