var badgist = require('..');
var expect = require('chai').expect;

describe('Badgist', function() {
  describe('reponame', function() {
    var reponame = require('../lib/reponame');

    it('extracts the username and repo from a GitHub URL', function() {
      var repo = reponame('git+https://github.com/gakimball/badgist.git')

      expect(repo).to.have.keys(['user', 'repo']);
      expect(repo.user).to.equal('gakimball');
      expect(repo.repo).to.equal('badgist');
    });
  });
});