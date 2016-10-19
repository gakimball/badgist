module.exports = function(repo) {
  var pattern = new RegExp('.com/(.*)/(.*)');
  var matches = repo.match(pattern);

  return {
    user: matches[1],
    repo: matches[2].replace('.git', '')
  }
}