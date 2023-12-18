var sanitizedHtml = require('sanitize-html');
var db = require('./db');

module.exports = {
    view: (req, res) => {
        var _vu = req.params.vu;
        var sql1 = `SELECT * FROM boardtype;`;
        var sql2 = `SELECT * FROM code_tbl;`;

        db.query(sql1, (error, boardtypes) => {
            if(error){
                throw error;
            }
            db.query(sql2, (error2, result) => {
                if(error2){
                    throw error2;
                }
                var context = {
                    menu: 'menuForManager.ejs',
                    who: req.session.name,
                    body: 'code.ejs',
                    logined: 'YES',
                    boardtype: boardtypes,
                    list: result,
                    VU: _vu
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
    create: (req, res) => {
        var sql1 = `SELECT * FROM boardtype;`;

        db.query(sql1, (error, boardtypes) => {
            if(error){
                throw error;
            }
            var context = {
                menu: 'menuForManager.ejs',
                who: req.session.name,
                body: 'codeCU.ejs',
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
    create_process: (req, res) => {
        var post = req.body;
        sanitizedMain_id = sanitizedHtml(post.main_id);
        sanitizedSub_id = sanitizedHtml(post.sub_id);
        sanitizedMain_name = sanitizedHtml(post.main_name);
        sanitizedSub_name = sanitizedHtml(post.sub_name);
        sanitizedStart = sanitizedHtml(post.start);
        sanitizedEnd = sanitizedHtml(post.end);

        var sql1 = `INSERT INTO code_tbl (main_id, sub_id, main_name, sub_name, start, end)
                    VALUES (?, ?, ?, ?, ?, ?);`;

        db.query(sql1, [sanitizedMain_id, sanitizedSub_id, sanitizedMain_name, sanitizedSub_name, sanitizedStart, sanitizedEnd], (error, result) => {
            if(error){
                throw error;
            }
            res.redirect('/code/view/v');
            res.end();
        })
    },
    update: (req, res) => {
        var main_id = req.params.main;
        var sub_id = req.params.sub;
        var sql1 = `SELECT * FROM boardtype;`;
        var sql1 = `SELECT * FROM code_tbl WHERE main_id=? AND sub_id=?;`;

        db.query(sql1, (error, boardtypes) => {
            if(error){
                throw error;
            }
            db.query(sql2, [main_id, sub_id], (error, result) => {
                if(error){
                    throw error;
                }
                var context = {
                    menu: 'menuForManager.ejs',
                    who: req.session.name,
                    body: 'codeCU.ejs',
                    logined: 'YES',
                    boardtype: boardtypes,
                    code: result,
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
    update_process: (req, res) => {
        var post = req.body;
        sanitizedMainId = sanitizedHtml(post.mainId);
        sanitizedSubId = sanitizedHtml(post.subId);

        sanitizedMain_id = sanitizedHtml(post.main_id);
        sanitizedMain_name = sanitizedHtml(post.main_name);
        sanitizedSub_id = sanitizedHtml(post.sub_id);
        sanitizedSub_name = sanitizedHtml(post.sub_name);
        sanitizedStart = sanitizedHtml(post.start);
        sanitizedEnd = sanitizedHtml(post.end);
        var sql1 = `UPDATE code_tbl SET main_id=?, main_name=?, sub_id=?, sub_name=?, start=?, end=? WHERE main_id=? AND sub_id=?;`;

        db.query(sql1, [sanitizedMain_id, sanitizedMain_name, sanitizedSub_id, sanitizedSub_name, sanitizedStart, sanitizedEnd, sanitizedMainId, sanitizedSubId], (error, result) => {
            if(error){
                throw error;
            }
            res.redirect('/code/view/v');
            res.end();
        })
    },
    delete_process: (req, res) => {
        var main_id = req.params.main;
        var sub_id = req.params.sub;
        var sql1 = `DELETE FROM code_tbl WHERE main_id=? AND sub_id=?;`;

        db.query(sql1, [main_id, sub_id], (error, result) => {
            if(error){
                throw error;
            }
            res.redirect('/code/view/v');
            res.end();
        })
    }
}
