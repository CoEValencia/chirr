Ext.define('Devon.plugin.PreventDataLoss', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.preventdataloss',
    pluginId: 'preventdataloss',

    /*PLUGIN FUNCTIONS*/
    init: function(form) {
        if (!this.mainPanel) {
            this.mainPanel = form.closable ? form : form.up('[closable=true]') || form.up('window');
        } else if (Ext.isString(this.mainPanel)) {
            this.mainPanel = form.up(this.mainPanel);
        }
        if (this.mainPanel) {
            this.mainPanel.addListener('beforeclose', this.preventDataLoss, this);
            form.addListener('preventDataLossResetForm', this.resetForm, form);
            form.getForm().trackResetOnLoad = true;
            form.setValues = this.setValues; /*Workaround for 5.1, solved in 6.0*/
            form.setRecord = this.setRecord; /*Workaround for 5.1, solved in 6.0*/
        } else {
            Devon.Log.error('MainPanel not found, plugin is disabled!');
        }
    },

    preventDataLoss: function() {
        if (!this.mainPanel.forceClosing && this.dataWillBeLost()) {
            var me = this;
            Ext.Msg.confirm(i18n.devon.plugin.preventdataloss.title, i18n.devon.plugin.preventdataloss.message, function(button) {
                if (button == 'yes') {
                    me.mainPanel.forceClosing = true;
                    me.mainPanel.close();
                }
            });
            return false;
        } else {
            return true;
        }
    },

    dataWillBeLost: function() {
        var form = this.getCmp();
        if (form.isDirty && form.isDirty()) {
            return true;
        } else {
            return false;
        }
    },

    /*FORM FUNCTIONS*/
    resetForm: function() {
        this.getForm().setValues(this.getForm().getValues());
    },

    setValues: function(values) {
        this.getForm().setValues(values);
    },

    setRecord: function(record) {
        this.getForm().loadRecord(record);
    }
});
