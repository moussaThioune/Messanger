const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
global.__basedir = __dirname;
global.baseUrl =  "http://localhost:8080/uploads/";
const socketio = require('socket.io');

const app = express();
const server = require('http').createServer(app);
const io = socketio(server);

module.exports = io;

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

require("./app/routes/api.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


//make socket io accessible for other modules
module.exports.io = io;
