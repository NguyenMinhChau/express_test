const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const Course = mongoose.Schema(
    {
        _id: {type: Number},
        image: { type: String },
        title: { type: String, required: true },
        description: { type: String },
        videoId: { type: String, required: true },
        slug: { type: String, slug: 'title', unique: true },
    },
    {
        _id: false,
        timestamps: true,
    },
);

Course.plugin(mongooseDelete, { 
    overrideMethods: 'all' ,
    deletedAt : true,
});
Course.plugin(AutoIncrement);

module.exports = mongoose.model('Course', Course);
