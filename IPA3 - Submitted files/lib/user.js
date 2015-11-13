// A library for representing a user "model".

// Represents the next user ID:
var nextUID = 0;

// A function for creating "users".
function user(name, pass, admin) {
  return {
    name: name,
    pass: pass,
    uid : ++nextUID,
    admin : admin
  };
}

// This is an in-memory mock database until we look at a real one!
var db = {
  'tim'  : user('tim', 'mit', true),
  'hazel': user('hazel', 'lezah', false),
  'caleb': user('caleb', 'belac', false)
};

// Returns a user object if the user exists in the db.
// The callback signature is cb(error, userobj), where error is
// undefined if there is no error or a string indicating the error
// that occurred.
exports.lookup = (usr, pass, cb) => {
  if (usr in db) {
    var u = db[usr];
    if (pass == u.pass) {
      cb(undefined, { name: u.name, admin: u.admin });
    }
    else {
      cb('password is invalid');
    }
  }
  else {
    cb('user "' + usr + '" does not exist')
  }
};

exports.list = (cb) => {
  // TODO: Add the list functionality.
  // The list function receives a callback with the following signature:
  //
  //   cb(error, array of users)
  //
  // An error (string) is given if there was a problem accessing the list of
  // users. In this case, we are using a mock database - so, there are
  // no errors that we will encounter. If we use a real database it is
  // possible that we might have trouble connecting to the database.
  // For this reason, we provide the necessary "hook" for when a
  // database is added in the future.
  //
  // The array of users is an array that is a copy of all the current
  // users in our system. You should make sure that you copy each
  // user object in the `db` object and add it to the list of users
  // that is returned by the callback.
  //
  // You will be graded on the following:
  //   (1) You correctly copy each of the user objects.
  //   (2) You correctly invoke the callback with the proper results.
  //
  var listOfUsers = [];
  for (var userInDataB in db) {
    listOfUsers.push(db[userInDataB]);
  }
  console.log("callback reached, heres the definition");
  console.log(cb);
  console.log(typeof(cb));
  //THIS IS WHERE YOU NEED TO RESUME, THE CALLBACK HERE IS NOT BEING CORRECTLY
  //USED OR RECEIVED FROM THE ROUTE, FIGURE THIS SOON.
  
  
  cb("no error", listOfUsers);
};

exports.add = (u, cb) => {
  // TODO: Add the add new user functionality.
  // The add function receives two arguments. The first, `u`, is an
  // object with user data. It has the following format:
  //
  //   { name, pass, admin }
  //
  // The `name` is the name of the user (string), the `pass` is the
  // password (string), and the `admin` is a boolean (true/false).
  //
  // The callback `cb` has the following signature:
  //
  //   cb(error, newuser)
  //
  // The `error` (string) indicates if there was a problem. This would
  // indicate if there was a problem accessing the database - but, we
  // are not using a real database in this assignment. However, we should
  // not allow users with duplicate names. So, you will need to check
  // to make sure that you are given a user name that does not already
  // exist in our mock database.
  //
  // If the user has a unique user name then you need to create the
  // new user using the `user` function defined above. You must then
  // copy the generated uid from the new user to the `u` object
  // provided as an argument to this `add` function. Don't forget to
  // add the new user to the mock database.
  //
  // If everything is successful, you should invoke the callback with
  // an undefined for the error and the original `u` that was provided.
  //
  // Why do we not simply return the user object returned from the
  // `user` function? Think about this one.
  //
  // You will be graded on the following:
  //   (1) You correctly determine if the user already exists.
  //   (2) You send a sensible error message to the callback.
  //   (3) You correctly create a new user.
  //   (4) You correctly add the new user to the database.
  //   (5) You correctly copy the UID to the `u` argument.
  //   (6) You correctly call the callback with the correct user information.
  //
  var userAlreadyExistsFlag = false;
  for (var userInDB in db) {
    userAlreadyExistsFlag = (db[userInDB].name==u.name);
    if (userAlreadyExistsFlag==true){
      //user already exists
      cb("already exists",u);
      break;
    }
  }
  
  var tempuser = user(u.name, u.pass, u.admin); //WHY DOES THIS NOT WORK???
  //youve determined user existence up to this point. 
  //if the user exists, the bool is true
  if(!userAlreadyExistsFlag){
    //generate a uid for the user with the tempuser object
    var tempuser = user(u.name, u.pass, u.admin);
    u.uid = tempuser.uid;
  }
  
  //add tempuser to db
  db[tempuser.name] = tempuser;
  //everything worked
  cb(undefined,u);
  
};