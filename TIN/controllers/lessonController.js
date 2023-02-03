const LessonRepository = require('../repository/sequelize/LessonRepository')


exports.showLessonList = (req, res, next) => {
    console.log(req.session.loggedUser)
    // logged user is student - show lessons with him
    if (req.session.loggedUserType == "student") {
        LessonRepository.getLessonByStuId(req.session.loggedUser._id)
        // LessonRepository.getLessons()
            .then(lessns => {
                res.render('lessonsPage/lesson', {
                    lessns: lessns,
                    navLocation: 'lesson'
                });
            })
    } else if (req.session.loggedUserType == "teacher") {
        LessonRepository.getLessonByInsId(req.session.loggedUser._id)
        // LessonRepository.getLessons()
            .then(lessns => {
                res.render('lessonsPage/lesson', {
                    lessns: lessns,
                    navLocation: 'lesson'
                });
            })
    } else {
        // for admin show all lessons
        LessonRepository.getLessons()
        // LessonRepository.getLessons()
            .then(lessns => {
                res.render('lessonsPage/lesson', {
                    lessns: lessns,
                    navLocation: 'lesson'
                });
            })
    }
}

exports.showLessonDetails = (req, res, next) => {
    const lesId = req.params.lesId;
    LessonRepository.getLessonById(lesId)
        .then(lesson => {
            res.render('lessonsPage/form', {
                lesson: lesson,
                students: [],
                instructors: [],
                formMode: 'showDetails',
                pageTitle: req.__('enrollment-page.details-lesson-page-title'),
                formAction: '',
                navLocation: 'lesson',
                validationErrors: []
            });
        });
}

exports.showAddLessonForm = (req, res, next) => {
    LessonRepository.getAllStudentsInstructorsVehicles().then(result => {
        res.render('lessonsPage/form', {
            lesson: {},
            students: result.students,
            instructors: result.instructors,
            teacherss: result.teacherss,
            pageTitle: req.__('enrollment-page.add-lesson-page-title'),
            btnLabel: req.__('enrollment-page.buttons.add-new-lesson'),
            formMode: 'createNew',
            formAction: '/lesson/add',
            navLocation: 'lesson',
            validationErrors: []
        });
    })
}

exports.showEditLessonForm = (req, res, next) => {
    const lesId = req.params.lesId;
    LessonRepository.getLessonById(lesId)
        .then(lesson => {
            LessonRepository.getAllStudentsInstructorsVehicles().then(result => {
                res.render('lessonsPage/form', {
                    lesson: lesson,
                    students: result.students,
                    instructors: result.instructors,
                    teacherss: result.teacherss,
                    formMode: 'edit',
                    pageTitle: req.__('enrollment-page.edit-lesson-page-title'),
                    btnLabel: req.__('enrollment-page.buttons.edit-lesson'),
                    formAction: '/lesson/edit',
                    navLocation: 'lesson',
                    validationErrors: []
                });
            })
        });
}


exports.addLesson = (req, res, next) => {
    const lesData = {...req.body};
    console.log("addLesson")
    console.log(lesData)
    LessonRepository.creteLesson(lesData).then( result => {
        res.redirect("/lesson");
    }).catch(err => {
        LessonRepository.getAllStudentsInstructorsVehicles().then(result => {
            res.render('lessonsPage/form', {
                lesson: lesData,
                students: result.students,
                instructors: result.instructors,
                teacherss: result.teacherss,
                pageTitle: req.__('enrollment-page.add-lesson-page-title'),
                btnLabel: req.__('enrollment-page.buttons.add-new-lesson'),
                formMode: 'edit',
                formAction: '/lesson/add',
                navLocation: 'lesson',
                validationErrors: err.errors
            });
        }); 
    });
};

exports.updateLesson = (req, res, next) => {
    const lesId = req.body._id;
    const lesData = {...req.body};
    LessonRepository.updateLesson(lesId, lesData).then( result => {
        res.redirect("/lesson");
    }).catch(err => {
        LessonRepository.getAllStudentsInstructorsVehicles().then(result => {
            res.render('lessonsPage/form', {
                lesson: lesData,
                students: result.students,
                instructors: result.instructors,
                teacherss: result.teacherss,
                formMode: 'edit',
                pageTitle: req.__('enrollment-page.edit-lesson-page-title'),
                btnLabel: req.__('enrollment-page.buttons.edit-lesson'),
                formAction: '/lesson/edit',
                navLocation: 'lesson',
                validationErrors: err.errors
            });
        });
    });
};

exports.deleteLesson = (req, res, next) => {
    const lesId = req.params.lesId;
    LessonRepository.deleteLesson(lesId).then( result => {
        res.redirect("/lesson");
    })
};
