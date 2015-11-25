##UMass Stock Analyzer

Team Swallow presents the UMass Stock Analyzer

After cloning the repository, do npm install to install package.json dependencies

##Overview

This application is intended for the at home investor who is looking to maximize returns by buying quality equities that have been marked with a seal of approval from various stock reviewing entities. Rather than search these sources manually, our aggregation of various content will ensure the biases of single reviewers will be diminished in an overall review, ensuring our users get the best quality information to make investment decisions.

##How To Run

 1. To clone repo: `git clone https://github.com/mtmahone/326_Team_Project.git`
 2. Execute using: `node app.js` from the root of the project or using the provided run script `./runscript.sh`

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
    The logout view is where users will go to after successfully loging out.
    (https://github.com/mtmahone/326_Team_Project/blob/master/views/logout.handlebars)

##Statefulness

 1. What we're persisting across sessions
  * (add items here)

 2. Relevant Files
  *we will maintain user attributes with user.js

##Persistence

 1. We'll be using databases to persist user attributes across sessions
  *(maybe watchlist items)
