const blogModel = require('../model/blogmodel');
const userModel = require('../model/usermodel');
const mongoose = require('mongoose');

// GET All BLOGS
exports.getAllBlogController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate('user');
        return res.status(200).send({
            success: true,
            BlogCount: blogs.length,
            message: 'All Blogs List',
            blogs: blogs || [],
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error while fetching blogs',
            error: error.message,
        });
    }
};

// Create Blog
exports.createBlogController = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;

        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields',
            });
        }

        const existingUser = await userModel.findById(user);

        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        const newBlog = new blogModel({ title, description, image, user });
        await newBlog.save();

        existingUser.blogs.push(newBlog);
        await existingUser.save();

        return res.status(201).send({
            success: true,
            message: 'Blog Created!',
            blog: newBlog,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error while creating blog',
            error: error.message,
        });
    }
};

// Update Blog
exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;

        const blog = await blogModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!blog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found',
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Blog Updated!',
            blog,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send({
            success: false,
            message: 'Error while updating blog',
            error: error.message,
        });
    }
};

// Get Single Blog
exports.getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id).populate('user');

        if (!blog) {
            return res.status(404).send({
                success: false,
                message: 'Blog not found',
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Fetched single blog',
            blog,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send({
            success: false,
            message: 'Error while getting single blog',
            error: error.message,
        });
    }
};

// Delete Blog
exports.deleteBlogController = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the blog by ID
        const blog = await BlogModel.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        // Find the user who owns the blog
        const user = await UserModel.findById(blog.user);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Remove the blog ID from the user's blogs array
        user.blogs = user.blogs.filter(blogId => blogId.toString() !== id);
        await user.save();

        // Delete the blog
        await BlogModel.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// GET Blogs by User
exports.userBlogController = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs");

        if (!userBlog) {
            return res.status(404).send({
                success: false,
                message: 'Blogs not found for this user ID',
            });
        }

        return res.status(200).send({
            success: true,
            message: 'User blogs fetched successfully',
            userBlog,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send({
            success: false,
            message: 'Error while fetching user blogs',
            error: error.message,
        });
    }
};
