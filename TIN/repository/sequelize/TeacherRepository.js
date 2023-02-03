//const Sequelize = require('sequelize');

const Student = require('../../model/sequelize/Student');
const Course = require('../../model/sequelize/Course');
const Lesson = require('../../model/sequelize/Lesson');
const Teacher = require('../../model/sequelize/Teacher');

exports.getTeachers = () => {
    return Teacher.findAll();
};

exports.findByEmail = (email) => {
    return Teacher.findOne({
        where: {email: email}
    });
}

exports.getTeacherById = (texId) => {
    return Teacher.findByPk(texId);
};
const authUtil = require('../../util/authUtils');
exports.createVehicle = (newVehData) =>{
    console.log(newVehData);
    return Teacher.create({
        teacherName: newVehData.teacherName,
        teacherSurname: newVehData.teacherSurname,
        email: newVehData.email,
        password: authUtil.hashPassword(newVehData.password),
    });
};

exports.updateTeacher = (texId, techData) =>{

    const teacherName = techData.name;
    const teacherSurname = techData.surname;
  techData.password = authUtil.hashPassword(techData.password);

    return Teacher.update(techData, {where: {_id: texId}, returning: true,
        plain: true}); 
};

exports.deleteTeacher = (texId) => {
    return Teacher.destroy({
        where: {_id: texId}
    });
};