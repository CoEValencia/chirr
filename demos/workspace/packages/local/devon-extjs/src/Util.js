Ext.define('Devon.Util', {
    singleton: true,

    constructor: function() {
        this.uuidGenerator = Ext.data.identifier.Uuid.createRandom();
    },

    getUUID: function() {
        return this.uuidGenerator();
    }
});
