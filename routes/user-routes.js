var express = require('express');

// This gives us access to the user "model".
var model = require('../lib/user');

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

// A list of users who are online:
var online = require('../lib/online').online;

// Provides a login view
router.get('/login', (req, res) => {
  // Grab the session if the user is logged in.
  var user = req.session.user;

  // Redirect to main if session and user is online:
  if (user && online[user.name]) {
    res.redirect('/user/main');
  }
  else {
    // Grab any messages being sent to us from redirect:
    var message = req.flash('login') || '';
    res.render('login', { title   : 'User Login',
                          message : message });
  }
});

// Performs **basic** user authentication.
router.post('/auth', (req, res) => {
  // Grab the session if the user is logged in.
  var user = req.session.user;

  // Redirect to main if session and user is online:
  if (user && online[user]) {
    res.redirect('/user/main');
  }
  else {
    // Pull the values from the form:
    var name = req.body.name;
    var pass = req.body.pass;

    if (!name || !pass) {
      req.flash('login', 'did not provide the proper credentials');
      res.redirect('/user/login');
    }
    else {
      model.lookup(name, pass, function(error, user) {
        if (error) {
          // Pass a message to login:
          req.flash('login', error);
          res.redirect('/user/login');
        }
        else {
          // add the user to the map of online users:
          online[user.name] = user;

          // create a session variable to represent stateful connection
          req.session.user = user;

          // Pass a message to main:
          req.flash('main', 'authentication successful');
          res.redirect('/user/main');
        }
      });
    }
  }
});

//signup route for the login page - not fully implemented,
//needs to add user to in memory db, and sync new user to the server.

// Performs **basic** user authentication.
router.post('/signup', (req, res) => {
  // Grab the session if the user is logged in.
  var user = req.session.user;

  // Redirect to main if session and user is online:
  if (user && online[user]) {
    res.redirect('/user/main');
  }
  else {
    // Pull the values from the form:
    var signupname = req.body.signupname;
    var signuppass = req.body.signuppass;

    if (!signupname || !signuppass) {
      req.flash('login', 'Couldnt sign-up with inputted credentials ');
      res.redirect('/user/login');
    }
    else {
      var userToAdd = { name :signupname, 
                        pass: signuppass, 
                        admin: false };
                        
      model.add(userToAdd, function(error, user) {
        if (error) {
          // Pass a message to login:
          req.flash('login error:', error);
          res.redirect('/user/login');
        }
        else {
          // add the user to the map of online users:
          online[user.name] = user;

          // create a session variable to represent stateful connection
          req.session.user = user;

          // Pass a message to main:
          req.flash('main', 'Sign-up successful, Welcome, start adding tickers to your user profile');
          res.redirect('/user/main');
        }
      });
    }
  }
});






//a post route for ticker additions.
//mirrors the add user route
router.post('/tickeradd', (req, res) => {
  var userSessionObject = req.session.user;
  var formVarsExist = typeof(req.body.tickeradd)!=undefined;
  //2
  if (!userSessionObject) {
    req.flash('login', 'Not logged in');
    res.redirect('/user/login');
  }
  //3
  if (userSessionObject && !online[userSessionObject.name]) {
    req.flash('login', 'Login Expired');
    res.redirect('/user/login')
  }
  //5
  if (userSessionObject && online[userSessionObject.name] && userSessionObject.admin) {
    console.log(req.body);
  }
  //6
  if(formVarsExist){
    model.addStock(req.session.user,req.body.tickeradd,function(error, user) {
      if(error){
        req.flash('list', error);
        res.redirect('/user/user_profile');
      }
      if(!error){
        //console.log("user added:"+user);
        req.flash('user_profile', 'ticker added');
        res.redirect('/user/user_profile');
      }
      
      
      })
  }
});

//ticker removal
router.post('/tickerremove', (req, res) => {
  var userSessionObject = req.session.user;
  var formVarsExist = typeof(req.body.tickerremove)!=undefined;
  //2
  if (!userSessionObject) {
    req.flash('login', 'Not logged in');
    res.redirect('/user/login');
  }
  //3
  if (userSessionObject && !online[userSessionObject.name]) {
    req.flash('login', 'Login Expired');
    res.redirect('/user/login')
  }
  //5
  if (userSessionObject && online[userSessionObject.name] && userSessionObject.admin) {
    console.log(req.body);
  }
  //6
  if(formVarsExist){
    model.removeStock(req.session.user,req.body.tickerremove,function(error, user) {
      if(error){
        req.flash('list', error);
        res.redirect('/user/user_profile');
      }
      if(!error){
        //console.log("user added:"+user);
        req.flash('user_profile', 'ticker removed');
        res.redirect('/user/user_profile');
      }
      
      
      })
  }
});




// Performs logout functionality - it does nothing!
router.get('/logout', function(req, res) {
  // Grab the user session if logged in.
  var user = req.session.user;

  // If the client has a session, but is not online it
  // could mean that the server restarted, so we require
  // a subsequent login.
  if (!user) {
    req.flash('login', 'Not logged in');
    res.redirect('/user/login');
  }
  else if (user && !online[user.name]) {
    delete req.session.user;
  }
  // Otherwise, we delete both.
  /*else if (user) {
    delete online[user.name];
    delete req.session.user;
  }*/
  else{
    delete online[user.name];
    delete req.session.user;
    // Redirect to logout page
    var message = req.flash('logout') || '';
    res.render('logout', {title: 'User Logout'});
  }
});

// Renders the main user view.
router.get('/main', function(req, res) {
  // Grab the user session if it exists:
  var user = req.session.user;

  // If no session, redirect to login.
  if (!user) {
    req.flash('login', 'Not logged in');
    res.redirect('/user/login');
  }
  else if (user && !online[user.name]) {
    req.flash('login', 'Login Expired');
    delete req.session.user;
    res.redirect('/user/login')
  }
  else {
    // capture the user object or create a default.
    var message = req.flash('main') || 'Login Successful';
    res.render('user', { title   : 'User Main',
                         message : message,
                         name    : user.name });
  }
});

// Renders the users that are online.
router.get('/online', function(req, res) {
  // Grab the user session if it exists:
  var user = req.session.user;

  // If no session, redirect to login.
  if (!user) {
    req.flash('login', 'Not logged in');
    res.redirect('/user/login');
  }
  else {
    res.render('online', {
      title : 'Online Users',
      online: online
    });
  }
});

// Renders the users that are online.
router.get('/user_profile', function(req, res) {
  // Grab the user session if it exists:
  var user = req.session.user;

  // If no session, redirect to login.
  if (!user) {
    req.flash('login', 'Not logged in');
    res.redirect('/user/login');
  }
  
  else {
    model.list(function(error,list){ 
      console.log(list);
    var result = list.filter(function( obj ) {
        return obj.name==user.name;
    });
    
    res.render('user_profile', {
      title : 'User Profile',
      sessionuser : user,
      stocks: result[0].stocks
      
      
      
      
    });
    });
  }
  
});

module.exports = router;
