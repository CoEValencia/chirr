Ext.define('Devon.i18n.Devon_en_EN', {
    extend: 'Devon.I18nBundle',
    singleton: true,
    i18n: {
        devon: {
            ajax: {
                error: {
                    title: 'Error',
                    message: 'Message:',
                    code: 'code:',
                    uuid: 'uuid:',
                    forbidden: "Forbidden",
                    decoding: "Error decoding response"
                },
                maskMsg : 'Loading...'
            },
            plugin: {
                preventdataloss: {
                    title: 'Unsaved data',
                    message: 'If you proceed, nonsaved data will be lost. Are you sure you want to continue?'
                }
            }
        }
    }
});
