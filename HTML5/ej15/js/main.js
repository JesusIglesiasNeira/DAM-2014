(function(){
    "use strict";
    var sacarerror = function(error){
        console.log(error);
    };

    var borrarTablas= function(){
        db.transaction(function (tx) {
            tx.executeSql('DROP TABLE tweets');
            tx.executeSql('DROP TABLE users');
        });
    };

    var addtweet= function(){
        var nomb = $('#name').val();
        var idtweet = parseInt(new Date().getTime());
        var fecha = $('#fecha').val();
        var texto = $('#texto').val();
        var usu = nomb[0]+nomb[1]+nomb[2]+nomb[0];
        var now = new Date();
        var idus = nomb[0]+now.getTime().toString()+texto[0]+nomb[0];
        var tweets = [{"created_at":fecha,"id":idtweet,"text":texto,"user":{"id":idus,"name":nomb,"screen_name":usu,"created_at":fecha}}];
        guardaTweets(tweets);
    };
    var deletetweet= function(){
        var idtweet =   $('#elimin').val();
        if (idtweet){
            db.transaction(function (tx) {
                tx.executeSql('DELETE FROM tweets WHERE id="'+idtweet+'"');
            });
        }
        else{alert('Introduzca un id de tweet válido');}
    };

    var updatetweet = function(){
        var idtweet = $('#actualid').val();
        var texto = $('#actualtext').val();
        if (idtweet){
            db.transaction(function (tx) {
                tx.executeSql("UPDATE tweets SET text= '"+texto+"'"+" WHERE id = '"+idtweet+"'");
            });
        }
        else{alert('Introduzca un id de tweet válido');}
    };

    var obtentweetposterior = function(){
        var fecha =  $('#fechapost').val();
        var $ul = $('#tweetfecha');
        $ul.empty();
        if (fecha){
            db.transaction(function (tx) {
                tx.executeSql("SELECT tweets.id,tweets.date,tweets.text,users.name AS usu FROM tweets INNER JOIN users ON tweets.iduser = users.idusu  AND tweets.date >= '"+fecha+"'",[],
                    function callback(tx, results) {
                    var len = results.rows.length, i;
                        for (i = 0; i < len; i++) {
                            $ul.append('<li>'+
                                "<strong> Usuario: </strong>"+results.rows.item(i).usu+
                                "<strong> Fecha: </strong>"+results.rows.item(i).date+
                                "<strong> idTweet: </strong>"+results.rows.item(i).id+"<br/>"+
                                "<strong> Texto: </strong><br/>"+results.rows.item(i).text+"<br/>"+
                                "---------------------------------------------------------------------------------------------------------------------------------"+
                                '</li>');
                        }
                    },
                function errorCallback(tx, error) {
                    console.log(error.message);
                }
                );
            });
        }
        else{alert('Introduzca un id de tweet válido');}
    };



    //insertar en la BBDD cada tweet
    var guardaTweets = function(tweets){
        console.log(tweets[0]);
        guardaUsers(tweets);
         $.each(tweets, function(tweet) {
            var id = tweets[tweet].id.toString();
            var idusr = tweets[tweet].user.id.toString();
            db.transaction(function (tx) { //CADA TWEET EN UNA TRANSACCION → Procesa todas
                //var time = (new Date(Date.parse(tweets[tweet].created_at))).getTime();
                tx.executeSql('INSERT INTO tweets (id, iduser, date, text) VALUES (?, ?, ?, ?)',
                [id, idusr, tweets[tweet].created_at, tweets[tweet].text]);
            });
        });
    };

    var guardaUsers = function(users){
         $.each(users, function(user) {

            db.transaction(function (tx) {
                var idusr = users[user].user.id.toString();
                //var time = (new Date(Date.parse(tweets[tweet].created_at))).getTime();
                tx.executeSql('INSERT INTO users (idusu, user, name, description, location, createdAt) VALUES (?, ?, ?, ?, ?, ?)',
                [idusr, users[user].user.screen_name, users[user].user.name, users[user].user.description, users[user].user.location, users[user].user.created_at]);
            });
        });
    };


    //funcion que obtiene los tweets e inseta en la tabla creada los datos de cada tweet
    var getTweets =function () {
        var tweets = $.ajax({
            url : 'servidor/search.json',
            type : 'POST',
            //data : { user : usuario },
            dataType : 'JSON',
            cache : false,
            success : function(data){
                //var lis = json.parse(data);
                guardaTweets(data.statuses);
                console.log(data.statuses);
            },
            error : function(jqXHR, textStatus, errorThrow){
                //alert(errorThrow);
                console.log(errorThrow);
            }
        });
    };




    //Crear las tablas
    var createTable= function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS users(idusu PRIMARY KEY, user, name, description, location, createdAt)', []);
        tx.executeSql('CREATE TABLE IF NOT EXISTS tweets(id PRIMARY KEY, iduser, date, text, FOREIGN KEY(iduser) REFERENCES users(idusu))', []);
    };

    //Crear y definir la BBDD
    var db = openDatabase('tweetdb', '1.0', 'All my tweets', 2 * 1024 * 1024);
    if(db){
        db.transaction(createTable);
        getTweets();
    }

    $(document).on('click','#borra',borrarTablas);
    $(document).on('click','#addtweet',addtweet);
    $(document).on('click','#deletetweet',deletetweet);
    $(document).on('click','#updatetweet',updatetweet);
    $(document).on('click','#fechatweet',obtentweetposterior);
})();


/*
18.7.2 Ejercicio 9

Crear un objeto que encapsule una base de datos WebSQL, que nos permitar acceder a una base de datos para añadir, modificar, eliminar y obtener registros.
Dicha base de datos va a almacenar tweets procedentes de Twitter, que tienen asociado el hashtag #html5. Los requisitos son los siguientes:

    Disponer de una tabla para almacenar los tweets. Los campos mínimos son:
    identificador del tweet, texto, usuario, y fecha de publicación.

    Disponer de una tabla para almacenar los usuarios que publican los tweets. Esta tabla debe estar relacionada con la anterior.
    Los campos mínimos son: identificador del usuario, nombre e imagen.

    Crear un método addTweet que dado un objeto que corresponde con un tweet, lo almacene en la base de datos.
    Almacenar el usuario en caso de que no exista, o relacionarlo con el tweet si existe.

    Crear un método removeTweet que dado un identificador de tweet, lo elimine de la base de datos.
    Éste método debe devolver el tweet eliminado.

    Crear un método updateTweet que dado un objeto que corresponde con un tweet,
     actualice los datos correspondientes al tweet en la base de datos.

    Crear un método getTweets que dado un parámetro de fecha, me devuelva todos los tweets posteriores a esa fecha.
     Cada tweet debe incluir sus datos completos y el usuario que lo creó.

Obtener los últimos 25 tweets que tienen como hashtag #html5 de la siguiente consulta a Twitter:
 http://search.twitter.com/search.json?q=%23html5&rpp=25&result_type="recent"

Consultad la API de Twitter para identificar el formato del resultado, nombres de campos, etc.
*/
/*
    //insertar en la BBDD cada tweet
    var guardaTweets = function(tweets){
        guardaUsers(tweets);
         $.each(tweets, function(tweet) {
            db.transaction(function (tx) { //CADA TWEET EN UNA TRANSACCION → Procesa todas
                //var time = (new Date(Date.parse(tweets[tweet].created_at))).getTime();
                tx.executeSql('INSERT INTO tweets (id, iduser, date, text) VALUES (?, ?, ?, ?)',
                [tweets[tweet].id, tweets[tweet].user.id, tweets[tweet].created_at, tweets[tweet].text]);
            });
        });
    };

    var guardaUsers = function(users){
         $.each(users, function(user) {

            db.transaction(function (tx) { //CADA TWEET EN UNA TRANSACCION → Procesa todas
                //var time = (new Date(Date.parse(tweets[tweet].created_at))).getTime();
                tx.executeSql('INSERT INTO users (idusu, user, name, description, location, createdAt) VALUES (?, ?)',
                [users[user].user.id, users[user].user.screen_name, users[user].user.name, users[user].user.description, users[user].user.location, users[user].user.created_at]);
            });
        });
    };


    //funcion que obtiene los tweets e inseta en la tabla creada los datos de cada tweet
    var getTweets =function () {
        var tweets = $.ajax({
            url : 'servidor/search.json',
            type : 'POST',
            //data : { user : usuario },
            dataType : 'JSON',
            cache : false,
            success : function(data){
                //var lis = json.parse(data);
                guardaTweets(data.statuses);
                console.log(data.statuses);
            },
            error : function(jqXHR, textStatus, errorThrow){
                //alert(errorThrow);
                console.log(errorThrow);
            }
        });
    };

    var getUser =function () {
        var users = $.ajax({
            url : 'servidor/cargaUsers1.json',
            type : 'POST',
            //data : { user : usuario },
            dataType : 'JSON',
            cache : false,
            success : function(data){
                //var lis = json.parse(data);
                guardaUsers(data);
            },
            error : function(jqXHR, textStatus, errorThrow){
                //alert(errorThrow);
                console.log(errorThrow);
            }
        });
    };



    //Crear las tablas
    var createTable= function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS users(idusu PRIMARY KEY, user, name, description, location, createdAt)', []);
        tx.executeSql('CREATE TABLE IF NOT EXISTS tweets(id PRIMARY KEY, iduser, date, text, FOREIGN KEY(iduser) REFERENCES users(idusu))', []);
    };

    //Crear y definir la BBDD
    var db = openDatabase('tweetdb', '1.0', 'All my tweets', 2 * 1024 * 1024);
    if(db){
        db.transaction(createTable);
        //getUser();
        getTweets();
    }
*/