// A library for representing a user "model".

//modify this for database

// Represents the next user ID:
var nextUID = 0;

/*Edits needed for TPA3:
have users with relevant properties
use mongo for persistence

*/


// A function for creating "users".
function user(name, pass, image, admin, stocks) {
  return {
    name: name,
    pass: pass,
    uid : ++nextUID,
    admin : admin,
    stocks: stocks
  };
}


//mongoose implementation for storing and retrieving to database BEGIN
//initialize mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://root:toor@ds055574.mongolab.com:55574/freedb');
var database = mongoose.connection;
//var User = {}; //initilizes the user model, for access outside of db.once.
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function (callback) {
//callback is called when successful connection occurs.

}); //end db..once
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  pass: String,
  uid: Number,
  admin: Boolean,
  stocks: [String]
}, {collection : 'users'});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
//module.exports = User;

//Temporary testing of db
/*
var tempuser = new User({ name: 'temp', pass: 'pmet', uid: nextUID, admin:true, stocks:['BMY']});
console.log(tempuser.name); // should print temp.

tempuser.save(function (err, tempuser) {
  if (err) return console.error(err);
  console.log("save to db of:"+tempuser+" = success!");
});*/

//for displaying all users BEGIN
/*
User.find(function (err, users) {
  if (err) return console.error(err);
  console.log(users); //logs the collection of users.
})
*/
//for displaying all users END



//to reset user collection: 
/*
User.remove({},function(err){
//handle error.
console.log(err);
console.log('error line above if there is one, if none, users succesfully cleared.')
});*/





//Temporary testing of db

//mongoose implementation for storing and retrieving to database END

/*
Easiest way to work with mongoose may be to load into db(array) at start, and perform mods as
admin progresses.

*/
// This is an in-memory mock database until we look at a real one!
var db = {
  'matt'  : user('matt', 'ttam', "", true, []),
  'chris': user('chris', 'sirhc', "", true, ['AAPL','BMY']),
  'admin': user('admin', 'nimad', "", true, ['AAPL','BMY']),
  'qiwen': user('qiwen', 'newiq', "", true, []),
  'charlie': user('charlie', 'eilrahc', "", true, []),
  'senh': user('senh', 'hnes', "", true, [])
};



//This function will load whatever exists in the mock database into the MongoDB database,
//once loaded for the first time, database documents will only update with a call to this function
//This function is meant to sync changes from our easily malleable db(array) with the database on 
//mongolabs. Once we implement user removal functionality, this will synchronize those changes as well.
//READ THIS^^^
 //This hasn't been finished at this point.
function SyncDB(databaseArrayToSync){
  //this for ensures everything in db array makes it to mongolabs
  for(var i in databaseArrayToSync){
    var userToSync = new User({ name: databaseArrayToSync[i].name, 
                                pass: databaseArrayToSync[i].pass, 
                                uid: databaseArrayToSync[i].uid, 
                                admin: databaseArrayToSync[i].admin, 
                                stocks: databaseArrayToSync[i].stocks});
                                
    console.log(userToSync); // should print userobject

    userToSync.save(function (err, userToSync) {
      if (err) return console.error(err);
       console.log("save to db of:"+userToSync.name+" = success!");
      });
  } //end upload
  //start download mongoDB into Array.
  User.find(function (err, users) {
    if (err) return console.error(err);
    for(var j in users){
      //think like this: 'matt'  : user('matt', 'ttam', "", true, []),
      db[users[j].name] = user(users[j].name,users[j].pass,users[j].uid,users[j].admin,users[j].stocks);
    /*
      console.log("From queried array");
      console.log("Name: "+users[i].name);
      console.log("Pass: "+users[i].pass);
      console.log("UID: "+users[i].uid);
      console.log("Admin?: "+users[i].admin);
      console.log("Stocks Array: "+users[i].stocks);
      */
    }
    //console.log("Logging users from query: "+users); //logs the collection of users.
  })

  
}
SyncDB(db);
//Trying to sync outside of syncdb method.

console.log("Database after sync: "+Object.keys(db));

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
  
  
  cb(undefined, listOfUsers);
};

exports.addStock = (u, stock, cb) => {
  if(u && stock){
    console.log("User:"+u.name);
    console.log("Stock:"+stock);
  db[u.name].stocks.push(stock);}
  
  cb(undefined,u);
  
  
}

exports.removeStock = (u, stock, cb) => {
  if(u && stock){
    console.log("User:"+u.name);
    console.log("Stock:"+stock);
    var index = db[u.name].stocks.indexOf(stock);
    if(index>-1){
       db[u.name].stocks.splice(index, 1);
    }
  
  cb(undefined,u);
  
  
}
}

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
  /*
  The following block concerning existence can be resolved with a query
  via mongoose.
  
  */
  var userAlreadyExistsFlag = false;
  for (var userInDB in db) {
    userAlreadyExistsFlag = (db[userInDB].name==u.name);
    if (userAlreadyExistsFlag==true){
      //user already exists
      cb("already exists",u);
      break;
    }
  }
  
  //var tempuser = user(u.name, u.pass, u.image, u.admin, u.stocks); //WHY DOES THIS NOT WORK???
  //youve determined user existence up to this point. 
  //if the user exists, the bool is true
  if(!userAlreadyExistsFlag){
    //generate a uid for the user with the tempuser object
    var tempuser = user(u.name, u.pass, u.image, u.admin, u.stocks);
    u.uid = tempuser.uid;
  }
  /*
  
  For the adding of a user to the database, you need to have mongoose
  schema update calls here.
  
  
  */
  
  //add tempuser to db
  db[tempuser.name] = tempuser;
  console.log("stored tempuser to db"+tempuser);
  console.log("database state"+db);
  //everything worked
  cb(undefined,u);
  
};