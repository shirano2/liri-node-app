# liri-node-app

https://github.com/the-Coding-Boot-Camp-at-UT/UTAUS201902FSF3-FT/blob/master/01-class-content/10-nodejs/02-Homework/Instructions/homework_instructions.md

search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);

//
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: <your spotify client id>,
  secret: <your spotify client secret>
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});

//
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: <your spotify client id>,
  secret: <your spotify client secret>
});
 
spotify
  .search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });

  //
  var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: <your spotify client id>,
  secret: <your spotify client secret>
});
 
spotify
  .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
  .then(function(data) {
    console.log(data); 
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });

  //
  http://www.omdbapi.com/?apikey=[yourkey]&

  //
  https://rest.bandsintown.com
  /artists/{artistname}/events
  Name	Description
artistname *
string
(path)	
The name of the artist. If it contains one of the special characters below, please be sure to replace it by the corresponding code: for / use %252F, for ? use %253F, for * use %252A, and for " use %27C

app_id *
string
(query)	
The application ID assigned to you by Bandsintown
date
string
(query)	
Can be one of the following values: "upcoming", "past", "all", or a date range e.g. "2015-05-05,2017-05-05". If not specified, only upcoming shows are returned


//
![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)

