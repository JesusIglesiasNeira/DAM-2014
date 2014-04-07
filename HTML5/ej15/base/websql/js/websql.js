$(function() {
	var db = null;
    var dbName = "tweets";
    var dbVersion = "1.0";
    var dbDesc = "Description";
    var dbSize = 2 * 1024 * 1024;

    try {
        if (window.openDatabase) {
            db = openDatabase(dbName, dbVersion, dbDesc, dbSize);
            if (db) {
                db.transaction(function(tx) {
                    var tweetsTable = "CREATE TABLE IF NOT EXISTS tweets (" +
                                        "id INTEGER PRIMARY KEY," + 
                                        "text TEXT," + 
                                        "user_id INTEGER," +
                                        "created_at INTEGER," +
                                        "FOREIGN KEY(user_id) REFERENCES users(id)"+
                                        ")";

                    var usersTable = "CREATE TABLE IF NOT EXISTS users (" +
                                        "id INTEGER PRIMARY KEY," +
                                        "name TEXT," +
                                        "location TEXT," +
                                        "created_at INTEGER" +
                                        ")";

                    tx.executeSql(tweetsTable, []);
                    tx.executeSql(usersTable, []);
                });
            } else {
                    showStatus('Error occurred trying to open DB.');
            }
        } else {
            showStatus('Web SQL Databases not supported');
        }
    } catch (e) {
        showStatus('Error occurred during DB init, Web SQL Database supported?');
    }

    function addTweet(tweet, success) {
        db.transaction(function (tx) {
            var time = (new Date(Date.parse(tweet.user.created_at))).getTime();
            tx.executeSql('INSERT OR IGNORE INTO users (id, name, location, created_at) VALUES (?, ?, ?, ?)',
                          [tweet.user.id, tweet.user.name, tweet.user.location, time / 1000],
                          null,
                          showError);

            var time = (new Date(Date.parse(tweet.created_at))).getTime();
            tx.executeSql('INSERT OR IGNORE INTO tweets (id, text, user_id, created_at) VALUES (?, ?, ?, ?)',
                          [tweet.id, tweet.text, tweet.user.id, time / 1000],
                          success,
                          showError);
        });
    }

    function getTweet(id, success, error) {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM tweets WHERE id = ?', [id],
                          function(tx, results) {
                            if(results.rows.length > 0)
                                success(results.rows.item(0));
                            else
                                success(null);
                          }, error);
        });
    }

    $.getJSON(
        "data/search.json",
        function(tweets) {
            console.log('AJAX: ' + tweets.statuses.length + ' tweets received successfuly');
            $.each(tweets.statuses, function(idx, tweet) {
                addTweet(tweet, added(tweet));
            });
        }
    );

    var showStatus = function(status) {
        console.log(status);
    };

    var showError = function(tx, error) {
        console.log('ERROR: ', error);
    };

    var added = function(tweet) {
        getTweet(tweet.id, function(tweet) {
            var htmlTweet = "<article><h3>"+new Date(tweet.created_at*1000)+"</h3>"+
                            "<p>"+tweet.text+"</p></article>";
            $("#tweets").append(htmlTweet);
        });
    }

});