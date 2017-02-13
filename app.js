/**
 * Created by Emiliano on 12/02/17.
 * Docs: https://github.com/guilhermefarias/instagram-api
 * https://www.npmjs.com/package/instagram-api
 */

const express = require('express'),
      InstagramAPI = require('instagram-api'),
      access_token = '240993422.e3987d8.3b585871d3714523a6af06421d001eb8',
      client_id = 'e3987d83c96f4646885afc6a5abc9c5e',
      client_secret = '4a1f6a89eeda434d8b7fb0aa469a3d59',
      ig = new InstagramAPI(access_token),
      app = express();

app.get('/', function(req, res) {
    ig.user_search('cpbr10', function (err, result, remaining, limit) {
        console.log(result)

        ig.user_media_recent(result, function (err, result2, remaining, limit) {
            res.send(result2)
        });

    });
});


app.listen(5000,function(){
    console.log("listening on port 5000")
});