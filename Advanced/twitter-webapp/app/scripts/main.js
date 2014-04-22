require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        pouchdb: '../bower_components/pouchdb/dist/pouchdb-nightly',
        'ydn-db': '../bower_components/ydn-db/jsc/ydn.db-dev',
        bootstrapAffix: '../bower_components/bootstrap/js/affix',
        bootstrapAlert: '../bower_components/bootstrap/js/alert',
        bootstrapButton: '../bower_components/bootstrap/js/button',
        bootstrapCarousel: '../bower_components/bootstrap/js/carousel',
        bootstrapCollapse: '../bower_components/bootstrap/js/collapse',
        bootstrapDropdown: '../bower_components/bootstrap/js/dropdown',
        bootstrapModal: '../bower_components/bootstrap/js/modal',
        bootstrapPopover: '../bower_components/bootstrap/js/popover',
        bootstrapScrollspy: '../bower_components/bootstrap/js/scrollspy',
        bootstrapTab: '../bower_components/bootstrap/js/tab',
        bootstrapTooltip: '../bower_components/bootstrap/js/tooltip',
        bootstrapTransition: '../bower_components/bootstrap/js/transition'
    },
    shim: {
        pouchdb: {
            exports : 'PouchDB'
        },
        'ydn-db': {
            exports : 'ydn'
        },
        bootstrapAffix: {
            deps: ['jquery']
        },
        bootstrapAlert: {
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapButton: {
            deps: ['jquery']
        },
        bootstrapCarousel: {
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapCollapse: {
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapDropdown: {
            deps: ['jquery']
        },
        bootstrapModal:{
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapPopover: {
            deps: ['jquery', 'bootstrapTooltip']
        },
        bootstrapScrollspy: {
            deps: ['jquery']
        },
        bootstrapTab: {
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapTooltip: {
            deps: ['jquery', 'bootstrapTransition']
        },
        bootstrapTransition: {
            deps: ['jquery']
        }
    }
});

require(['app'], function () {});
