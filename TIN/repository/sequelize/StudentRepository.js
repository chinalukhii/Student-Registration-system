//const Sequelize = require('sequelize');

const Student = require('../../model/sequelize/Student');
const Course = require('../../model/sequelize/Course');
const Lesson = require('../../model/sequelize/Lesson');

exports.getStudents = () => {
    return Student.findAll();
};

exports.findByEmail = (email) => {
    return Student.findOne({
        where: {email: email}
    });
}

exports.getStudentById = (stuId) => {
    return Student.findByPk(stuId,
        {
            include: [{
                model: Lesson,
                as: 'lessons',
                include: [{
                    model: Course,
                    as: 'course'
                }]
            }]
    });
};

const authUtil = require('../../util/authUtils');
exports.createStudent = (newStuData) =>{
    console.log(newStuData);
    return Student.create({
        firstName: newStuData.firstName,
        lastName: newStuData.lastName,
        email: newStuData.email,
        password: authUtil.hashPassword(newStuData.password),
        phoneNumber: newStuData.phoneNumber,
        address: newStuData.address,
        birthDate: newStuData.birthDate
    });
};

exports.updateStudent = (stuId, stuData) =>{
    const firstName = stuData.name;
    const lastName = stuData.surname;
    const phoneNumber = stuData.phoneNumber;
    const address = stuData.address;
    const birthDate = stuData.birthDate;

    stuData.password = authUtil.hashPassword(stuData.password);
    return Student.update(stuData, {where: {_id: stuId}, returning: true,
        plain: true});
};

exports.deleteStudent = (stuId) => {
    return Student.destroy({
        where: {_id: stuId}
    });
};