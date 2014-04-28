require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        pouchdb: '../bower_components/pouchdb/dist/pouchdb-nightly',
        'ydn-db': '../bower_components/ydn-db/jsc/ydn.db-dev',
        handlebars: '../bower_components/handlebars.js/dist/handlebars',
        quo: ['https://raw.githubusercontent.com/arkaitzgarro/EarthQuakeLungo/master/js/vendor/quo.debug', '../bower_components/quojs/quo'],
        lungo: '../bower_components/lungo/lungo',

    },
    shim: {
        pouchdb: {
            exports : 'PouchDB'
        },
        'ydn-db': {
            exports : 'ydn'
        },
        handlebars: {
            exports : 'Handlebars'
        },
        quo: {
            exports : '$$'
        },
        lungo: {
            deps :[ 'quo'],
            exports : 'Lungo'
        },

    }
});

require(['app'], function () {});
