const mongoose = require('mongoose');
const blogSchema = mongoose.Schema({
    userId: {
        type    : mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    blogimage: {
        type: String,
        required: true
    }
})
const blog = mongoose.model('blog', blogSchema);
module.exports = blog;