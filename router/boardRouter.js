const express = require('express');
var router = express.Router();
var board = require('../lib/board');

router.get('/type/view', (req, res) => {
    board.typeview(req, res); 
});

router.get('/type/create', (req, res) => {
    board.typeCreate(req, res);
})

router.post('/type/create_process', (req, res) => {
    board.typeCreate_process(req, res);
})

router.get('/type/update/:typeId', (req, res) => {
    board.typeUpdate(req, res);
})

router.post('/type/update_process', (req, res) => {
    board.typeUpdate_process(req, res);
})

router.get('/type/delete/:typeId', (req, res) => {
    board.typeDelete_process(req, res);
})

router.get('/view/:typeId/:pNum', (req, res) => {
    board.view(req, res);
})

router.get('/create/:typeId', (req, res) => {
    board.create(req, res);
})

router.post('/create_process', (req, res) => {
    board.create_process(req, res);
})

module.exports = router;
