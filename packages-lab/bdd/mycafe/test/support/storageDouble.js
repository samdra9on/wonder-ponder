const sinon = require('sinon');

module.exports = function() {
    const dao = {
        byId: sinon.stub(),
    };
    const storage = {};
    storage.dao = function() {
        return dao;
    };
    storage.alreadyContains = function(entity) {
        const { id, data } = entity;
        dao.byId.withArgs(id).callsArgWithAsync(1, null, data);
        return entity;
    };
    return storage;
};
