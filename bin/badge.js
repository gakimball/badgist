#!/usr/bin/env node

var badgist = require('..');
var fs = require('fs');
var path = require('path');
var reponame = require('./lib/repoName');
var writeReadme = require('./lib/writeReadme');
var yaml = require('js-yaml').safeLoad;
var yargs = require('yargs');

var badge = yargs.argv._[0];
var BADGES = yaml(fs.readFileSync(path.join(__dirname, '../badges.yml')));
var PACKAGE;
var output;

if (badge === 'list') {
  console.log('Available badges:\n');
  console.log(Object.keys(BADGES).join('\n'));
  console.log('\n');
  process.exit(0);
}

if (typeof BADGES[badge] === 'undefined') {
  console.log('"' + badge + '" is not an available badge. Run "badge list" to see the full list.');
  process.exit(0);
}

try {
  PACKAGE = require(path.join(process.cwd(), 'package.json'));
}
catch (e) {
  console.log('No package.json was found in the current folder.');
  process.exit(0);
}

// [TODO] Move this logic into badges.yml
switch BADGES[badge] {
  case 'npm':
    output = format(BADGES[badge], [PACKAGE.name]);
    break;

  case 'bower':
    var BOWER;
    try {
      BOWER = require(path.join(process.cwd(), 'bower.json'));
    }
    catch (e) {
      console.log('No bower.json was found in the current folder.');
      process.exit(0);
    }
    output = format(BADGES[badge], [BOWER.name]);
    break;

  default:
    var REPO = reponame(PACKAGE.repository.url);
    output = format(BADGES[badge], [REPO.name, REPO.repo]);
}

writeReadme(output);
