var db = require('./db');
var sanitizeHtml = require('sanitize-html');

module.exports = {
    typeview: (req, res) => {
        var sql1 = `SELECT * FROM boardtype;`;

        db.query(sql1, (error, boardtypes) => {
            if(error){
                throw error;
            }
            var context = {
                menu: 'menuForManager.ejs',
                who: req.session.name,
                body: 'boardtype.ejs',
                logined: 'YES',
                boardtype: boardtypes,
                list: boardtypes
            }
            req.app.render('home', context, (err, html) => {
                if(err){
                    throw err;
                }
                res.end(html);
            })
        })
    },
    typeCreate: (req, res) => {
        var sql1 = `SELECT * FROM boardtype;`;

        db.query(sql1, (error, boardtypes) => {
            if(error){
                throw error;
            }
            var context = {
                menu: 'menuForManager.ejs',
                who: req.session.name,
                body: 'boardtypeCU.ejs',
                logined: 'YES',
                boardtype: boardtypes,
                CU: 'c'
            }
            req.app.render('home', context, (err, html) => {
                if(err){
                    throw err;
                }
                res.end(html);
            })
        })
    },
    typeCreate_process: (req, res) => {
        var post = req.body;
        sanitizedTitle = sanitizeHtml(post.title);
        sanitizedDescription = sanitizeHtml(post.description);
        sanitizedWrite_YN = sanitizeHtml(post.write_YN);
        sanitizedRe_YN = sanitizeHtml(post.re_YN);
        sanitizedNumPerPage = sanitizeHtml(post.numPerPage);
        var sql1 = `INSERT INTO boardtype (title, description, write_YN, re_YN, numPerPage)
                    VALUES (?, ?, ?, ?, ?);`;

        db.query(sql1, [sanitizedTitle, sanitizedDescription, sanitizedWrite_YN, sanitizedRe_YN, sanitizedNumPerPage], (error, result) => {
            if(error){
                throw error;
            }
            res.redirect('/board/type/view');
            res.end();
        })
    },
    typeUpdate: (req, res) => {
        var typeId = req.params.typeId;
        var sql1 = `SELECT * FROM boardtype;`;
        var sql2 = `SELECT * FROM boardtype WHERE type_id=?;`;

        db.query(sql1, (error, boardtypes) => {
            if(error){
                throw error;
            }
            db.query(sql2, [typeId], (error2, result) => {
                if(error2){
                    throw error2;
                }
                var context = {
                    menu: 'menuForManager.ejs',
                    who: req.session.name,
                    body: 'boardtypeCU.ejs',
                    logined: 'YES',
                    boardtype: boardtypes,
                    list: result,
                    CU: 'u'
                }
                req.app.render('home', context, (err, html) => {
                    if(err){
                        throw err;
                    }
                    res.end(html);
                })
            })
        })
    },
    typeUpdate_process: (req, res) => {
        var post = req.body;
        sanitizedTitle = sanitizeHtml(post.title);
        sanitizedDescription = sanitizeHtml(post.description);
        sanitizedWrite_YN = sanitizeHtml(post.write_YN);
        sanitizedRe_YN = sanitizeHtml(post.re_YN);
        sanitizedNumPerPage = sanitizeHtml(post.numPerPage);
        sanitizedType_id = sanitizeHtml(post.type_id);
        var sql1 = `UPDATE boardtype SET title=?, description=?, write_YN=?, re_YN=?, numPerPage=? WHERE type_id=?;`;

        db.query(sql1, [sanitizedTitle, sanitizedDescription, sanitizedWrite_YN, sanitizedRe_YN, sanitizedNumPerPage, sanitizedType_id], (error, result) => {
            if(error){
                throw error;
            }
            res.redirect('/board/type/view');
            res.end();
        })
    },
    typeDelete_process: (req, res) => {
        var typeId = req.params.typeId;
        var sql1 = `DELETE FROM boardtype WHERE type_id=?;`;

        db.query(sql1, [typeId], (error, result) => {
            if(error){
                throw error;
            }
            res.redirect('/board/type/view');
            res.end();
        })
    }
}
