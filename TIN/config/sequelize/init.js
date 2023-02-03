const sequelize = require('./sequelize');

const Student = require('../../model/sequelize/Student');
const Course = require('../../model/sequelize/Course');
const Lesson = require('../../model/sequelize/Lesson');
const Exam = require('../../model/sequelize/Exam');
const Teacher = require('../../model/sequelize/Teacher');
const Administrator = require('../../model/sequelize/Administrator');

const authUtil = require('../../util/authUtils');
const passHash = authUtil.hashPassword('12345');

module.exports = () => {
    Student.hasMany(Lesson, {as: 'lessons', foreignKey: {name: 'stuId', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Course.hasMany(Lesson, {as: 'lessons', foreignKey: {name: 'insId', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Teacher.hasMany(Lesson, {as: 'lessons', foreignKey: {name: 'texId', allowNull: false}, constraints: true, onDelete: 'CASCADE'});


    Student.hasMany(Exam, {as: 'exam', foreignKey: {name: 'stuId', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Course.hasMany(Exam, {as: 'exam', foreignKey: {name: 'insId', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Teacher.hasMany(Exam, {as: 'exam', foreignKey: {name: 'texId', allowNull: false}, constraints: true, onDelete: 'CASCADE'});


    Lesson.belongsTo(Student, {as: 'student', foreignKey: {name: 'stuId', allowNull: false} });
    Lesson.belongsTo(Course, {as: 'course', foreignKey: {name: 'insId', allowNull: false} });
    Lesson.belongsTo(Teacher, {as: 'tcher', foreignKey: {name: 'texId', allowNull: false} });
    
    Exam.belongsTo(Student, {as: 'student', foreignKey: {name: 'stuId', allowNull: false} });
    Exam.belongsTo(Course, {as: 'course', foreignKey: {name: 'insId', allowNull: false} });
    Exam.belongsTo(Teacher, {as: 'tcher', foreignKey: {name: 'texId', allowNull: false} });

    // let allStuds, allInsts;
    return sequelize
        .sync({force: true}) // force: true deletes database
        .then( () => {
            return Teacher.bulkCreate([
                {teacherName: "Rama", teacherSurname: "Lukhi",email: "t1@gmail.com",password: passHash}
            ])
        })
        .then( (teacherss) => {
            allVehicles = teacherss;
            return Student.findAll();
        })
        .then(studs => {
            if(!studs || studs.length==0){
                return Student.bulkCreate([
                    {firstName: 'Chinal', lastName: 'Lukhi', email: "chinal@gmail.com", phoneNumber: 123321123, address: 'Bacha 34', birthDate: '2001-01-01', password: passHash},
                    {firstName: 'Ruta', lastName: 'Rachhadiya', email: "ruta@gmail.com", phoneNumber: 123412341, address: 'Orzycka 8', birthDate: '2002-01-01', password: passHash}
                ])
                .then( () => {
                    return Student.findAll();
                });
            }else{
                return studs;
            }
        })
        .then( studs => {
            allStuds = studs;
            return Course.findAll();
        })
        .then( insts => {
            if(!insts || insts.length==0){
                return Course.bulkCreate([
                    {name: 'Cyber scurity', price: 2000, courseDate: '2002-01-01'},
                    {name: 'Web designing',  price: 1500, courseDate: '2002-02-01'},
                ])
                .then( () => {
                    return Student.findAll();
                });
            }else{
                return insts;
            }
        })
        .then(insts => {
            allInsts=insts;
            return Lesson.findAll();
        })
        .then(lessns => {
            if(!lessns || lessns.length==0) {
                return Lesson.bulkCreate([
                    {stuId: allStuds[0]._id, insId: allInsts[0]._id, texId: allVehicles[0]._id, startDate: '2002-02-01', endDate: '2002-04-02'} 
                    // {stuId: allStuds[1]._id, insId: allInsts[1]._id, texId: allVehicles[1]._id, startDate: '2022-02-01', endDate: '2002-04-12'}
                  
                ]);
            }else{
                return lessns;
            }
        }).then(lessns => {
            return Administrator.bulkCreate([
                {firstName: 'Admin', lastName: 'Admin', email: "admin@gmail.com", password: passHash},
            ])
        }).then(administrators => {
            return Exam.bulkCreate([
                // {startDate: '2023-03-01', stuId: allStuds[0]._id, insId: allInsts[0]._id, texId: allVehicles[1]._id, status: "Fees not paid yet"},
                {startDate: '2023-03-02', stuId: allStuds[1]._id, insId: allInsts[1]._id, texId: allVehicles[0]._id, status: "Paid"}
            ])
        })
};

