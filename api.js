const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require("path");
const app = express()
const config = require('./config.js')
const mongoose = require('mongoose')
const routes = require('./routes')

const task = require('./taskSchema')


app.use(bodyParser.json())
//allow react to make requests here
app.use(cors());

// connecting to mongodb here
mongoose.connect(config.database)

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static(path.join(__dirname, "frontend/build/")));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
 });

app.listen(process.env.PORT || 4000, () => console.log('Example app listening on port 4000!'))

app.use('/api', routes)
