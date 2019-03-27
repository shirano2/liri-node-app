require("dotenv").config();
var keys=require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var fs=require("fs");
var moment=require("moment");

var checkString=process.argv[2];
var keyword=process.argv.splice(3).join("+");

function concert(){
    axios.get("https://rest.bandsintown.com/artists/" + keyword + "/events?app_id=codingbootcamp").then(function(response) {
        //console.log(response.data);
        for(var i=0; i<response.data.length;i++) {
            console.log("============================================================================================================")
            console.log("Num. "+(i+1))
            console.log(response.data[i].venue.name);
            console.log(response.data[i].venue.city+" in "+response.data[i].venue.country);
            console.log(moment(response.data[i].venue.datetime).format("MM/DD/YYYY"));
            console.log("");
        }
	  })
	  .catch(function(error) {
	    if (error.response) {
	      console.log(error.response.data);
	      console.log(error.response.status);
	      console.log(error.response.headers);
	    } else if (error.request) {
	      console.log(error.request);
	    } else {
	      console.log("Error", error.message);
	    }
	    console.log(error.config);
	  });
}

function movie() {
    if(keyword=="") {
        keyword="Mr.Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + keyword + "&y=&plot=short&apikey=trilogy").then(function(response) {
        // console.log(response.data);
        console.log("Title of the movie: " +response.data.Title);
        console.log("Year the movie came out: " +response.data.Year);
        console.log("IMDB Rating of the movie: " +response.data.imdbRating);
        for(var i=0; i<response.data.Ratings.length; i++) {
            if(response.data.Ratings[i].Source=="Rotten Tomatoes") {
                console.log("Rotten Tomatoes Rating of the movie: "+response.data.Ratings[i].Value);
            }
        }
        console.log("Country where the movie was produced: " +response.data.Country);
        console.log("Language of the movie: " +response.data.Language);
        console.log("Plot of the movie: " +response.data.Plot);
        console.log("Actors in the movie: " +response.data.Actors);
      })
      .catch(function(error) {
	    if (error.response) {
	      console.log(error.response.data);
	      console.log(error.response.status);
	      console.log(error.response.headers);
	    } else if (error.request) {
	      console.log(error.request);
	    } else {
	      console.log("Error", error.message);
	    }
	    console.log(error.config);
	  });
}

function main() {
    if(checkString=="concert-this") {
        concert();
    } else if (checkString=="spotify-this-song") {
      spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log(data[0]);
      })
    } else if (checkString=="movie-this") {
        movie();
    } else if (checkString=="do-what-it-says") {
        fs.readFile("random.txt","utf8",function(error,data) {
            console.log(data);
            if(error) {
                return console.log(error);
            }
            checkString=data.split(",")[0];
            keyword=data.split(",")[1];
            main(); 
        });
    } else {
        console.log("Error!");
        return;
    }
}

main();


// concert-this

// spotify-this-song

// movie-this

// do-what-it-says
// if()