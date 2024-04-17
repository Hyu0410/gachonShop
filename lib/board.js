var db = require('./db');
var sanitizeHtml = require('sanitize-html');

// var template = require('');

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
    },
    view: (req, res) => {
        var typeId = req.params.typeId;
        var pNum = req.params.pNum;
        var sql1 = `SELECT * FROM boardtype;`;
        var sql2 = `SELECT * FROM board WHERE type_id=?;`;
        var sql3 = `SELECT * FROM boardtype WHERE type_id=?;`;

        db.query(sql1, (error, boardtypes) => {
            if(error){
                throw error;
            }
            db.query(sql2, [typeId], (error2, result) => {
                if(error2){
                    throw error2;
                }
                db.query(sql3, [typeId], (error3, boardtype) => {
                    if(error3){
                        throw error3;
                    }
                    if(req.session.class === '00'){
                        var context = {
                            menu: 'menuForMIS.ejs',
                            who: req.session.name,
                            body: 'board.ejs',
                            logined: 'YES',
                            boardtype: boardtypes,
                            list: result,
                            bt: boardtype,
                            v: 'N',
                            c: req.session.class
                        }
                    }
                    else if(req.session.class === '01'){
                        var context = {
                            menu: 'menuForManager.ejs',
                            who: req.session.name,
                            body: 'board.ejs',
                            logined: 'YES',
                            boardtype: boardtypes,
                            list: result,
                            bt: boardtype,
                            v: 'Y',
                            c: req.session.class
                        }
                    }
                    else if(req.session.class === '02'){
                        var context = {
                            menu: 'menuForCustomer.ejs',
                            who: req.session.name,
                            body: 'board.ejs',
                            logined: 'YES',
                            boardtype: boardtypes,
                            list: result,
                            bt: boardtype,
                            c: req.session.class,
                            v: 'Y'
                        }
                    }
                    else{
                        var context = {
                            menu: 'menuForCustomer.ejs',
                            who: '손님',
                            body: 'board.ejs',
                            logined: 'NO',
                            boardtype: boardtypes,
                            list: result,
                            bt: boardtype,
                            v: 'N',
                            c: req.session.class
                        }
                    }
                    req.app.render('home', context, (err, html) => {
                        if(err){
                            throw err;
                        }
                        res.end(html);
                    })
                })
            })
        })
    },
    create: (req, res) => {
        var typeId = req.params.typeId;

        var sql1 = `SELECT * FROM boardtype;`;
        var sql2 = `SELECT * FROM boardtype WHERE type_id=?;`;
        
        db.query(sql1, (error, boardtypes) => {
            if(error){
                throw error;
            }
            db.query(sql2, [typeId], (error2, result) => {
                if(error2){
                    throw(error2);
                }
                if(req.session.class === '00'){
                    res.write("<script>alert('ERROR 403: FORBIDDEN')</script>");
                    res.write("<script>window.location=\"/shop/all\"</script>");
                }
                else if(req.session.class === '01'){
                    var context = {
                        menu: 'menuForManager.ejs',
                        who: req.session.name,
                        body: 'boardCRU.ejs',
                        logined: 'YES',
                        boardtype: boardtypes,
                        btname: result,
                        loginid: req.session.loginid,
                        CRU: 'c'
                    }
                }
                else if(req.session.class === '02'){
                    if(result[0].write_YN === 'Y'){
                        var context = {
                            menu: 'menuForCustomer.ejs',
                            who: req.session.name,
                            body: 'boardCRU.ejs',
                            logined: 'YES',
                            boardtype: boardtypes,
                            btname: result,
                            loginid: req.session.loginid,
                            CRU: 'c'
                        }
                    }
                    else{
                        res.write("<script>alert('ERROR 403: FORBIDDEN')</script>");
                        res.write("<script>window.location=\"/shop/all\"</script>");
                    }
                }
                else{
                    res.write("<script>alert('ERROR 403: FORBIDDEN')</script>");
                    res.write("<script>window.location=\"/shop/all\"</script>");
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
    create_process: (req, res) => {
        var post = req.body;

        var sql1 = `INSERT INTO board (type_id, p_id, loginid, password, title, date, content)
            VALUES (?, 0, ?, ?, ?, , ?);`;
    }
}

