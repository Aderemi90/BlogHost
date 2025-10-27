const express = require('express')
const router = express.Router();

const Blog = require('../models/blog.js');

//--Blog Routes--//
// Changed from app to router.

router.get('/', (req, res)=>{
    Blog.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('index',{ title: 'All blogs', blogs: result  })
    })
    .catch((error)=>{
        console.log(error)
    })
})

router.post('/', (req, res)=>{
// we need to use a bit of middleware
// to pass the data been sent into a 
// workable format that we can use and
// attach it to the request(req) object above
// app.use(express.urlencoded({extended: true})) this was used above//
const blog = new Blog(req.body);
blog.save()
.then((result)=>{
res.redirect('/blogs') // After saving to the database above, we want to redirect to the homepage for the user to see the new blog submitted
})
.catch((error)=>{
    console.log(error)
})
})

//--Create Blogs--//
router.get('/create', (req, res)=>{
    res.render('create', { title: 'Create'})
})

router.get('/:id', (req, res)=>{
//Extracting the id(route parameter) from the URL in a request handler
//route parameter denoted with a colon then id(:id)
const id = req.params.id; // The id name after the params here musr be same with the route params with whats after blog(/blog:id)
Blog.findById(id)
.then((result)=>{
    res.render('details',{blog: result, title: 'Blog Details'})
// We are rendering the details.ejs page, with the full blog details and title
})
.catch((error)=>{
    console.log(error)
})
})

router.delete('/:id', (req, res)=>{
//Extracting the id(route parameter) from the URL in a request handler
//route parameter denoted with a colon then id(:id)
const id = req.params.id; // The id name after the params here must be same with the route params with whats after blog(/blog:id)
Blog.findByIdAndDelete(id)
.then((result)=>{
    res.json({redirect:'/blogs'})
// We are rendering the details.ejs page, with the full blog details and title
})
.catch((error)=>{
    console.log(error)
})
})

module.exports = router;
