var db = require('./db');

module.exports = {
    home: (req, res) => {
        if(req.session.class === '00'){
            var context = {
                menu: 'menuForCustomer.ejs',
                who: req.session.name,
                body: 'items.ejs',
                logined: true
            }
        }
        else if(req.session.class === '01'){
            var context = {
                menu: 'menuForCustomer.ejs',
                who: req.session.name,
                body: 'items.ejs',
                logined: true
            }
        }
        else if(req.session.class === '02'){
            var context = {
                menu: 'menuForCustomer.ejs',
                who: req.session.name,
                body: 'items.ejs',
                logined: true
            }
        }
        else {
            var context = {
                menu: 'menuForCustomer.ejs',
                who: '손님',
                body: 'items.ejs',
                logined: false
            }
        }
        req.app.render('home', context, (err, html) => {
            if(err){
                throw err;
            }
            res.end(html);
        })
    }
}
