// This requires the necessary libraries for the webapp.
// (1) express - this provides the express web framework
// (2) handlebars - this provides the handlebars templating framework
var express    = require('express');
var handlebars = require('express-handlebars');

//////////////////////////////////////////////////////////////////////
///// Express App Setup //////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// The express library is a simple function. When you invoke this
// function it returns an express web application that you build from.
var app = express();

// This will set an "application variable". An application variable is
// a variable that can be retrieved from your app later on. It is
// simply a key/value mapping. In this case, we are mapping the key
// 'port' to a port number. The port number will either be what you
// set for PORT as an environment variable (google this if you do not
// know what an evironment variable is) or port 3000.
app.set('port', process.env.PORT || 3000);

// This does the setup for handlebars. It first creates a new
// handlebars object giving it the default layout. This indicates
// that the default layout is called main.js in the views/layouts
// directory. We then set the app's view engine to 'handlebars' - this
// lets your express app know what the view engine is. We then set an
// app variable 'view engine' to 'handlebars'. This is mostly boiler
// plate so you need not worry about the details.
var view = handlebars.create({ defaultLayout: 'main' });
app.engine('handlebars', view.engine);
app.set('view engine', 'handlebars');

// This does the setup for static file serving. It uses express'
// static middleware to look for files in /public if no other route
// matches. We use the __dirname special variable which indicates the
// directory this server is running in and append it to '/public'.
app.use(express.static(__dirname + '/public'));

// The `testmw` function represents out testing middleware. We use
// this in our views to conditionally include the Mocha and Chai
// testing framework as well as our own tests. Because this is a
// middleware function it expects to receive the request object
// (`req`), response object (`res`), and `next` function as arguments.
// The `next` function is used to continue processing the request
// with subsequent routes.
function testmw(req, res, next) {
  // This checks the 'env' application variable to determine if we are
  // in "production" mode. An application is in "production" mode if
  // it is actually deployed. This can be set by the NODE_ENV
  // environment variable. It also checks to see if the request has
  // given a `test` querystring parameter, such as
  // http://localhost:3000/about?test=1. If the route has that set
  // then showTests will be set to a "truthy" value. We can then
  // use that in our handlebars views to conditionally include tests.
  res.locals.showTests = app.get('env') !== 'production' &&
                         req.query.test;
  // Passes the request to the next route handler.
  next();
}

// This adds our testing middleware to the express app.
app.use(testmw);

//////////////////////////////////////////////////////////////////////
///// User Defined Routes ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
var team = require('./lib/team.js');

app.get('/', (req, res) => {
  // TODO
  var result = team.all();
  if (!result.success) {
    notFound404(req, res);
  } else {
    res.render('team', {
      members: result.data,
      pageTestScript: '/qa/tests-team.js'
    });
  }
});

app.get('/about',(req,res)=>{
   res.sendFile(__dirname + '/public/html/about.html')
});

app.get('/team/jdoe', (req, res) => {
  // TODO
  var result = team.one('jdoe');
  if (!result.success) {
    notFound404(req, res);
  } else {
    res.render('team', {
      members: result.data,
      pageTestScript: '/qa/tests-team.js'
    });
  }
});

app.get('/team/qwang', (req, res) => {
  // TODO
  var result = team.one('qwang');
if (!result.success) {
  notFound404(req, res);
} else {
  res.render('team', {
    members: result.data,
    pageTestScript: '/qa/tests-team.js'
  });
}
});

app.get('/team/cwongwajarachot', (req, res) => {
  // TODO
  var result = team.one('cwongwajarachot');
if (!result.success) {
  notFound404(req, res);
} else {
  res.render('team', {
    members: result.data,
    pageTestScript: '/qa/tests-team.js'
  });
}
});

app.get('/team/swang', (req, res) => {
  // TODO
  var result = team.one('swang');
if (!result.success) {
  notFound404(req, res);
} else {
  res.render('team', {
    members: result.data,
    pageTestScript: '/qa/tests-team.js'
  });
}
});

app.get('/team/cafonso', (req, res) => {
  // TODO
  var result = team.one('cafonso');
if (!result.success) {
  notFound404(req, res);
} else {
  res.render('team', {
    members: result.data,
    pageTestScript: '/qa/tests-team.js'
  });
}
});

app.get('/team/mmahoney', (req, res) => {
  // TODO
  var result = team.one('mmahoney');
if (!result.success) {
  notFound404(req, res);
} else {
  res.render('team', {
    members: result.data,
    pageTestScript: '/qa/tests-team.js'
  });
}
});


//////////////////////////////////////////////////////////////////////
///// Error Middleware ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// A middleware function that will be invoked if no other route path
// has been matched. HTTP 404 indicates that the resource was not
// found. We set the HTTP status code in the response object to 404.
// We then render our views/404.handlebars view back to the client.
function notFound404(req, res) {
  res.status(404);
  res.render('404');
}

// A middleware function that will be invoked if there is an internal
// server error (HTTP 500). An internal server error indicates that
// a serious problem occurred in the server. When there is a serious
// problem in the server an additional `err` parameter is given. In
// our implementation here we print the stack trace of the error, set
// the response status code to 500, and render our
// views/500.handlebars view back to the client.
function internalServerError500(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
}

// This adds the two middleware functions as the last two middleware
// functions. Because they are at the end they will only be invoked if
// no other route defined above does not match.
app.use(notFound404);
app.use(internalServerError500);

//////////////////////////////////////////////////////////////////////
//// Application Startup /////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// Starts the express application up on the port specified by the
// application variable 'port' (which was set above). The second
// parameter is a function that gets invoked after the application is
// up and running.
app.listen(app.get('port'), () => {
  console.log('Express started on http://localhost:' +
              app.get('port') + '; press Ctrl-C to terminate');
});

