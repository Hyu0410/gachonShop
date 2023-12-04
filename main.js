const express = require('express');
const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var rootRouter = require('./router/rootRouter');
var authRouter = require('./router/authRouter');
var merchandiseRouter = require('./router/merchandiseRouter');
var codeRouter = require('./router/codeRouter');

// 세션 모듈
var session = require('express-session');
var MySqlStore = require('express-mysql-session')(session);
var options = {
    host: 'localhost',
    user: 'nodejs',
    password: 'nodejs',
    database: 'webdb2023'
};
var sessionStore = new MySqlStore(options);

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));

// body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// 정적 파일 폴더 지정
app.use(express.static('public'));

app.use('/', rootRouter);
app.use('/auth', authRouter);
app.use('/merchandise', merchandiseRouter);
app.use('/code', codeRouter);

app.listen(3000, () => console.log('3000!'));
