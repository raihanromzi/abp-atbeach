const { response } = require('@hapi/hapi/lib/validation');
const { nanoid } = require('nanoid');
const members = require('./members');

const newMemberHandler = (request, h) => {
    const {
        name,
        nationality,
    } = request.payload;

    const id = nanoid(8);

    const newMember = {
        id, 
        name,
        nationality,
    };

    if (name == undefined) {
        const response = h.response ({
            status: 'fail',
            message: 'Name value is missing',
        });
        response.code(400);
        return response;
    }

    if (nationality == undefined) {
        const response = h.response ({
            status: 'fail',
            message: 'Nationality value is missing',
        });
        response.code(400);
        return response;
    }

    members.push(newMember);

    const isSuccess = members.filter((member) => member.id === id).length > 0;
    if (isSuccess) {
        const response = h.response ({
            status: 'success',
            message: 'Member berhasil ditambahkan',
            data: {
                memberId: id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status:'fail',
        message: 'Member gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllMemberHandler = () => ({
    status: 'success',
    data: {
        members: members.map((member) => ({
            id: member.id,
            name: member.name,
            nationality: member.nationality,
        })),
    },
});

const getMemberByIdHandler = (request, h) => {
    const { id } = request.params;

    const member = members.filter((m) => m.id === id)[0];

    if (member !== undefined) {
        return {
            status: 'success',
            data: {
                member,
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Member tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteMemberByIdHandler = (request, h) => {
    const { id } = request.params;

    const index = members.findIndex((m) => m.id === id);

    if (index !== -1) {
        members.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Member berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Member gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = {
    newMemberHandler,
    getAllMemberHandler,
    getMemberByIdHandler,
    deleteMemberByIdHandler,
};