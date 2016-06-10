Ext.define('Devon.view.login.Login', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.form.field.Text'
    ],

    xtype: 'main-login',

    viewModel: 'main-login',

    controller: 'main-login',
    bodyPadding: 10,
    title: i18n.login.title,
    closable: false,

    cls: 'login',

    items: {
        xtype: 'form',
        border: false,
        reference: 'form',
        items: [{
            xtype: 'displayfield',
            hideEmptyLabel: false,
            value: i18n.login.enterData
        }, {
            xtype: 'textfield',
            value: 'waiter',
            name: 'username',
            bind: '{username}',
            fieldLabel: i18n.login.username,
            allowBlank: false,
            enableKeyEvents: true,
            listeners: {
                specialKey: 'onSpecialKey'
            }
        }, {
            xtype: 'textfield',
            value: 'waiter',
            name: 'password',
            inputType: 'password',
            fieldLabel: i18n.login.password,
            allowBlank: false,
            enableKeyEvents: true,
            cls: 'password',
            listeners: {
                specialKey: 'onSpecialKey'
            }
        }, {
            xtype: 'displayfield',
            style: 'color:red',
            ui: 'validation-error',
            hidden: true,
            hideEmptyLabel: false,
            bind: {
                value: 'error:{lastError}',
                hidden: '{!lastError}'
            }
        }]
    },

    buttons: [{
        text: i18n.login.loginButton,
        listeners: {
            click: 'onLoginClick'
        }
    }]
});
