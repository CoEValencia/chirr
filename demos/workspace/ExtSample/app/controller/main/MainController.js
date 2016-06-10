Ext.define('Sample.controller.main.MainController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Sample.view.main.i18n.Main_en_EN',
        'Sample.view.main.i18n.Main_es_ES',
        'Sample.model.main.Recent',
        'Sample.view.main.Home',
        'Sample.view.main.Header',
        'Sample.view.main.Menu',
        'Sample.view.main.Content',
        'Sample.view.main.LeftSidePanel',
        'Sample.view.main.RestaurantStatus',
        'Sample.view.main.Recent'
    ]
});
