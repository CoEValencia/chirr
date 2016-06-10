Ext.define('Devon.Class', {
    singleton: true,

    /**
     * retrieve a class by alias.
     * 
     * This is provided by Devon because Ext.ClassManager.getByAlias tries to load from network if not defined
     * 
     * */
    isDefined: function(alias) {
        var clazz = Ext.ClassManager.aliasToName[alias];
        return clazz !== undefined;
    }
});
