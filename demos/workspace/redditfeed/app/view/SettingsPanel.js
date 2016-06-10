/*
 * File: app/view/SettingsPanel.js
 *
 * This file was generated by Sencha Architect version 3.5.1.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 6.0.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 6.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.SettingsPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.settingspanel',

    requires: [
        'MyApp.view.SettingsPanelViewModel'
    ],

    viewModel: {
        type: 'settingspanel'
    },
    floating: true,
    height: 250,
    html: '<div style="text-align: center; padding: 30px">\r\n    Add settings here\r\n</div>',
    width: 400,
    closable: true,
    title: 'Settings'

});