require("dotenv").config();
var keys=require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var fs=require("fs");
var moment=require("moment");

var checkString=process.argv[2];
var keyword=process.argv.slice(3).join("+");

var logMessage=new Date().toString();

function log() {
  fs.appendFile("log.txt", logMessage, function(err) {
    if (err) {
      console.log("log recording failed : "+err);
    }
  });  
}

function concert(){
    keyword=process.argv.slice(3).join("+");
    logMessage=logMessage+", command : concert-this, keyword : "+keyword+"\r\n";
    axios.get("https://rest.bandsintown.com/artists/"+keyword+"/events?app_id=codingbootcamp").then(function(response) {
        for(var i=0; i<response.data.length;i++) {
            console.log("============================================================================================================");
            console.log("Name of the venue : "+response.data[i].venue.name);
            console.log("Venue location : "+response.data[i].venue.city+" in "+response.data[i].venue.country);
            console.log("Date of the Event : "+moment(response.data[i].venue.datetime).format("MM/DD/YYYY"));
            console.log("");
            logMessage=logMessage+"============================================================================================================\r\n";
            logMessage=logMessage+"Name of the venue : "+response.data[i].venue.name+"\r\n";
            logMessage=logMessage+"Venue location : "+response.data[i].venue.city+" in "+response.data[i].venue.country+"\r\n";
            logMessage=logMessage+"Date of the Event : "+moment(response.data[i].venue.datetime).format("MM/DD/YYYY")+"\r\n";
            logMessage=logMessage+"\r\n";
        }
        console.log("============================================================================================================");
        logMessage=logMessage+"============================================================================================================\r\n";
        log();
	  })
	  .catch(function(error) {
	    if (error.response) {
	      console.log(error.response.data);
	      console.log(error.response.status);
	      console.log(error.response.headers);
	    } else if (error.request) {
	      console.log(error.request);
	    } else {
	      console.log("There are no concerts : ", error.message);
	    }
	    console.log(error.config);
	  });
}

function spoti() {
  keyword=keyword.split("+").join(" ");
  keyword=keyword.split('"').join("");
  if(keyword=="") {
    keyword="The Sign";
  } 
  logMessage=logMessage+", command : spotify-this-song, keyword : "+keyword+"\r\n";
  var song = {
    "type": "track", 
    "query": keyword
  }
  spotify.search(song, function(err, data) {
    if (err) {
      return console.log('There are no songs : '+err);
    }
    for(var i=0; i<data.tracks.items.length;i++) {
      if(data.tracks.items[i].name.trim().toLowerCase()==keyword.toLowerCase()) {
        console.log("============================================================================================================");
        console.log("Artist(s) : "+data.tracks.items[i].artists[0].name);
        console.log("The song's name : "+data.tracks.items[i].name);
        logMessage=logMessage+"============================================================================================================\r\n";
        logMessage=logMessage+"Artist(s) : "+data.tracks.items[i].artists[0].name+"\r\n";
        logMessage=logMessage+"The song's name : "+data.tracks.items[i].name+"\r\n";

        if(data.tracks.items[i].preview_url!=null) {
          console.log("A preview link of the song from Spotify : "+data.tracks.items[i].preview_url);
          logMessage=logMessage+"A preview link of the song from Spotify : "+data.tracks.items[i].preview_url+"\r\n";
        }
        console.log("The album that the song is from : "+data.tracks.items[i].album.name)
        logMessage=logMessage+"The album that the song is from : "+data.tracks.items[i].album.name+"\r\n";
      }
    }
    console.log("============================================================================================================");
    logMessage=logMessage+"============================================================================================================\r\n";
    log();
  });
}

function movie() {
    if(keyword=="") {
        keyword="Mr.Nobody";
    }
    logMessage=logMessage+", command : movie-this, keyword : "+keyword+"\r\n";
    axios.get("http://www.omdbapi.com/?t="+keyword+"&y=&plot=short&apikey=trilogy").then(function(response) {
        console.log("============================================================================================================");
        console.log("Title of the movie : "+response.data.Title);
        console.log("Year the movie came out : "+response.data.Year);
        console.log("IMDB Rating of the movie : "+response.data.imdbRating);
        logMessage=logMessage+"============================================================================================================\r\n";
        logMessage=logMessage+"Title of the movie : "+response.data.Title+"\r\n";
        logMessage=logMessage+"Year the movie came out : "+response.data.Year+"\r\n";
        logMessage=logMessage+"IMDB Rating of the movie : "+response.data.imdbRating+"\r\n";
        for(var i=0; i<response.data.Ratings.length; i++) {
            if(response.data.Ratings[i].Source=="Rotten Tomatoes") {
                console.log("Rotten Tomatoes Rating of the movie : "+response.data.Ratings[i].Value);
                logMessage=logMessage+"Rotten Tomatoes Rating of the movie : "+response.data.Ratings[i].Value+"\r\n";
            }
        }
        console.log("Country where the movie was produced : "+response.data.Country);
        console.log("Language of the movie : "+response.data.Language);
        console.log("Plot of the movie : "+response.data.Plot);
        console.log("Actors in the movie : "+response.data.Actors);
        console.log("============================================================================================================");
        logMessage=logMessage+"Country where the movie was produced : "+response.data.Country+"\r\n";
        logMessage=logMessage+"Language of the movie : "+response.data.Language+"\r\n";
        logMessage=logMessage+"Plot of the movie : "+response.data.Plot+"\r\n";
        logMessage=logMessage+"Actors in the movie : "+response.data.Actors+"\r\n";
        logMessage=logMessage+"============================================================================================================\r\n";
        log();
      })
      .catch(function(error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("There are no movies : "+error.message);
        }
        console.log(error.config);
	  });
}

function doWhat(){
  fs.readFile("random.txt","utf8",function(error,data) {
      if(error) {
          return console.log("I can't do anything : "+error);
      }
      checkString=data.split(",")[0];
      keyword=data.split(",")[1];
      main(); 
  });
}

function main() {
    if(checkString=="concert-this") {
        concert();
    } else if (checkString=="spotify-this-song") {
        spoti();
    } else if (checkString=="movie-this") {
        movie();
    } else if (checkString=="do-what-it-says") {
        doWhat();
    } else {
        console.log("Error! There is no command!!");
        return;
    }
}

main();