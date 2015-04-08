var fs = require('fs');
var RSVP = require('rsvp');

var loadRc = {
  homeDir: new RSVP.Promise(function(resolve, reject) {
    fs.readFile('$HOME/.pantheonrc', function(error, projects) {
      if (error) {
        reject(error);
      }
      resolve(projects);
    });
  }),
  workingDir: new RSVP.Promise(function(resolve, reject) {
    // TODO: Resolve this to the project root, not where the command was run from.
    // Not sure how to do this, though. Yet.
    fs.readFile('./.pantheonrc', function(error, projects) {
      if (error) {
        reject(error);
      }
      resolve(projects);
    });
  })
};

module.exports = RSVP.hashSettled(loadRc).then(function(attempts) {
  var projects;
  if (attempts.workingDir.state === 'fulfilled') {
    projects = attempts.workingDir.value.toString();
  } else if (attempts.homeDir.state === 'fulfilled') {
    projects = attempts.homeDir.value.toString();
  } else {
    console.error('❯ %s not found', attempts.workingDir.reason.path);
    console.error('❯ %s not found', attempts.homeDir.reason.path);
    console.log('please verify .pantheonrc is installed correctly, and run pw again.');
    process.exit(1);
  }

  try {
    return JSON.parse(projects);
  } catch (e) {
    if (/error/i.test(e)) {
      console.error('Error parsing JSON!');
      console.log('please verify .pantheonrc is installed correctly, and run pw again.');
    }
  }

});
