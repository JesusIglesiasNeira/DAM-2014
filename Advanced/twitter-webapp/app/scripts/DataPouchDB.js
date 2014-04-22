define('Data', ['pouchdb'], function(PouchDB) {
    console.log('Data module started');

    var dbName = 'TwitterDB';
    var db = new PouchDB(dbName);

    var addTweet = function(tweet, callback, error) {
        db.put(tweet, function(err, response){
            if(err) {
                error(err);
            } else {
                callback(response);
            }
        });
    };

    var remove = function(_id, callback, error){
        db.get(_id, function(err, doc) {
            db.remove(doc, function(err, response) {
                if(err) {
                    error(err);
                } else {
                    callback(response);
                }
            });
        });
    };

    return {
        addTweet : addTweet,
        remove : remove
    };
});