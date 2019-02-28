require("./server/config/config");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const flash = require("connect-flash");
const ejs = require("ejs");
const path = require("path");
const { mongoose } = require("./server/db/mongoose");
const passport = require("passport");
const port = process.env.PORT || 80;
const app = express();
let server = http.createServer(app);
const MongoStore = require("connect-mongo")(session);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "server/views")));

app.engine("ejs", ejs.__express);
app.set("views", path.join(__dirname, "server/views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24 * 7,
      autoRemove: "native"
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./server/config/passport_local')(passport)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, auth, Authorization"
  );
  next();
});

const todosAPI = require("./server/routes/todos")();
const userAPI = require("./server/routes/users")();

app.use('/', userAPI);
app.use('/todos', todosAPI);

app.get('/startseed', (req,res) => {
  require("./server/seeds/users")
})

app.get('*', (req, res) => {
    res.status(404).json({ message: 'Wrong GET Direction' });
});

app.post('*', (req, res) => {
    res.status(404).json({ message: 'Wrong POST Direction' });
});

server.listen(port, e => {
  console.log(`Todo is up on port ${port}`);
});