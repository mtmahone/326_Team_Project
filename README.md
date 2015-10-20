
To setup this example:

(1) npm install
(2) npm install --dev
(3) npm install -g mocha
(4) npm install -g jshint

To run the code:

(1) node app.js

To test the logic code:

(1) mocha -u tdd -R spec qa/tests-unit.js

To test browser code go to a route adding the parameter test=1:

http://localhost:3000?test=1
http://localhost:3000/team?test=1

To lint the code:

(1) jshint app.js
(2) jshint lib/team.js