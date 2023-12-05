var db = require('./db');
var sanitizedHtml = require('sanitize-html');

module.exports = {
    view: (req, res) => {
        var vu = req.params.vu;
        var sql1 = `SELECT * FROM person;`;

        db.query(sql1, (error, result) => {
            if(error){
                throw error;
            }
            var context = {
                menu: 'menuForManager.ejs',
                who: req.session.name,
                body: 'person.ejs',
                logined: 'YES',
                list: result,
                VU: vu
            }
            req.app.render('home', context, (err, html) => {
                if(err){
                    throw err;
                }
                res.end(html);
            })
        })
    },
    create: (req, res) => {
        var context = {
            menu: 'menuForManager.ejs',
            who: req.session.name,
            body: 'personCU.ejs',
            logined: 'YES',
            CU: 'c'
        }
        req.app.render('home', context, (err, html) => {
            if(err){
                throw err;
            }
            res.end(html);
        })
    },
    create_process: (req, res) => {
        var post = req.body;
        sanitizedLoginId = sanitizedHtml(post.loginId);
        sanitizedLoginid = sanitizedHtml(post.loginid);
        sanitizedPassword = sanitizedHtml(post.password);
        sanitizedName = sanitizedHtml(post.name);
        sanitizedAddress = sanitizedHtml(post.address);
        sanitizedTel = sanitizedHtml(post.tel);
        sanitizedBirth = sanitizedHtml(post.birth);
        sanitizedClass = sanitizedHtml(post.class);
        sanitizedPoint = sanitizedHtml(post.point);
        var sql1 = `INSERT INTO person (loginid, password, name, address, tel, birth, class, point)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

        db.query(sql1, [sanitizedLoginid, sanitizedPassword, sanitizedName, sanitizedAddress, sanitizedTel, sanitizedBirth, sanitizedClass, sanitizedPoint, sanitizedLoginId], (error, result) => {
            if(error){
                throw error;
            }
            res.redirect('/person/view/v');
            res.end();
        })
    },
    update: (req, res) => {
        var loginid = req.params.loginId;
        var sql1 = `SELECT * FROM person WHERE loginid=?;`;

       db.query(sql1, [loginid], (error, result) => {
        if(error){
            throw error;
        }
        var context = {
            menu: 'menuForManager.ejs',
            who: req.session.name,
            body: 'personCU.ejs',
            logined: 'YES',
            CU: 'u',
            person: result
        }
        req.app.render('home', context, (err, html) => {
            if(err){
                throw err;
            }
            res.end(html);
        })
       })
    },
    update_process: (req, res) => {
        var post = req.body;
        sanitizedLoginId = sanitizedHtml(post.loginId);
        sanitizedLoginid = sanitizedHtml(post.loginid);
        sanitizedPassword = sanitizedHtml(post.password);
        sanitizedName = sanitizedHtml(post.name);
        sanitizedAddress = sanitizedHtml(post.address);
        sanitizedTel = sanitizedHtml(post.tel);
        sanitizedBirth = sanitizedHtml(post.birth);
        sanitizedClass = sanitizedHtml(post.class);
        sanitizedPoint = sanitizedHtml(post.point);
        var sql1 = `UPDATE person SET loginid=?, password=?, name=?, address=?, tel=?, birth=?, class=?, point=? WHERE loginid=?;`;

        console.log(post);
        db.query(sql1, [sanitizedLoginid, sanitizedPassword, sanitizedName, sanitizedAddress, sanitizedTel, sanitizedBirth, sanitizedClass, sanitizedPoint, sanitizedLoginId], (error, result) => {
            if(error){
                throw error;
            }
            res.redirect('/person/view/v');
            res.end();
        })
    },
    delete_process: (req, res) => {
        var loginid = req.params.loginId;
        var sql1 = `DELETE FROM person WHERE loginid=?;`;

        db.query(sql1, [loginid], (error, result) => {
            if(error){
                throw error;
            }
            res.redirect('/person/view/v');
            res.end();
        })
    }
}
