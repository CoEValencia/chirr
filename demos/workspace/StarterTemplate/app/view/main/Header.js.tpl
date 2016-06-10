Ext.define('{appName}.view.main.Header', {
    extend: 'Ext.Panel',

    alias: 'widget.main-header',

    requires: [
 	  '{appName}.view.main.HeaderVC'
 	],

    layout:{
    	type:'hbox',
    	align:'middle'
    } ,
	border: false,

    controller : 'main-header',

    cls: 'main-header',
    height:70,

    defaults: {
        border: false,
        bodyStyle: 'background: transparent; '
    },

    items: [{
    	xtype:'image',
    	src:'./resources/logo.jpg',
        width: 218,
        height: 40,
        margin : '0 20'
    }, {
        cls: 'main-header-title',
        xtype: 'label',
        text: '{appName}',
        flex: 1
    },{
    	xtype:'combobox',
    	style:'margin-right:5px',
    	editable:false,
    	width:100,
    	queryMode: 'local',
    	valueField: 'value',
    	forceSelection:true,
    	value:Devon.I18n.currentLocale,
    	store:{
    		fields: ['text', 'value'],
    		data:[{
    		    'text':'English',
    		    'value':'en_EN'
    		},{
    		    'text':'Castellano',
    		    'value':'es_ES'
    		}]
    	},
    	listeners:{
    	    change:'languageChange'
    	}
    }, {
        xtype: 'button',
        style:'margin-right:5px',
        text: i18n.main.logOffButton,
        handler: 'onLogoffClick'
    }]
});
