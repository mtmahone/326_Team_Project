var express = require('express');

// This gives us access to the user "model".
var model = require('../lib/user');

// A list of users who are online:
var online = require('../lib/online').online;

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

router.get('/list', (req, res) => {
  // TODO: Add the admin list route.
  // The admin list route lists the current users in the system and
  // provides a form to add a new user. You must make sure you do
  // the following in this route:
  //
  //   (1) Grab the user session object.
  //   (2) Test that the user session object exists. If not, a redirect
  //       back to the login view is necessary with a proper flash message.
  //   (3) Test if the user session exists and they are not online. If
  //       the user session exists and they are not online it means the
  //       server has been restarted and their session has expired. If
  //       this is the case you will need to redirect back to login with
  //       a proper flash message (e.g., login expired).
  //   (4) Test is the user is an admin. If they are not you need to
  //       redirect back to main with a proper flash message - indicate
  //       that the user needs admin credentials to access this route.
  //   (5) If the user is logged in, is online, and is an admin then
  //       you want to retrieve the list of users from the `lib/user.js`
  //       library and render the `user-list` view. The `user-list` view
  //       expects an array of users and a message. You should grab the
  //       flash message - if one exists, and pass it to the view template.
  //       A flash message will exist if the user tried to create a new
  //       user that already exists in our mock database.
  //
  //  You will be graded on each of the above items.

  //Start doing this stuff here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  var userObject = req.session.user;
  
  if (!userObject) {
    req.flash('login', 'Not logged in');
    res.redirect('/user/login');
  }
  
  /*
  //this isn't working correctly.
  console.log(userObject.name);
  console.log('what follows this is comparison of the two names first is session')
  console.log(userObject.name);
  console.log(online[userObject.name].name);
  console.log('what preceeds this is comparison of the two names second is pull db')
  */
  
  //var userOnlineFlag = false; //temp
  
  if(userObject && (online[userObject.name]==undefined)){ //add in once you know. double check this.  
    //if user sess object and exists in online db
    console.log(userObject);
    console.log(online);
    console.log("This is where the online determine happens");
    req.flash('login', 'login expired');
    res.redirect('/user/login');
  }
  
  console.log(userObject.admin); //logs admin bool
  if(!userObject.admin){ //not admin
    console.log('we hit the admin false condition');
    req.flash('main', 'user needs admin credentials to access this route');
    res.redirect('/user/main');
  }
  
  //if user online /logged in /admin, retrieve list of users from user.js instance,
  //pass along the list to the render of user-list, passing a message from a flash.
  //message only happens on failed user add because of pre-existing in db from userlist.
  if(userObject && (online[userObject.name]!=undefined) && userObject.admin){
    console.log('we hit the login condition, the online, and admin');
    model.list(function(error, userList) {
    var message = req.flash('list') || 'user already exists in db';
    res.render('user-list', {
      users : userList,
      message: message
    });
    }); //THIS IS  THE MODEL CALL FIXXXXXXX THTISISISISISISS... seems maybe fixed.
  }


  //stop here
  // Replace below with your own implementation.
  //req.flash('main', '/admin/list is not implemented!');
  //res.redirect('/user/main');
});

router.post('/user', (req, res) => {
  // TODO: Implement the /user route.
  // This route is similar to the /user/auth route in that it does not
  // have an associated view. Rather, its job is to add a new user and
  // redirect to /admin/list. Its job is to add a new user if the user
  // does not already exist in our model. You must make sure you do
  // the following in this route:
  //
  //   (1) Grab the user session object.
  //   (2) Test that the user session object exists. If not, a redirect
  //       back to the login view is necessary with a proper flash message.
  //   (3) Test if the user session exists and they are not online. If
  //       the user session exists and they are not online it means the
  //       server has been restarted and their session has expired. If
  //       this is the case you will need to redirect back to login with
  //       a proper flash message (e.g., login expired).
  //   (4) Test is the user is an admin. If they are not you need to
  //       redirect back to main with a proper flash message - indicate
  //       that the user needs admin credentials to access this route.
  //   (5) If the user is logged in, they are online, and they are an
  //       admin then you need to grab the form variables from the
  //       `req.body` object. Test to make sure they all exist. If they
  //       do not then you need to redirect back to the `/list` route
  //       defined above with a proper flash message.
  //   (6) If you have received the proper form variables then you must
  //       create a new user using the `model.add` function. If an error
  //       message is returned in the callback you should flash that message
  //       to the `list` route above passing it the error message returned
  //       from the `model.add` function and redirect to `list`.
  //       Otherwise, you should flash to `list` that the user has
  //       been added and redirect back to the `list` route.
  //
  //  You will be graded on each of the above items.

  // Replace below with your implementation.
  //req.flash('main', '/admin/user is not implemented!');
  //res.redirect('/user/main');
  //1
  var userSessionObject = req.session.user;
  var formVarsExist = false;
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
  //4
  if (userSessionObject && online[userSessionObject.name] && !userSessionObject.admin) {
    req.flash('main', 'user needs admin credentials to access this route');
    res.redirect('/user/main');
  }
  //5
  if (userSessionObject && online[userSessionObject.name] && userSessionObject.admin) {
    console.log(req.body);
    var name = req.body.name;
    var pass = req.body.pass;
    var admin = req.body.admin;
    formVarsExist = name && pass && admin;

    if (!formVarsExist) {
      req.flash('list', 'did not provide the proper credentials');
      res.redirect('/admin/list');
    }
  }
  //6
  if(formVarsExist){
    var userToAdd = {
      name : req.body.name,
      pass : req.body.pass,
      admin : (req.body.admin == "yes") ? true : false //this assignment should keep the true and false stuff right
    }
    model.add(userToAdd,function(error, user) {
      if(error){
        req.flash('list', error);
        res.redirect('/admin/list');
      }
      if(!error){
        req.flash('list', 'user has been added');
        res.redirect('/admin/list');
      }
      
      
      })
  }

  
});

module.exports = router;