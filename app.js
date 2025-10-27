require("dotenv").config();
const express = require('express')
const morgan = require ('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')
const PORT = process.env.PORT || 3000;

//---Express APP---//

const app = express()

//--Connect to MongoDB--//


mongoose.connect(process.env.dbURI).then((result)=>{
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((error)=>{
    console.log(error)
})

app.set('view engine', 'ejs')


app.set('views', 'views')//views-configuration while myejs-folder you want ejs to check

app.use(express.static('public'));
app.use (morgan('dev'));
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)=>{
    
    res.redirect('/blogs')
    // res.render('index', { title: 'Home', blogs: blogs})
})

//--Blog Routes--//
// Moved to blog Routes and imported here to make code cleaner(MVC)
app.use('/blogs', blogRoutes)
//--About Page--//

app.get('/about', (req, res)=>{
    res.render('about', { title: 'About'})
})
//--Redirects--//
app.get('/about-us', (req, res)=>{
    res.redirect('about')
})

app.use((req, res)=>{
    res.status(404).render('404', { title: 'Error'})

})
