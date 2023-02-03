const StudentRepository = require('../repository/sequelize/StudentRepository');
const AdministratorRepository = require('../repository/sequelize/AdministratorRepository');
const TeacherRepository = require('../repository/sequelize/TeacherRepository');

const authUtil = require('../util/authUtils');

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    //login administrator if exist
    AdministratorRepository.findByEmail(email).then(ins => {
        if(ins) {
            loginIfCorrectPassword(req, res, password, ins, "administrator");
        } else {

            // login student if exist
            StudentRepository.findByEmail(email).then(stu => {
                if(stu) {
                    loginIfCorrectPassword(req, res, password, stu, "student");
                } else {
                    
                     TeacherRepository.findByEmail(email).then(ins => {
                        if(ins) {
                            loginIfCorrectPassword(req, res, password, ins, "teacher");
                        } else {
                            
                            //error 
                            res.render('index', {
                                navLocation: '',
                                loginError: "Invalid email address or password"
                            })
                        }
                
                        
                    })
                }
            })
        }
    }).catch(err => {
        console.log(err);
    });
    
    
    
}

const loginIfCorrectPassword = (req, res, password, user, type) => {
    console.log("loginIfCorrectPassword");
    console.log(user);
    if(authUtil.comparePasswords(password, user.password) === true) {
        req.session.loggedUserType = type;
        req.session.loggedUser = user;
        res.redirect('/');
    } else {
        res.render('index', {
            navLocation: '',
            loginError: req.__('login.error')
        })
    }
}


exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}