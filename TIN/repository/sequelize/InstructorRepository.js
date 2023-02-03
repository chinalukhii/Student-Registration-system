//const Sequelize = require('sequelize');

const Course = require('../../model/sequelize/Course');
const Student = require('../../model/sequelize/Student');
const Lesson = require('../../model/sequelize/Lesson');

exports.getInstructors = () => {
    return Course.findAll();
};

exports.findByEmail = (email) => {
    return Course.findOne({
        where: {email: email}
    });
}

exports.getInstructorById = (insId) => {
    return Course.findByPk(insId,
        {
            include: [{
                model: Lesson,
                as: 'lessons',
                include: [{
                    model: Student,
                    as: 'student'
                }]
            }]
    });
};

const authUtil = require('../../util/authUtils');
exports.createInstructor = (newInsData) =>{
    return Course.create({
        name: newInsData.name,
        price: newInsData.price,
        courseDate: newInsData.courseDate
    });
};

exports.updateInstructor = (insId, insData) =>{
    const name = insData.name;
     const price = insData.price;
    const courseDate = insData.courseDate;


    return Course.update(insData, {where: {_id: insId}});
};

exports.deleteInstructor = (insId) => {
    return Course.destroy({
        where: {_id: insId}
    });
};