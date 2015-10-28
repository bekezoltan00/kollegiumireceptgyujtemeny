var Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    migrate: 'safe',
    identity: 'recipe',
    connection: 'disk',
    attributes: {
        datum: {
            type: 'date',
            defaultsTo: function () { return new Date(); }
        },
        nev: 'string',
        nehezseg: 'string',
        leiras: 'string',
        kesz: {
            type: 'boolean',
            defaultsTo: false
        },
        user: {
            model: 'user'
        }
    }
});