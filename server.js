const express = require('express');
const mysql = require('mysql')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const routes = require('./routes')
const session = require('express-session');
const app = express();
const bodyParser=require("body-parser");
const MySQLStore = require('express-mysql-session')(session);
const PORT = process.env.PORT || 3030;

const corsOptions = {
    origin: [`http://localhost:3000`,"https://www.top250songs.com","http://www.top250songs.com/"],
    credentials: true, // allows the session cookie to be sent back and forth from server to client
    optionsSuccessStatus: 200 // some legacy browsers choke on status 204
}
// app.use(cors({origin : "http://localhost:3000"}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

            // Logging with Morgan
app.use(morgan('tiny'))
  

var options = {
    host: 'sql3.freemysqlhosting.net',
    port: 3306,
    user: 'sql3356294',
    password: 'nqPNE9N36r',
    database: 'sql3356294',
};
 


const con = mysql.createConnection(options);

var sessionStore = new MySQLStore(options);

app.use(session({
    key: 'top250',
    secret: 'verysecret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // cookie will expire in 1 week
    }
}));



con.connect();

global.db = con;

// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
 



app.set('port', process.env.PORT || 8080);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.get('/', (req, res) => {
    res.send('<h1>Testing</h1>')
})

app.use('/api/v1/auth', routes.auth)

app.use('/api/v1/', routes.api)


app.listen(PORT,()=> {
    console.log(`Server is running at localhost:${PORT}`)
})