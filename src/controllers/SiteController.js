const Course = require('../models/courses');
const { mutipleObject } = require('../util/mongoose');
class SiteController {
    homePage(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.render('home', {
                    courses: mutipleObject(courses),
                }),
            )
            .catch(next)
    }
}
module.exports = new SiteController();
