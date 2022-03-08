const UserModel= require("../models/userModel")
const BookModel = require("../models/bookModel")

const createUser= async function (req, res) {
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}

const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}

const newBook =  async  function(req, res){
    let data =req.body
    let saveData =await BookModel.create(data)
    res.send({msg:saveData})
}

const getBook = async function (req,res){
    let allBook =await BookModel.find()
    res.send({msg:allBook})
}



module.exports.createUser= createUser
module.exports.getUsersData= getUsersData
module.exports.newBook=newBook
module.exports.getBook=getBook