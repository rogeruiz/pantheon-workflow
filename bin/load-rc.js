var fs = require( 'fs' );
var RSVP = require( 'rsvp' );
var path = require( 'path' );

var helpfulErrorMessage = 'Please verify that the .pantheonrc file is installed correctly';

var loadRc = {
  homeDir: new RSVP.Promise( function( resolve, reject ) {
    var homeDir = path.join( process.env.HOME, '.pantheonrc' );
    fs.readFile( homeDir, function(error, projects) {
      if ( error ) {
        reject( error );
      }
      resolve( projects );
    });
  }),
  workingDir: new RSVP.Promise( function( resolve, reject ) {
    // TODO: Resolve this to the project root, not where the command was run from.
    // Not sure how to do this, though. Yet.
    // var workingDir = path.join('', '.pantheonrc');
    fs.readFile( './.pantheonrc', function( error, projects ) {
      if ( error ) {
        reject( error );
      }
      resolve( projects );
    } );
  } )
};

module.exports = RSVP.hashSettled(loadRc).then(function(attempts) {
  var projects;
  if ( 'fulfilled' === attempts.workingDir.state ) {
    projects = attempts.workingDir.value.toString();
  } else if ( 'fulfilled' === attempts.homeDir.state ) {
    projects = attempts.homeDir.value.toString();
  } else {
    console.error( '❯ %s not found', attempts.workingDir.reason.path );
    console.error( '❯ %s not found', attempts.homeDir.reason.path );
    console.log( helpfulErrorMessage );
    process.exit( 1 );
  }

  try {
    return JSON.parse( projects );
  } catch (e) {
    if (/error/i.test(e)) {
      console.error( 'Error parsing JSON!' );
      console.log( helpfulErrorMessage );
    }
  }

});
