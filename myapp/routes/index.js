var express = require('express');
var router = express.Router();

// default route
router.get('/', function (req, res, next) {
    return res.send({ error: true, message: 'hello' })
});

//Retrieve all user
router.get('/users', function (req, res, next) {
    var mysqlConnection = req.db
    mysqlConnection.query("SET character_set_results=utf8");
    // mysqlConnection.query("SELECT vn,hn,DATE_FORMAT(vstdate, '%d/%m/%Y')vstdate,vsttime,main_dep,oqueue,main_dep_queue FROM ovst WHERE vstdate = '2019-07-30'" ,function (err, rows, fields) {
    
    //Query form Current date 
    mysqlConnection.query("SELECT vn,hn,DATE_FORMAT(vstdate, '%d/%m/%Y')vstdate,vsttime,main_dep,oqueue,main_dep_queue FROM ovst WHERE vstdate = CURDATE()", function (err, rows, fields) {    
        if (err) throw err;
        else
            res.send(rows);
    });
});

// Restrive user with vn 
router.get('/users/:id', function (req, res, next) {
    let vncode_id = req.params.id;
    if (!vncode_id) {
        return res.status(400).send({ err: true, message: 'Please provide vncode_id' });
    }
    var mysqlConnection = req.db
    mysqlConnection.query("SET character_set_results=utf8");
    // mysqlConnection.query("SELECT vn,hn,DATE_FORMAT(vstdate, '%d/%m/%Y')vstdate,vsttime,main_dep,oqueue,main_dep_queue FROM ovst WHERE vstdate = '2019-07-30' AND vn=?",vncode_id ,function (err, rows, fields) {
    
    //Query form Current date 
    mysqlConnection.query("SELECT vn,hn,vstdate,DATE_FORMAT(vstdate, '%d/%m/%Y')vstdate,vsttime,main_dep,oqueue,main_dep_queue FROM ovst WHERE vstdate = CURDATE() AND vn=?", vncode_id, function (err, rows, fields) {
        
        if (err) throw err;
        else
            res.send(rows);
    });
});

router.get('/main_dep', function (req, res, next) {
    var mysqlConnection = req.db
    mysqlConnection.query("SET character_set_results=utf8");
    mysqlConnection.query("SELECT depcode,department FROM kskdepartment ORDER by depcode", function (err, rows, fields) {
        if (err) throw err;
        else
            res.send(rows);
    });
});

router.get('/main_dep/:id', function (req, res, next) {
    let depcode_id = req.params.id;
    if (!depcode_id) {
        return res.status(400).send({ err: true, message: 'Please provide depcode_id' });
    }
    var mysqlConnection = req.db
    mysqlConnection.query("SET character_set_results=utf8");
    mysqlConnection.query("SELECT depcode,department FROM kskdepartment WHERE depcode =? ", depcode_id, function (err, rows, fields) {
        if (err) throw err;
        else
            res.send(rows);
    });
});

module.exports = router;
