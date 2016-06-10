/*
 * File: app/view/TicketPanel.js
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

Ext.define('TicketTracker.view.TicketPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ticketpanel',

    requires: [
        'TicketTracker.view.TicketPanelViewModel',
        'TicketTracker.view.TicketDataView',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.view.View'
    ],

    viewModel: {
        type: 'ticketpanel'
    },
    title: 'Ticket Tracker',

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'combobox',
                    width: 200,
                    fieldLabel: 'Importance',
                    name: 'status',
                    queryMode: 'local',
                    store: [
                        '1',
                        '2',
                        '3',
                        '4',
                        '5'
                    ]
                },
                {
                    xtype: 'button',
                    action: 'sortByImportance',
                    text: 'Sort By Importance'
                },
                {
                    xtype: 'button',
                    action: 'clearFilter',
                    text: 'Clear Filter'
                },
                {
                    xtype: 'button',
                    action: 'addTicket',
                    text: 'Add Ticket'
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'ticketdataview',
            width: 800
        }
    ]

});