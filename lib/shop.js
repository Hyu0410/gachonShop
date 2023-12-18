var db = require('./db');

module.exports = {
    all: (req, res) => {
        var sql1 = `SELECT * FROM boardtype;`;
        var sql2 = `SELECT * FROM merchandise;`;

        db.query(sql1, (error, boardtypes) => {
            if(error){
                throw error;
            }
            db.query(sql2, (error2, result) => {
                if(error2){
                    throw error2;
                }
                if(req.session.class === '00'){
                    var context = {
                        menu: 'menuForMIS.ejs',
                        who: req.session.name,
                        body: 'merchandise.ejs',
                        logined: 'YES',
                        boardtype: boardtypes,
                        list: result,
                        VU: 'v'
                    }
                }
                else if(req.session.class === '01'){
                    var context = {
                        menu: 'menuForManager.ejs',
                        who: req.session.name,
                        body: 'merchandise.ejs',
                        logined: 'YES',
                        boardtype: boardtypes,
                        list: result,
                        VU: 'v'
                    }
                }
                else if(req.session.class === '02'){
                    var context = {
                        menu: 'menuForCustomer.ejs',
                        who: req.session.name,
                        body: 'merchandise.ejs',
                        logined: 'YES',
                        boardtype: boardtypes,
                        list: result,
                        VU: 'v'
                    }
                }
                else{
                    var context = {
                        menu: 'menuForCustomer.ejs',
                        who: '손님',
                        body: 'merchandise.ejs',
                        logined: 'NO',
                        boardtype: boardtypes,
                        list: result,
                        VU: 'v'
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
    }
}
