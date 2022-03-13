const { count } = require("console")
const BookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}


const bookList= async function(req, res){

    let bookslist = await BookModel.find().select( { bookName: 1, authorName: 1, _id: 0});
          res.send({msg: bookslist})
}

const year = async function( req, res){
    let data = req.body.year
    console.log(data)
    let booklist = await BookModel.find({year : {$eq:data}}).select({authorName:1, _id:0})
    res.send({msg: booklist});
}



const particularBooks = async function( req, res){
    let inputData = req.body;
    let booklist = await BookModel.find(inputData).select({bookName:1, _id:0})
    res.send({msg: booklist});
}

const getXINRPrice = async function( req, res){
    let booklist = await BookModel.find({"prices.indianPrice":{$in:["100","200","500"]}})
    res.send({msg: booklist});
}

const getRandomBooks = async function( req, res){
    let booklist = await BookModel.find({$or:[{totalPages:{$gt:500}},{stockAvailable:{$eq:true}}]})
    res.send({msg: booklist});
}




module.exports.createBook= createBook
module.exports.bookList=bookList
module.exports.year=year
module.exports.particularBooks=particularBooks
module.exports.getXINRPrice=getXINRPrice
module.exports.getRandomBooks=getRandomBooks