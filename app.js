const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog')

// express app
const app = express();

//connect to MongoDB
const mongoURI = 'mongodb://127.0.0.1:27017/node-tuts'
mongoose.connect(mongoURI,{ useNewUrlParser: true ,useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//Register View Engine
app.set('view engine','ejs');

//Middleware & Static 
app.use(express.static('public'))

//Mongoose and mongo sandbox routes
app.get('/add-blog',(req,res) => {
    const blog = new Blog({
        title : 'new blog 2',
        description : 'about my new blog',
        body : 'about my new blog'
    });
    blog.save()
        .then((result) =>{
            res.send(result)
        })
        .catch(err => console.log(err));
})

app.get('/all-blogs',  (req, res) => {
    Blog.find()
        .then((result) =>{
            res.send(result)
        })
        .catch(err => console.log(err));
})
app.get('/find-blogs/:id',  (req, res) => {
    Blog.findOne({title: req.params.id})
        .then((result) =>{
            res.send(result)
        })
        .catch(err => console.log(err));
})
//Routes
app.get('/', (req,res) => {
    const blogs = [
    {title: 'Yoshi finds eggs', description: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', description: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', description: 'Lorem ipsum dolor sit amet consectetur'},
  ];
    res.render('index',{title: 'Home' , blogs});
});

app.get('/about', (req,res) => {
    res.render('about',{title: 'About'});
});

app.get('/blogs/create',(req,res) => {
    res.render('create',{title: 'Create Blog'});
})

//redirects
app.get('/about-us', (req,res) => {
    res.redirect('/about')
})


app.use((req,res) => {
    res.status(404).render('404',{title:'404'});
});

//listen for requests
//app.listen(3000);