const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const uuidv4 = require("uuid/v4");
const app = express();
const jsonParser = bodyParser.json();
const apiKEY = "2abbf7c3-245b-404f-9473-ade729ed4653";
app.use(morgan('dev'));

function validateApiKey(req, res, next){
    if(!req.headers.authorization){
        res.statusMessage = "Unauthorized request. Please send the API Key.";
        return res.status(401).end();
    }else{
        if(req.headers.authorization === `Bearer ${apiKEY}`){
            next();
        }else if( req.headers.bookapikey === apiKEY){
            next();
        }else if(req.query.apikey == apiKEY){
            next();
        }else{
            res.statusMessage = "Unathorized request. Invalid API Key";
            return res.status(401).end();
        }
    }
}
app.use(validateApiKey);
const listOfBooks = [
    {
        id : uuidv4(),
        title : "The Lord Of The Rings",
        description: "Sauron, the Dark Lord, has gathered to him all the Rings of Power - the means by which he intends to rule Middle-earth. All he lacks in his plans for dominion is the One Ring - the ring that rules them all - which has fallen into the hands of the hobbit, Bilbo Baggins.",
        url: "https://www.bookdepository.com/es/Lord-Rings-J-R-R-Tolkien/9780261102385",
        rating: 9
    },
    { 
         id : uuidv4(),
         title : "The House of the Spirits",
         description: "As a girl, Clara del Valle can read fortunes, make objects move as if they had lives of their own, and predict the future. Following the mysterious death of her sister, Rosa the Beautiful, Clara is mute for nine years. When she breaks her silence, it is to announce that she will be married soon to the stern and volatile landowner Esteban Trueba.",
         url: "https://www.bookdepository.com/es/House-Spirits-Isabel-Allende/9780099528562",
         rating: 8
    },
    {
        id : uuidv4(),
        title : "To Kill A Mockingbird",
        description: "A lawyer's advice to his children as he defends the real mockingbird of Harper Lee's classic novel - a black man falsely charged with the rape of a white girl. Through the young eyes of Scout and Jem Finch, Harper Lee explores with exuberant humour the irrationality of adult attitudes to race and class in the Deep South of the 1930s. The conscience of a town steeped in prejudice, violence and hypocrisy is pricked by the stamina of one man's struggle for justice. But the weight of history will only tolerate so much.",
        url: "https://www.bookdepository.com/es/Kill-Mockingbird-Harper-Lee/9780099549482",
        rating: 9
   }
];
//Getting all bookmarks
app.get('/api/bookmarks', (req, res) => {
    console.log("Getting all bookmarks");

    return res.status(200).json(listOfBooks);
});
//GET by Title
app.get('/api/bookmarksByTitle', (req, res) => {
    console.log("Getting all bookmarks by title");
    console.log(req.query);
    let title = req.query.title;
    if(!title){
        res.statusMessage = "please send the 'title' as parameter.";
        return res.status(406).json();
    }
    let result = listOfBooks.find((bookmark) => {
        if(bookmark.title == title){
            return bookmark;
        }
    });

    if(!result){
        res.statusMessage = `There are no students with the provided 'id= ${id}'.`;
        return res.status(404).end();
    }
    return res.status(200).json(result);
});
//POST
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
    }else{
        let newBookmark = {id, title, description,url,rating};
        listOfBooks.push(newBookmark);
    }
    return res.status(201).json({});
});
//DELETE
app.delete('/api/deleteBookmark:id', (req,res)=>{
    let id = req.query.id;
    if(!id){
        res.statusMessage = "Please send the 'id' to delete a student";
        return res.status(406).end();
    }
    let itemToDelete = listOfBooks.findIndex((bookmark)=>{
        if(bookmark.id === id){
            return true;
        }
    });

        if(itemToDelete < 0){
            res.statusMessage = "That 'id' was not found in the list of bookmarks.";
            return res.status(404).end();
        }
        listOfBooks.splice(itemToDelete,1);
    return res.status(200);
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

    let updatedObject = listOfBooks.findIndex((book) => {
        if (book.id === id) {
            return true;
        }
    });
    if (updatedObject < 0) {
        res.statusMessage = "The 'id' sent was not found in the list of bookmarks";
        return res.status(400).end();
    }
    let title = req.body.title;
    if (!title) {
        listOfBooks[updatedObject].title = title;
    }
    let description = req.body.description;
    if (!description) {
        listOfBooks[updatedObject].description = description;
    }
    let url = req.body.url;
    if (!url) {
        listOfBooks[updatedObject].url = url;
    }
    let rating = req.body.rating;
    if (!rating) {
        listOfBooks[updatedObject].rating = rating;
    }
    return res.status(202).json(listOfBooks[updatedObject]);

});

app.listen(8080, () =>{
    console.log("This server is running on port 8080");
});
