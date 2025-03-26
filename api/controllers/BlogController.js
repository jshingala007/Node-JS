const BlogModel = require('../models/BlogModel');
const createBlog = async (req, res) => {
    try {
        const userid = req.user?._id;
        const { title, content } = req.body;
        let blog = await BlogModel.create({
            userId: userid,
            title: title,
            content: content,
            blogimage: req.file.path
        })
        return res.status(200).send({
            success: true,
            message: 'blog successfully create',
            blog
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
const viewBlog = async (req, res) => {
    try {
        let blogs = await BlogModel.find({ userId: req.user?._id }).populate('userId');
        return res.status(200).send({
            success: true,
            length: blogs.length,
            message: 'blog successfully fetch',
            blogs
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
module.exports = {
    createBlog, viewBlog
}