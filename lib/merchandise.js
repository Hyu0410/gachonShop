var db = require('./db');
var sanitizedHtml = require('sanitize-html');

module.exports = {
    view: (req, res) => {
        var _vu = req.params.vu;
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
                var context = {
                    menu: 'menuForManager.ejs',
                    who: req.session.name,
                    body: 'merchandise.ejs',
                    logined: 'YES',
                    boardtype: boardtypes,
                    VU: _vu,
                    list: result
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
                    body: 'merchandiseCU.ejs',
                    logined: 'YES',
                    boardtype: boardtypes,
                    list: result,
                    CU: 'c'
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
    create_process: (req, res, file) => {
        var post = req.body;
        sanitizedCategory = sanitizedHtml(post.category);
        sanitizedName = sanitizedHtml(post.name);
        sanitizedPrice = sanitizedHtml(post.price);
        sanitizedStock = sanitizedHtml(post.stock);
        sanitizedBrand = sanitizedHtml(post.brand);
        sanitizedSupplier = sanitizedHtml(post.supplier);
        sanitizedImage = sanitizedHtml(file);
        snaitizedSale_yn = sanitizedHtml(post.sale_yn);
        sanitizedSale_price = sanitizedHtml(post.sale_price);
        var sql1 = `INSERT INTO merchandise (category, name, price, stock, brand, supplier, image, sale_yn, sale_price)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

        db.query(sql1, [sanitizedCategory, sanitizedName, sanitizedPrice, sanitizedStock, sanitizedBrand, sanitizedSupplier, sanitizedImage, snaitizedSale_yn, sanitizedSale_price], (error, result) => {
            if(error){
                throw error;
            }
            res.redirect('/merchandise/view/v');
            res.end();
        })
    },
    update: (req, res) => {
        var merId = req.params.merId;
        var sql1 = `SELECT * FROM boardtype;`;
        var sql2 = `SELECT * FROM code_tbl;`;
        var sql3 = `SELECT * FROM merchandise WHERE mer_id=?;`;

        db.query(sql1, (error, boardtypes) => {
            if(error){
                throw error;
            }
            db.query(sql2, (error2, results) => {
                if(error2){
                    throw error2;
                }
                db.query(sql3, [merId], (error3, result) => {
                    if(error3){
                        throw error3;
                    }
                    var context = {
                        menu: 'menuForManager.ejs',
                        who: req.session.name,
                        body: 'merchandiseCU.ejs',
                        logined: 'YES',
                        boardtype: boardtypes,
                        list: results,
                        merchandise: result,
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
        })
    },
    update_process: (req, res, file) => {
        var post = req.body;
        var sql1 = `UPDATE merchandise SET category=?, name=?, price=?, stock=?, brand=?, supplier=?, image=?, sale_yn=?, sale_price=? WHERE mer_id=?;`;

        sanitizedMerId = sanitizedHtml(post.mer_id);
        sanitizedCategory = sanitizedHtml(post.category);
        sanitizedName = sanitizedHtml(post.name);
        sanitizedPrice = sanitizedHtml(post.price);
        sanitizedStock = sanitizedHtml(post.stock);
        sanitizedBrand = sanitizedHtml(post.brand);
        sanitizedSupplier = sanitizedHtml(post.supplier);
        exchangeImage = sanitizedHtml(file);
        sanitizedSale_yn = sanitizedHtml(post.sale_yn);
        sanitizedSale_price = sanitizedHtml(post.sale_price);

        sanitizedImage = exchangeImage;
        if(exchangeImage === 'No'){
            sanitizedImage = sanitizedHtml(post.image);
        }

        db.query(sql1, [sanitizedCategory, sanitizedName, sanitizedPrice, sanitizedStock, sanitizedBrand, sanitizedSupplier, sanitizedImage, sanitizedSale_yn, sanitizedSale_price, sanitizedMerId], (error, result) => {
            if(error){
                throw error;
            }
            res.redirect('/');
            res.end();
        })
    },
    delete_process: (req, res) => {
        var merId = req.params.merId;
        var sql1 = `DELETE FROM merchandise WHERE mer_id=?;`;

        db.query(sql1, [merId], (error, result) => {
            if(error){
                throw error;
            }
            res.redirect('/');
            res.end();
        })
    }
}
