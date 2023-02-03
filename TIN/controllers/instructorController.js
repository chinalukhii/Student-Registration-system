const InstructorRepository = require('../repository/sequelize/InstructorRepository')


exports.showInstructorList = (req, res, next) => {
    InstructorRepository.getInstructors()
        .then(insts => {
            res.render('coursePage/course', {
                insts: insts,
                navLocation: 'course'
            });
        })
}


exports.showInstructorDetails = (req, res, next) => {
    const insId = req.params.insId;
    InstructorRepository.getInstructorById(insId)
        .then(inst => {
            res.render('coursePage/form', {
                inst: inst,
                formMode: 'showDetails',
                pageTitle: req.__('courses_page.details-courses_page-title'),
                formAction: '',
                navLocation: 'course',
                validationErrors: []
            });
        });
}

exports.showAddInstructorForm = (req, res, next) => {
    res.render('coursePage/form', {
        inst: {},
        pageTitle: req.__('courses_page.add-courses_page-title'),
        btnLabel: req.__('courses_page.buttons.add-new-course'),
        formMode: 'createNew',
        formAction: '/course/add',
        navLocation: 'course',
        validationErrors: []
    });
}

exports.showEditInstructorForm = (req, res, next) => {
    const insId = req.params.insId;
    InstructorRepository.getInstructorById(insId)
        .then(inst => {
            console.log(inst)
            res.render('coursePage/form', {
                inst: inst,
                formMode: 'edit',
                pageTitle: req.__('courses_page.edit-course-page-title'),
                btnLabel: req.__('courses_page.buttons.edit-course'),
                formAction: '/course/edit',
                navLocation: 'course',
                validationErrors: []
            });

        });
}

exports.addInstructor = (req, res, next) => {
    const insData = {...req.body};
   
    console.log(insData);
    InstructorRepository.createInstructor(insData).then( result => {
        res.redirect("/course");
    }).catch(err => {
       
        res.render('coursePage/form', {
            inst: insData,
            pageTitle: req.__('courses_page.add-courses_page-title'),
            btnLabel: req.__('courses_page.buttons.add-new-course'),
            formMode: 'createNew',
            formAction: '/course/add',
            navLocation: 'course',
            validationErrors: err.errors
        });
    });
};

exports.updateInstructor = (req, res, next) => {
    const insId = req.body._id;
    const insData = {...req.body};
  
    InstructorRepository.updateInstructor(insId, insData).then( result => {
        res.redirect("/course");
    }).catch(err => {
        
         res.render('coursePage/form', {
            inst: insData,
            formMode: 'edit',
            pageTitle: req.__('courses_page.edit-course-page-title'),
            btnLabel: req.__('courses_page.buttons.edit-course'),
            formAction: '/course/edit',
            navLocation: 'course',
            validationErrors: err.errors
        });
    });
};

exports.deleteInstructor = (req, res, next) => {
    const insId = req.params.insId;
    InstructorRepository.deleteInstructor(insId).then( result => {
        res.redirect("/course");
    });
};

