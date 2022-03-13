
const { count } = require("console")
const bookModel= require("../models/bookModel")
const authorModel= require("../models/authorModel")
const createBook= async function (req, res) {
    let data= req.body
    console.log(data);
    let abc= await bookModel.create(data)
    console.log(abc);
    res.send({msg: abc})
}
const createAuthor= async function (req, res) {
    let data= req.body
    let savedData= await authorModel.create(data)
    res.send({msg: savedData})
}
const allBooks = async function(req, res) {
    const authorDetails = await authorModel.find({author_name: "Chetan Bhagat"}).select({author_id:1,_id:0})
    console.log(authorDetails[0])
    const booksName = await bookModel.find(authorDetails[0]).select({bookName:1,_id:0})
    res.send( {msg:booksName})
}
const upadatedBookPrice = async function (req, res) {
    const bookDetails = await bookModel.findOne({bookName:"two states"})
    const id = bookDetails.author_id
    console.log(id)
    const authorN = await authorModel.find({author_id:id}).select({author_name:1, _id:0})
    const bkName = bookDetails.bookName
    console.log(bkName)
    const updatedPrice = await bookModel.findOneAndUpdate({bookName:bkName}, {price:100},{new:true}).select({price:1, _id:0})
    res.send({msg:authorN, updatedPrice}
    )}   
const authorsName = async function (req,res) {
    const booksId= await bookModel.find({price: {$gte:50, $lte:100}}).select({author_id:1, _id:0})
    const id = booksId.map(inp => inp.author_id)
 let temp =[]
    for(let i=0; i<id.length; i++) {
        let x = id[i]
        const author = await authorModel.find({author_id:x}).select({author_name:1, _id:0})
        temp.push(author)
    }
   const authorName = temp.flat()
  res.send({msg:authorName})
}
module.exports.createBook= createBook
module.exports.createAuthor= createAuthor
module.exports.allBooks = allBooks
module.exports.upadatedBookPrice = upadatedBookPrice
module.exports.authorsName = authorsName