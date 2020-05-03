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
        return bookmarkColletion
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
   
     //CHANGE iooijoijojoi
        updateBookmark: function(id,title,description,url,rating){
            return bookmarksColletion
            .findOne({id:query},function(err,res){
                if(err){
                    return err;
                }
                if(res === null){
                    return res;
                }
                if(title){
                    res.title = title;
                }
                if(description){
                    res.description = description;
                }
                if(url){
                    res.url = url;
                }
                if(rating){
                    res.rating = Number(rating);
                }
                res.save().then(res=>{
                    return res;
                })
                .catch(err =>{
                    return err;
                })
            })
            .then(result =>{
                return result;
            })
            .catch(err=>{
                return err
            })
        }

     
    }


module.exports = { Bookmarks };