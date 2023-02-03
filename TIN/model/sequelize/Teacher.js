const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Teacher = sequelize.define('Teacher', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    teacherName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "errors.the-field-is-required"
            },
            len: {
                args: [2,60],
                msg: "errors.2-60-symbols"
            },
        }
    },

    teacherSurname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "errors.the-field-is-required"
            },
            len: {
                args: [2,60],
                msg: "errors.2-60-symbols"
            },
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "errors.the-field-is-required"
            },
            isEmail: {
                msg: "errors.valid-email"
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "errors.the-field-is-required"
            },
            len: {
                args: [2,60],
                msg: "errors.2-60-symbols"
            }
        }
    }
});

module.exports = Teacher;
