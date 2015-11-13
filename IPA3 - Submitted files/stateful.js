var express    = require('express');
var handlebars = require('express-handlebars');

// The body parser is used to parse the body of an HTTP request.
var bodyParser = require('body-parser');

// Require session library.
var session    = require('express-session');

// Require flash library.
var flash      = require('connect-flash');

// The cookie parser is used to parse cookies in an HTTP header.
var cookieParser = require('cookie-parser');

// Morgan for server logging.
var morgan = require('morgan');

// Create the app:
var app = express();

// Set the port number:
app.set('port', 3000);

//// Start Middleware Setup
// Static File Serving:
app.use(express.static(__dirname + '/public'));

// View Engine:
var view = handlebars.create({ defaultLayout: 'main' });
app.engine('handlebars', view.engine);
app.set('view engine', 'handlebars');

// Body Parser:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cookie Parser:
app.use(cookieParser());

// Session Support:
app.use(session({
  secret: 'octocat',
  // Both of the options below are deprecated, but should be false
  // until removed from the library - sometimes, the reality of
  // libraries can be rather annoying!
  saveUninitialized: false, // does not save uninitialized session.
  resave: false             // does not save session if not modified.
}));

// Flash Support.
app.use(flash());

// Morgan Logging Support.
// Using 'conbined' gives you Apache-style logging support.
app.use(morgan('combined'));

//// End Middleware Setup

//// Begin User Routes

// This adds the external router defined routes to the app.
// Note: this includes a prefix to each of those routes.
//       Example: /user/login, /user/logout, ...
app.use('/user', require('./routes/user-routes'));
app.use('/admin', require('./routes/admin-routes'));

app.get('/', (req, res) => {
  res.redirect('/user/login');
});

//// End User Routes

//// Server Startup
app.listen(app.get('port'), () => {
  console.log('Express started on http://localhost:' +
              app.get('port') + '; press Ctrl-C to terminate');
});
