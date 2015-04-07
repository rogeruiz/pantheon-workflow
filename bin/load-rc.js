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
  if (attempts.workingDir.state === 'fulfilled') {
    return attempts.workingDir.value.toString();
  } else if (attempts.homeDir.state === 'fulfilled') {
    return attempts.homeDir.value.toString();
  } else {
    console.error('❯ %s not found', attempts.workingDir.reason.path);
    console.error('❯ %s not found', attempts.homeDir.reason.path);
    console.log('please verify .pantheonrc is installed correctly, and run pw again.');
    return null;
  }
});
