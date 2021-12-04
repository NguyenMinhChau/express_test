const Course = require('../models/courses');
const { mutipleObject, singleObject } = require('../util/mongoose');
class MeController {
    //GET[] - /me
    listCourseMe(req, res, next) {
        let courseQuery = Course.find({});
        if(req.query.hasOwnProperty('_sort')){
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            })
        }
        Promise.all([courseQuery, Course.countDeleted({})])
            .then(([course, count]) => res.render('coursesMe/listCourse', {
                course: mutipleObject(course),
                count,
            }))
            .catch(next);
    }
    //GET[] - /me/edit/:id
    listCourseMeUpdate(req, res, next) {
        Course.findById({ _id: req.params.id })
            .then((course) =>
                res.render('coursesMe/updateCourse', {
                    course: singleObject(course),
                }),
            )
            .catch(next);
    }
    s;
    //PUT[] - /me/updated/:id
    listCourseMeUpdated(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then((course) => res.redirect('/me'))
            .catch(next);
    }
    //DELETE[] - /me/delete/:id
    deleteCourseMe(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then((course) => res.redirect('/me'))
            .catch(next);
    }

    //PATCH[] - /me/restore/:id
    listCourseMeRestore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then((course) => res.redirect('/me/destroy'))
            .catch(next);
    }

    //GET[] - /me/destroy
    listCourseMeDestroy(req, res, next) {
        Course.findDeleted({})
        .then((course) => res.render('coursesMe/listCourseDestroy', {
            course: mutipleObject(course),
        }))
        .catch(next);
    }

    //DELETE[] - /me/destroy/:id
    destroyCourseMe(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then((course) => res.redirect('/me/destroy'))
            .catch(next);
    }

    //DELETE[] - /me/handleAction
    handleAction(req, res, next) {
        const { action, courseIds } = req.body;
        switch (action){
            case 'delete':
                Course.delete({ _id: { $in: courseIds } })
                .then(() => res.redirect('/me'))
                .catch(next);
                break;
            default: res.json({ action: action, courseIds: courseIds});
        }
    }

    //DELETE[] - /me/handleActionDestroy
    handleActionDestroy(req, res, next) {
        const { actions, courseIds } = req.body;
        switch (actions){
            case 'restore':
                Course.restore({ _id: { $in: courseIds } })
                .then(() => res.redirect('/me/destroy'))
                .catch(next);
                break;
            case 'deleteMany':
                Course.deleteMany({ _id: { $in: courseIds } })
                .then(() => res.redirect('/me/destroy'))
                .catch(next);
                break;
            default: res.json({ actions: actions, courseIds: courseIds});
        }
    }
}
module.exports = new MeController();
