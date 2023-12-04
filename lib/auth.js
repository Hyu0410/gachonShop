var db = require('./db');
var sanitizedHtml = require('sanitize-html');

module.exports = {
    login: (req, res) => {
        var context = {
            menu: 'menuForCustomer.ejs',
            who: '손님',
            body: 'login.ejs',
            logined: 'NO'
        }
        req.app.render('home', context, (err, html) => {
            if(err){
                throw err;
            }
            res.end(html);
        })
    },
    login_process: (req, res) => {
        var post = req.body;
        sanitizedLoginid = sanitizedHtml(post.id);
        sanitizedPassword = sanitizedHtml(post.pwd);
        var sql1 = `SELECT COUNT(*) AS num FROM person WHERE loginid=? AND password=?;`;
        var sql2 = `SELECT name, class FROM person WHERE loginid=? AND password=?;`;

        db.query(sql1, [sanitizedLoginid, sanitizedPassword], (error, results) => {
            if(error){
                throw error;
            }
            if(results[0].num === 1){
                db.query(sql2, [sanitizedLoginid, sanitizedPassword], (error2, result) => {
                    if(error2){
                        throw error2;
                    }
                    req.session.name = result[0].name;
                    req.session.class = result[0].class;
                    res.redirect('/');
                })
            }
            else{
                req.session.is_logined = false;
                req.session.name = '손님';
                req.session.class = '99';
                res.end(`<script type='text/javascript'>alert("ID or password is wrong")
                        <!--
                        setTimeout("location.href='http://localhost:3000/'", 1000);
                        //-->
                        </script>`);
            }
        })
    },
    logout_process: (req, res) => {
        req.session.destroy((err) => {
            res.redirect('/');
        })
    }
}
