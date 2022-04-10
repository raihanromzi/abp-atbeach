const { 
    newMemberHandler,
    getAllMemberHandler,
    getMemberByIdHandler,
    deleteMemberByIdHandler,
} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/members',
        handler: newMemberHandler
    },
    {
        method: 'GET',
        path: '/members',
        handler: getAllMemberHandler
    },
    {
        method: 'GET',
        path: '/members/{id}',
        handler: getMemberByIdHandler
    },
    {
        method: 'DELETE',
        path: '/members/{id}',
        handler: deleteMemberByIdHandler,
    },
];

module.exports = routes;