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
        var name = $('#name').val();
        var fecha = $('#fecha').val();
        var text = $('#texto').val();
        var user = name[0]+name[0]+name[0]+name[0];
        var id = 'aa';
        var tweets = [{id:"",user:"",date:"",text:""}];
    };

/*



*/

    //insertar en la BBDD cada tweet
    var guardaTweets = function(tweets){
         $.each(tweets, function(tweet) {
            db.transaction(function (tx) { //CADA TWEET EN UNA TRANSACCION → Procesa todas
                //var time = (new Date(Date.parse(tweets[tweet].created_at))).getTime();
                tx.executeSql('INSERT INTO tweets (id, user, date, text) VALUES (?, ?, ?, ?)',
                [tweets[tweet].id, tweets[tweet].user, tweets[tweet].date, tweets[tweet].text]);
            });
        });
    };

    var guardaUsers = function(users){
         $.each(users, function(user) {
            db.transaction(function (tx) { //CADA TWEET EN UNA TRANSACCION → Procesa todas
                //var time = (new Date(Date.parse(tweets[tweet].created_at))).getTime();
                tx.executeSql('INSERT INTO users (user, name) VALUES (?, ?)',
                [users[user].user, users[user].name]);
            });
        });
    };


    //funcion que obtiene los tweets e inseta en la tabla creada los datos de cada tweet
    var getTweets =function () {
        var tweets = $.ajax({
            url : 'servidor/cargaTweets1.json',
            type : 'POST',
            //data : { user : usuario },
            dataType : 'JSON',
            cache : false,
            success : function(data){
                //var lis = json.parse(data);
                guardaTweets(data);
                //return lis;
            },
            error : function(jqXHR, textStatus, errorThrow){
                //alert(errorThrow);
                console.log(errorThrow);
            }
        });
    };

    var getUser =function () {
        var tweets = $.ajax({
            url : 'servidor/cargaUsers1.json',
            type : 'POST',
            //data : { user : usuario },
            dataType : 'JSON',
            cache : false,
            success : function(data){
                //var lis = json.parse(data);
                guardaUsers(data);
                //return lis;
            },
            error : function(jqXHR, textStatus, errorThrow){
                //alert(errorThrow);
                console.log(errorThrow);
            }
        });
    };



    //Crear las tablas
    var createTable= function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS users(user PRIMARY KEY, name)', []);
        tx.executeSql('CREATE TABLE IF NOT EXISTS tweets(id PRIMARY KEY, user, date, text, FOREIGN KEY(user) REFERENCES users(user))', []);
    };

    //Crear y definir la BBDD
    var db = openDatabase('tweetdb', '1.0', 'All my tweets', 2 * 1024 * 1024);
    db.transaction(createTable);
    getUser();
    getTweets();

    $(document).on('click','#borra',borrarTablas);
    $(document).on('click','#addtweet',addtweet);
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
