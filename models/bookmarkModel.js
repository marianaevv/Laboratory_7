const mongoose = require ('mongoose');
const uuid = require("uuid");

const bookmarkCollectionSchema = mongoose.Schema({
    id :{
        type: uuid,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    }
});

const bookmarkCollection = mongoose.model('bookmarks', bookmarkCollectionSchema);

const Bookmarks = {
    createBookmark : function(newBookmark){
        return bookmarkCollection 
            .create(newBookmark)
            .then (createdBookmark =>{
                return createdStudent;
            })
            .catch(err =>{
                return err;
            })
    },
    getAllBookmarks : function(){
        return bookmarkCollection
            .find()
            .then( allBookmarks =>{
                return allBookmarks;
            })
            .catch (err=>{
                return err;
            });
    },
    getABookmarkByTitle : function(title){
        return bookmarkCollection
            .find({title:title})
            .then( book =>{
                return book;
            })
            .catch (err=>{
                return err;
            });
    },

    removeBookmark: function (id) {
        return bookmarkCollection
                      .deleteOne({
                id:id
            })
            .then(book =>{
                return book
            })
            .catch(err=>{
                return err
            });
    },
   
        updateBookmark: function(id,title,description,url,rating){
            return bookmarkCollection
            .updateOne({id : id}, {$set:newItems})
            .then( results =>{
                return results;
            })
            .catch( err => {
                return err;
            });
        }
    }

module.exports = { Bookmarks };