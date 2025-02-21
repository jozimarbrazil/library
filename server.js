var logger = require("morgan"),
cors = require("cors"),
dotenv=require("dotenv"),
http = require("http"),
path = require('path'),
express = require("express"),
bodyParser = require("body-parser"),
mongoose = require('mongoose');

var app = express();
var server = http.createServer(app);
var port = 8000;
dotenv.config();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'views')));
app.use(express.urlencoded({extended: true}));
app.use(require('./routes'));


server.listen(process.env.PORT || port, process.env.IP || "0.0.0.0", function(){
    var addr = server.address();
    console.log("Server is listening at ", addr.address + ":" + addr.port);
});

// mongoose.connect('mongodb://localhost/test');
mongoose.connect(process.env.MONGODB_URL);
mongoose.connection.on('error', (err) => { 
    console.log('Mongodb Error: ', err); 
    process.exit();
});
mongoose.connection.on('connected', () => { 
    console.log('MongoDB is successfully connected');
});