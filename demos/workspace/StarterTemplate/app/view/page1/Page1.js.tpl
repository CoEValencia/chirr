Ext.define('{appName}.view.page1.Page1', {
    extend: 'Ext.Panel',

    requires: [
      '{appName}.view.page1.Page1VC',
      '{appName}.view.page1.Page1VM'
    ],

    controller: 'page1-controller',

    viewModel : {
        type:'page1-model'
    },

    title : i18n.page1.tabTitle,

    items : [{
        bind : {
            html : '{viewModelMessage}'
        }
    },{
        xtype: 'button',
        text: i18n.page1.buttonText,
        handler:'onPage1ButtonClick'
    }]

});
