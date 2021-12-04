const Course = require('../models/courses');
const { singleObject } = require('../util/mongoose');
class CourseController {
    //GET[] - /course/:slug
    CourseDetail(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/detailCourse', {
                    course: singleObject(course),
                });
            })
            .catch(next);
    }
    //GET[] - /course/addCourse
    AddCourse(req, res, next) {
        res.render('courses/addCourse');
    }
    //POST[] - /course/create
    CreateCourse(req, res, next) {
        const result = new Course({
            ...req.body,
            image: `https://i.ytimg.com/vi/${req.body.videoId}/maxresdefault.jpg`,
        });
        result
            .save()
            .then(() => res.redirect('/me'))
            .catch(next);
    }
}
module.exports = new CourseController();
