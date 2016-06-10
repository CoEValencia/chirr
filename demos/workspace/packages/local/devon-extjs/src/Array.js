Ext.define('Devon.Array', {
    singleton: true,

    defineIf: function(arr) {
        return Ext.Array.filter(arr, function(x) {
            if (!Ext.isObject(x)) {
                return x;
            }

            if (x.hasOwnProperty('defineIf') && (x.defineIf === false || x.defineIf === null)) {
                return false;
            }

            return true;
        });
    }
});
