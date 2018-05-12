const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require("path");
const app = express()
const config = require('./config.js')
const mongoose = require('mongoose')
const routes = require('./routes')
const stats = require('./stats')

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

app.use(express.static(path.join("./frontend/build/")));

app.get('/', function(req: any, res: any){
	res.sendFile(path.join('./frontend/build/index.html'));
 });

app.listen(process.env.PORT || 4000, () => console.log('Example app listening on port ' + process.env.PORT))

// for events
app.use('/api', routes)

// for stats
app.use('/api', stats)
