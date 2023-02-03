const Sequelize = require('sequelize');

const Student = require('../../model/sequelize/Student');
const Course = require('../../model/sequelize/Course');
const Exam = require('../../model/sequelize/Exam');
const { where } = require('sequelize');
const Teacher = require('../../model/sequelize/Teacher');

exports.getExams = () => {
    return Exam.findAll({include: [
        {
            model: Student,
            as: 'student'
        },
        {
            model: Course,
            as: 'course'
        }, 
        {
            model: Teacher,
            as: 'tcher'
        }]
    });
};

exports.getExamByStuId = (stuId) => {
    return Exam.findAll({include: [
        {       
            model: Student,
            as: 'student'
        },
        {
            model: Course,
            as: 'course'
        }, 
        {
            model: Teacher,
            as: 'tcher'
        }], where: {stuId: stuId}
    });
};

exports.getExamByInsId = (texId) => {
    return Exam.findAll({include: [
        {
            model: Student,
            as: 'student'
        },
        {
            model: Course,
            as: 'course'
        }, 
        {
            model: Teacher,
            as: 'tcher'
        }], where: {texId: texId}
    });
};

exports.getAllStudentsInstructorsVehicles = () => {
    return new Promise((resolve, reject) => {
        Promise.all([Student.findAll(), Course.findAll(), Teacher.findAll()]).then((result) => {
            console.log(result)
            resolve({
                students: result[0],
                instructors: result[1],
                teacherss: result[2]
            })
        }).catch((error) => {
            reject(error);
        })
    })
}

exports.getExamById = (examId) => {
    return Exam.findByPk(examId, {include: [
        {
            model: Student,
            as: 'student'
        },
        {
            model: Course,
            as: 'course'
        }, {
            model: Teacher,
            as: 'tcher'
        }]
    });
};



exports.creteExam = (data) =>{
    console.log(JSON.stringify(data));
    console.log(data)
    return Exam.create({
        foreignKey: {name: 'stuId', allowNull: false},
        stuId: data.stuId,
        insId: data.insId,
        texId: data.texId,
        status: data.status,
        startDate: data.startDate,
        endDate: data.endDate,
        category: data.category
    });
};

exports.updateExam = (examId, data) =>{
    return Exam.update(data, {where: {_id: examId}});
};

exports.deleteExam = (examId) => {
    return Exam.destroy({
        where: {_id: examId}
    });
};

exports.deleteManyExams = (examId) =>{
    return Exam.find({_id: { [Sequelize.Op.in]: examId }});
}