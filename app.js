/**
 * Created by Emiliano on 12/02/17.
 */

const express = require('express'),
      ig = require('instagram-node').instagram(),
      app = express();


ig.use({ access_token: '240993422.e3987d8.3b585871d3714523a6af06421d001eb8' });
ig.use({
    client_id: 'e3987d83c96f4646885afc6a5abc9c5e',
    client_secret: '4a1f6a89eeda434d8b7fb0aa469a3d59'
});


app.get('/', function(req, res) {
    ig.tag_search('query', function(err, result, remaining, limit) {
        if (err)
            console.log(err);
        else
            console.log(result);
    });
});


app.listen(5000,function(){
    console.log("listening on port 5000")
});