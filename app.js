/**
 * Created by Emiliano on 12/02/17.
 * Docs: https://github.com/guilhermefarias/instagram-api
 * https://www.npmjs.com/package/instagram-api
 */

const express = require('express')
    , InstagramAPI = require('instagram-api')
    , access_token = '41586199.e3987d8.6f02088202354011b252a54860d78ab1'
    , client_id = 'e3987d83c96f4646885afc6a5abc9c5e'
    , client_secret = '4a1f6a89eeda434d8b7fb0aa469a3d59'
    , ig = new InstagramAPI(access_token)
    , app = express();

    // Register ejs as .html. If we did
    // not call this, we would need to
    // name our views foo.ejs instead
    // of foo.html. The __express method
    // is simply a function that engines
    // use to hook into the Express view
    // system by default, so if we want
    // to change "foo.ejs" to "foo.html"
    // we simply pass _any_ function, in this
    // case `ejs.__express`.

    app.engine('.html', require('ejs').__express);

// Optional since express defaults to CWD/views

    app.set('views', __dirname + '/views');
    app.use(express.static(__dirname + '/public'));

    // Without this you would need to
    // supply the extension to res.render()
    // ex: res.render('users.html').
    app.set('view engine', 'html');

app.get('/test', function(req, res) {
    ig.userSelf().then(function(result) {
        res.send(result.data);
        console.log(result.data); // user info
        console.log(result.limit); // api limit
        console.log(result.remaining) // api request remaining
    }, function(err){
        console.log(err); // error info
    });
});

app.get('/slides', function (req, res) {
    res.render('slides');
});

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/tag', function(req, res) {
    var params = {
        count: req.query['n'] || '2'
    };
    var tag = req.query['tag'] || 'sorvete',
        slide = req.query['s'] || '0';
    console.log('params: ' + params.count + '\ntag: ' + tag);
    if (tag.length >= 1) {
        ig.getMediasByTag(tag, params).then(function (result) {
            console.log(result.data); // user info
            console.log(result.limit); // api limit
            console.log(result.remaining); // api request remaining
            /**for(var i = 0, l = result.data.length; i < l; i++ ) {
                console.log(result.data[i].images.thumbnail.url);//standard_resolution
            }**/
            res.render('gallery', {
                response: result.data,
                tag: tag,
                count: params.count
            });

        }, function (err) {
            console.log(err); // error info
        });
    };
});


app.listen(5000,function(){
    console.log("listening on port 5000")
});