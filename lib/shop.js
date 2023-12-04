var db = require('./db');

module.exports = {
    home: (req, res) => {
        var sql1 = `SELECT * FROM merchandise;`;
        db.query(sql1, (error, result) => {
            if(error){
                throw error;
            }
            if(req.session.class === '00'){
                var context = {
                    menu: 'menuForMIS.ejs',
                    who: req.session.name,
                    body: 'merchandise.ejs',
                    logined: 'YES',
                    list: result,
                    VU: ''
                }
            }
            else if(req.session.class === '01'){
                var context = {
                    menu: 'menuForManager.ejs',
                    who: req.session.name,
                    body: 'merchandise.ejs',
                    logined: 'YES',
                    list: result,
                    VU: ''
                }
            }
            else if(req.session.class === '02'){
                var context = {
                    menu: 'menuForCustomer.ejs',
                    who: req.session.name,
                    body: 'merchandise.ejs',
                    logined: 'YES',
                    list: result,
                    VU: ''
                }
            }
            else {
                var context = {
                    menu: 'menuForCustomer.ejs',
                    who: '손님',
                    body: 'merchandise.ejs',
                    logined: 'NO',
                    list: result,
                    VU: ''
                }
            }
            req.app.render('home', context, (err, html) => {
                if(err){
                    throw err;
                }
                res.end(html);
            })
        })
    }
}
