const express = require('express');
const router = express.Router();
const Blog = require('../models/blog')
router.get('/',(req,res) => {
    Blog.find().sort({createdAt: -1})
        .then((result) => {
            res.render('index',{title:'All blogs', blogs: result});    
        })
        .catch((err) => console.log(err));
    
});

router.post('/',(req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) =>{
            res.redirect('/blogs');
        })
        .catch((err) => console.log(err));
})

router.get('/create',(req,res) => {
    res.render('create',{title: 'Create Blog'});
})
module.exports = router;