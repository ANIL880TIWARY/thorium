const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: {
        type:String,
        required:true
    },
    authorName: String, 
    tags: [String],
    
    isPublished: Boolean,
    prices: {
        indianPrice: String,
        europePrice: String,
    },
   
    year:{
        type:Number,
        default:2021,
    },
    totalPages:Number,
    stokAvailable:Boolean
}, { timestamps: true });


module.exports = mongoose.model('BooksLibray', bookSchema) 
