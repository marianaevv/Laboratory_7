const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const uuidv4 = require("uuid/v4");
const { Bookmarks } = require ('./bookmarkModel');
const mongoose = require ('mongoose');
const app = express();
const jsonParser = bodyParser.json();
app.use(morgan('dev'));

const auth = require("./middleware/authValidation");
app.use(auth);

//Getting all bookmarks 
app.get('/api/bookmarks', (req, res) => {
    console.log("Getting all bookmarks");
    Bookmarks
        .getAllBookmarks()
        .then (result =>{
            return res.status(200).json(result);
        });

});
//GET by Title
app.get('/api/bookmarksByTitle', (req, res) => {
    console.log("Getting bookmark by title");
    let title = req.query.title;
    if(!title){
        res.statusMessage = "please send the 'title' as parameter.";
        return res.status(406).json();
    }
   Bookmarks
        .getABookmarkByTitle(title)
        .then (book =>{
            if(book.length > 0){
             return res.status(200).json(book);   
            }else{
                res.statusMessage = "The book was not found";
                return res.status(404).end();
            } 
        });
});
//POST - DATABASE CHANGE
app.post('/api/createBookmark',jsonParser, (req,res)=>{
    console.log("Adding a new bookmark to the list");
    console.log("Body", req.body);
    let id = uuidv4();
    let title = req.body.title;
    let description = req.body.description;
    let url = req.body.url;
    let rating = req.body.rating;

    if (!id || !title || !description || !url || !rating){
        res.statusMessage = `One of this parameters is missing in the request:'title' or 'description' or 'url' or 'rating'.`;
        return res.status(406).end();
    }
    const newBookmark = { id,title,description,url,rating};
    Bookmarks
        .createBookmark(newBookmark)
        .then (result =>{
            return res.status(201).json(result);
        })
        .catch(err=>{
            res.statusMessage = "Something went wrong with the database";
            return res.status(500).end();
        });
});
//DELETE
app.delete('/api/deleteBookmark', (req,res)=>{
    let id = req.query.id;
    if(!id){
        res.statusMessage = "Please send the 'id' to delete a student";
        return res.status(406).end();
    }
    Bookmarks
    .removeBookmark(id)
    .then(book =>{
        return res.status(200).json({});
    })
    .catch(book =>{
        res.statusMessage ="ERROR";
        return res.status(500).end();
    })
});

app.patch('/bookmark/:id', jsonParser, (req, res) => {
    let idBody = req.body.id;
    let idParam = req.params.id;
    if (!idBody || !idParam) {
        res.statusMessage = "The id is missing in your query."
        return res.status(406).end();
    }
    if (idBody != idParam) {
        res.statusMessage = "The 'id' sent in the body and the 'id' sent through the path parameters are different.";
        return res.status(409).end()
    }
    let title = req.body.title;
    let description = req.body.description;
    let url = req.body.url;
    let rating = req.body.rating;
    Bookmarks.updateBookmark(bodyId,title,description,url,rating)
    .then(itemToUpdate =>{
        if(itemToUpdate){
            res.statusMessage = "The post has been updated";
            return res.status(202).end();
        }
        else{
            res.statusMessage = "The id was not found";
            return res.status(400).end();
        }
    })
    .catch(err=>{
        res.statusMessage = "Something went wrong.";
        return res.status(500).end();
    })
});

app.listen(8080, () =>{
    console.log("This server is running on port 8080");

    new Promise ((resolve, reject) =>{
        mongoose.connect('mongodb://localhost/bookmarksdb', {useNewUrlParser: true, useUnifiedTopology:true}, (err)=>{
           if(err){
               reject(err);
           }else{
               console.log("Database connected successfully");
               return resolve();

           }
        })
    })
    .catch(err=>{
        mongoose.disconnect();
        console.log(err);
    })
});
//http://localhost:8080/api/bookmarksByTitle?title=The Lord Of The Rings