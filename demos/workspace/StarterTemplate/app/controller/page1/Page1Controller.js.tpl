Ext.define('{appName}.controller.page1.Page1Controller', {
    extend: 'Ext.app.Controller',

    requires: [
        '{appName}.view.page1.i18n.Page1_en_EN',
        '{appName}.view.page1.Page1'
    ],

    config: {
        listen: {
            global: {
                eventOpenPage1: 'onOpenPage1'
            }
        }
    },

    onOpenPage1: function(){
        var page1 = new {appName}.view.page1.Page1();
        Devon.App.openInContentPanel(page1);
    }
});
