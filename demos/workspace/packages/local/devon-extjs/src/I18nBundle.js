Ext.define('Devon.I18nBundle', {
    constructor: function() {
        this.callParent(arguments);
        Devon.I18n.addBundle(this);
    }
});
