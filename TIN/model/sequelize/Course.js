const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Course = sequelize.define('Course', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name: {
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



    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "errors.the-field-is-required"
            }
        },
    },

    courseDate: {
        type: Sequelize.DATE,
        get() {
            return !!this.getDataValue('courseDate') ? this.getDataValue('courseDate').toISOString().split('T')[0] : undefined
          },
          validate: {
              notEmpty: {
                  msg: "errors.the-field-is-required"
              },
            
          },
        allowNull: false
    }

});

module.exports = Course;
