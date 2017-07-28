console.log('The bot is starting');

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

//var params = { 
//    q: 'brisbane', 
//    count: 3 
//};
//
//T.get('search/tweets', params, gotData);
//
//function gotData(err, data, response) {
//    var tweets = data.statuses;
//    for (var i = 0; i < tweets.length; i++) {
//        console.log(tweets[i].text);
//    }
//};


var stream = T.stream('user')

stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg) {
//    var fs = require('fs');
//    var json = JSON.stringify(eventMsg,null,2);
//    fs.writeFile("tweet.json",json);
    
    var replyto = eventMsg.in_reply_to_screen_name;
    var text = eventMsg.text;
    var from = eventMsg.user.screen_name;
    
    console.log(replyto + ' ' + from);
    
    var r = Math.floor(Math.random()*100);
    
    if (replyto === 'mattskelley') {
        var newtweet = from + ' this is an auto generated message! Her is a random number ' + r;
        tweetIt(newtweet);
    }
}

//function followed(event) {
//    var name = event.source.name;
//    var screenName = event.source.screen_name;
//    tweetIt('@' + screenName + ' thanks for following. Do you like rainbows?');
//}

//tweetIt(); // Explicitely call tweetIt once, so we dont have to wait
//setInterval(tweetIt, 1000*20);

function tweetIt(txt) {
    
    var tweet = { 
        status: txt
    }

    T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
        if (err) {
            console.log("Something went wrong!");
        } else {
            console.log("It Worked!");
        }
    }
}