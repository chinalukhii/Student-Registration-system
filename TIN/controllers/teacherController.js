const TeacherRepository = require('../repository/sequelize/TeacherRepository')


exports.showVehicleList = (req, res, next) => {
    console.log("showVehicleList")
    TeacherRepository.getTeachers()
        .then(teacherss => {
            res.render('teachersPage/tchers', {
                teacherss: teacherss,
                navLocation: 'tcher'
            });
        })
}

exports.shoeTeacherDetails = (req, res, next) => {
    const texId = req.params.texId;
    console.log("shoeTeacherDetails")
    TeacherRepository.getTeacherById(texId)
        .then(tcher => {
            console.log(tcher)
            res.render('teachersPage/form', {
                tcher: tcher,
                formMode: 'showDetails',
                pageTitle: req.__('teacherss-page.details-tcher-page-title'),
                formAction: '',
                navLocation: 'tcher',
                validationErrors: []
            });
        });
};

exports.showAddTeacherForm = (req, res, next) => {
    res.render('teachersPage/form', {
        tcher: {},
        pageTitle: req.__('teacherss-page.add-tcher-page-title'),
        formMode: 'createNew',
        btnLabel: req.__('teacherss-page.buttons.add-new-tcher'),
        formAction: '/tcher/add',
        navLocation: 'tcher',
        validationErrors: []
    });
}


exports.showEditTeacherForm = (req, res, next) => {
    const texId = req.params.texId;
    TeacherRepository.getTeacherById(texId)
        .then(tcher => {
            console.log(tcher)
            res.render('teachersPage/form', {
                tcher: tcher,
                formMode: 'edit',
                pageTitle: req.__('teacherss-page.edit-tcher-page-title'),
                btnLabel: req.__('teacherss-page.buttons.edit-tcher'),
                formAction: '/tcher/edit',
                navLocation: 'tcher',
                validationErrors: []
            });

        });
};

exports.addTeacher = (req, res, next) => {
    const techData = {...req.body};
    TeacherRepository.createVehicle(techData).then( result => {
        res.redirect("/tcher");
    }).catch(err => {
         res.render('teachersPage/form', {
            tcher: techData,
            pageTitle: req.__('teacherss-page.add-tcher-page-title'),
            formMode: 'createNew',
            btnLabel: req.__('teacherss-page.buttons.add-new-tcher'),
            formAction: '/tcher/add',
            navLocation: 'tcher',
            validationErrors: err.errors
        });
    });
};

exports.updateTeacher = (req, res, next) => {
    const texId = req.body._id;
    const techData = {...req.body};
    TeacherRepository.updateTeacher(texId, techData).then( result => {
        res.redirect("/tcher");
    }).catch(err => {
         res.render('teachersPage/form', {
            tcher: techData,
            formMode: 'edit',
            pageTitle: req.__('teacherss-page.edit-tcher-page-title'),
            btnLabel: req.__('teacherss-page.buttons.edit-tcher'),
            formAction: '/tcher/edit',
            navLocation: 'tcher',
            validationErrors: err.errors
        });
    });
};

exports.deleteTeacher = (req, res, next) => {
    const texId = req.params.texId;
    TeacherRepository.deleteTeacher(texId).then( result => {
        res.redirect("/tcher");
    });
};

