const Sequelize = require('sequelize');

const Lesson = require('../../model/sequelize/Lesson');
const Student = require('../../model/sequelize/Student');
const Course = require('../../model/sequelize/Course');
const { where } = require('sequelize');
const Teacher = require('../../model/sequelize/Teacher');

exports.getLessons = () => {
    return Lesson.findAll({include: [
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

exports.getLessonByStuId = (stuId) => {
    return Lesson.findAll({include: [
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
        }], where: {stuId: stuId}
    });
};

exports.getLessonByInsId = (insId) => {
    return Lesson.findAll({include: [
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
        }], where: {insId: insId}
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

exports.getLessonById = (lessonId) => {
    return Lesson.findByPk(lessonId, {include: [
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



exports.creteLesson = (data) =>{
    console.log(JSON.stringify(data));
    console.log(data)
    return Lesson.create({
        foreignKey: {name: 'stuId', allowNull: false},
        stuId: data.stuId,
        insId: data.insId,
        texId: data.texId,
        startDate: data.startDate,
        endDate: data.endDate
    });
};

exports.updateLesson = (lessonId, data) =>{

    return Lesson.update(data, {where: {_id: lessonId}});
};

exports.deleteLesson = (lessonId) => {
    return Lesson.destroy({
        where: {_id: lessonId}
    });
};

exports.deleteManyLessons = (lessonId) =>{
    return Lesson.find({_id: { [Sequelize.Op.in]: lessonId }});
}