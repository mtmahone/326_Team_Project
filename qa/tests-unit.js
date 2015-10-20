//
// You can run this test from the command line as:
//
// mocha -u tdd -R spec qa/tests-unit.js
//
var expect = require('chai').expect;

suite('The lib/team.js tests', () => {

	test('lib/team.js library should exist', () => {
		var team = require('../lib/team.js');
		// We do not need any assertions as this will fail if the library
		// file does not exist.
	});

	test('team#all function should exist', () => {
		var team = require('../lib/team.js');
		expect(team.all).not.equals(undefined);
		expect(team.all.constructor).equals(Function);
	});

	test('team#one function should exist', () => {
		var team = require('../lib/team.js');
		expect(team.one).not.equals(undefined);
		expect(team.one.constructor).equals(Function);
	});

	test('team#all() should return an object', () => {
		var team = require('../lib/team.js');
		expect(team.all()).to.be.an('object');
	});

	test('team#all() should return a result object', () => {
		var team = require('../lib/team.js');
		var result = team.all();
		expect(result).to.have.property('success');
		expect(result).to.have.property('message');
		expect(result).to.have.property('data');
		expect(result).to.have.property('count');
	});

	test('team#all() should be successful', () => {
		var team = require('../lib/team.js');
		var result = team.all();
		expect(result.success).to.be.true;
	});

	test('team#all() should have success message', () => {
		var team = require('../lib/team.js');
		var result = team.all();
		expect(result.message).to.equal('team members');
	});

	test('team#all() should have a data property as an array', () => {
		var team = require('../lib/team.js');
		var result = team.all();
		expect(result.data.constructor).to.equal(Array);
	});

	test('team#members() should have a data array with length > 0', () => {
		var team = require('../lib/team.js');
		expect(team.all().data.length > 0).to.be.true;
	});

	test('team#all() should have a copy of the data array', () => {
		var team = require('../lib/team.js');
		var members1 = team.all();
		var length = members1.data.length;
		members1.data.push('fake');
		var members2 = team.all();
		expect(members2.data.length).to.equal(length);
	});

	test('team#all() should contain copies of members', () => {
		var team = require('../lib/team.js');
		var result = team.all();
		expect(result.count > 0).to.be.true;
		var member = result.data[0];
		member.user = 'FAKE!!!';
		var result2 = team.all();
		var member2 = result2.data[0];
		expect(member2.user).to.not.equal('FAKE!!!');
	});

	test('A team member object should have the correct format', () => {
		var team = require('../lib/team.js');
		var members = team.all().data;
		members.forEach((member) => {
			expect(member).to.have.property('user');
			expect(member).to.have.property('fname');
			expect(member).to.have.property('lname');
			expect(member).to.have.property('year');
		});
	});

	test('team#one("bad") should return a failed result', () => {
		var team = require('../lib/team.js');
		expect(team.one('bad').success).to.be.false;
	});

	test('team#one should return a copy of member object', () => {
		var team = require('../lib/team.js');
		var result = team.one('jdoe');
		expect(result.success).to.be.true;
		result.data[0].user = 'FAKE!!!';
		var result2 = team.one('jdoe');
		expect(result2.data[0].user).to.not.equal('FAKE!!!');
	});

});