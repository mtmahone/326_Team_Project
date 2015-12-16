##UMass Stock Analyzer

Team Swallow presents the UMass Stock Analyzer

After cloning the repository, do npm install to install package.json dependencies

##Overview

This application is intended for the at home investor who is looking to maximize returns by buying quality equities that
 have been marked with a seal of approval from various stock reviewing entities. Rather than search these sources
 manually, our aggregation of various content will ensure the biases of single reviewers will be diminished in an
 overall review, ensuring our users get the best quality information to make investment decisions.

##How To Run

 1. To clone repo: `git clone https://github.com/mtmahone/326_Team_Project.git`
 2. Execute using: `node app.js` from the root of the project or using the provided run script `./runscript.sh`
 3. Use username `admin` with password `nimad` to get access to the application

##Libraries

 1. archiver
  * Link to library: [Archiver library](https://github.com/archiverjs/node-archiver)
 2. body-parser
  * Link to library: [Body Parser library](https://github.com/expressjs/body-parser)
 3. connect-flash
  * Link to library: [Connect Flash library](https://github.com/jaredhanson/connect-flash)
 4. cookie-parser
  * Link to library: [Cookie Parser library](https://github.com/expressjs/cookie-parser)
 5. express
  * Link to library: [Express library](https://github.com/strongloop/express)
 6. express-handlebars
  * Link to library: [Express Handlebars library](https://github.com/ericf/express-handlebars)
 7. express-session
  * Link to library: [Express Sessions library](https://github.com/expressjs/session)
 8. fs-extra
  * Link to library: [File system, Extra library](https://github.com/jprichardson/node-fs-extra)
 9. morgan
  * Link to library: [Morgan library](https://github.com/expressjs/morgan)


##Views

 1. admin -> contributed by: Senh Wang
  * This admin view provides a list of users that the admin can edit, as well as adding a new user to the database.
   (https://github.com/mtmahone/326_Team_Project/blob/master/views/user-list.handlebars)
 2. homepage -> contributed by: Qiwen Wang
  * The homepage displays the user's stock information.
   (https://github.com/mtmahone/326_Team_Project/blob/master/views/layouts/main.handlebars)
 3. user_profile -> contributed by: Christopher Afonso
  * Displays the user's username and profile image, as well as allowing them to add a watchlist item.
   (https://github.com/mtmahone/326_Team_Project/blob/master/views/user_profile.handlebars)
 4. login -> contributed by: Matthew Mahoney
   * The login view is where users can either register for an account or sign in to our application.
    (https://github.com/mtmahone/326_Team_Project/blob/master/views/login.handlebars)
 5. logout -> contributed by: Charlie Wongwajarachot
   * The logout view is where users will go to after successfully logging out.
    (https://github.com/mtmahone/326_Team_Project/blob/master/views/logout.handlebars)

##Statefulness

 1. What we're persisting across sessions
  * The application keeps track of the state of the user, such as their name, whether they are online, or if they're an
  admin. All the data needed to maintain statefulness is found in
  (https://github.com/mtmahone/326_Team_Project/blob/master/lib/user.js), which is then used by
  (https://github.com/mtmahone/326_Team_Project/blob/master/routes/user-routes.js) and
  (https://github.com/mtmahone/326_Team_Project/blob/master/routes/admin-routes.js)

 2. Relevant Files
  * (https://github.com/mtmahone/326_Team_Project/blob/master/lib/user.js)
  * (https://github.com/mtmahone/326_Team_Project/blob/master/routes/user-routes.js)
  * (https://github.com/mtmahone/326_Team_Project/blob/master/routes/admin-routes.js)

##Persistence

 1. We'll be using databases to persist user attributes across sessions
  * The database stores information related to a user's account (name, password, image, admin, stocks). All the data
  that must be stored can be found in (https://github.com/mtmahone/326_Team_Project/blob/master/lib/user.js). The relevant library
  for interacting with the MongoDB Database is the Mongoose library which allows for CRUD operations on our database.
2. For read-only access to our database, please use mongo tools with URI: mongo ds055574.mongolab.com:55574/freedb -u <dbuser> -p <dbpassword>
using user instructor and pass instructor, the relevant collection is the users collection. Listing users in the database can be done using
db.users.find() from the mongo console.

##Video Presentations:

1. Project presentation:   https://youtu.be/5VwRU8Fm8OY

2. Source code tutorial:   https://youtu.be/6kLa8ac4ebQ

3. Application Demo:       https://youtu.be/qomAYXiPlnA

##Final Project Document:

https://docs.google.com/document/d/1pNbxASCpRZQgX1L3b6d6I44MeUkqnVtMSrMgQXc6do0/edit#heading=h.5bddxp96cwn
