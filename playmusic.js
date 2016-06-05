var PlayMusic = require("playmusic");
var pm = new PlayMusic();

var StreamPlayer = require('stream-player');
var player = new StreamPlayer();

var auth = JSON.parse(process.env.PLAY_MUSIC);
console.log(auth);
console.log(auth.androidId);

pm.init({ androidId: auth.androidId, masterToken: auth.masterToken}, function(err, data) {
    if(err) console.error(err);
    // gets all playlists
    else {
        // gets all playlists, and all entries on each
        pm.getPlayListEntries(function(err, data) {
            //console.log(data.data.items);
            // getStreamUrl for All Access - sj#track -> storeId
            var randoCalrisian = Math.floor(Math.random() * (data.data.items.length - 0 + 1)) + 0;
            // All Access uses .track.storeId , other uses .trackId
            var trackId = data.data.items[randoCalrisian].track && data.data.items[randoCalrisian].track.storeId || data.data.items[randoCalrisian].trackId
            pm.getStreamUrl(trackId, function(err, songUrl){
                console.log(songUrl);
                //request.get(songUrl).pipe(speaker);
                // Add a song url to the queue
                player.add(songUrl);
                // DIRTY Hack but I can't seem to catch the exection thrown by the event inside of Player
                process.on('uncaughtException', function (err) {
                    console.log(err);
                });
                player.play();
            });
        });
    }
});



