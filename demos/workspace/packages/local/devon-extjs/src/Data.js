Ext.define('Devon.Data', {
    singleton: true,

    serializeNull: function(value) {
        if (Ext.isNumeric(value)) {
            return value;
        }

        return null;
    }
});
