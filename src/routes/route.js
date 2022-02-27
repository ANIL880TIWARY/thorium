const express = require('express');
const router = express.Router();

router.get('/students/:user', function (req, res) {
    let studentName = req.params.user
    console.log(studentName)
    res.send(studentName)
})
//problem 1
router.get('/movies', function (req, res) {
    let mov = ["anil", "kumar", "tiwary", "dhanbad"]
    res.send(mov)

})



//Problem 2
router.get('/movies/:moviesid', function (req, res) {
    let mov = ["anil", "kumar", "tiwary", "dhanbad"]
    let value = req.params.moviesid;
    if (value>mov.lenght -1) {
         res.send("ERROR") 
        }
    else {
         res.send(mov[value])
         }

})

//problem 3


module.exports = router;
