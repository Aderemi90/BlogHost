//Creating a schema and models for blogs

const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Schema is the thing that will define the structure of the document that will be stored inside a collection
// Schema is what a model wraps around
const blogSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    snippet:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    }
}, {timestamps: true});

// Creating a model //

// This will be based on the blog schema, the model wraps around the schema and provides us with
// an interface by which to communicate with the database collection//
// Names of models are given a capital letter

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog;