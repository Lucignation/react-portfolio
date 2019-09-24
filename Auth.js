const User = require('../models/user');
const Blog = require('../models/blog');
const bcrypt = require('bcryptjs');


exports.getSignup = async (req, res, next) =>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    try{
        const hashPassword = await bcrypt.hash(password, 12);

        const user = new User({
            name: name,
            email: email,
            password: hashPassword
        });

        const result = await user.save();
        res.status(201).json({message: 'User Created', userId: result._id});
    }catch(error){
        console.log(error);
    }
}

exports.postCreateBlog = async (req, res, next) =>{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const content= req.body.content;
    // console.log(req);

    const blog = new Blog({
        title: title,
        imageUrl: imageUrl,
        content: content,
        creator: req.userId,
        createdOn: new Date()
    });
    console.log(req.body);
    try{
        const result = await blog.save();
        // console.log(result);
        res.status(201).json({
            message: 'Posted created Successful!!!!', 
            blogs:{
                _id: new Date().toISOString(), 
                title: title, 
                content: content,
                creator: {name: 'Olumide'},
                createdOn: createdOn
            }
        });
    }catch(error){
        console.log(error);
    }
}