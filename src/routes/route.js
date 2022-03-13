const express = require('express');
const router = express.Router();

const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})



router.post("/createBook", BookController.createBook  )

router.get("/bookList", BookController.bookList )

router.post("/year", BookController.year )

router.post("/particularBooks", BookController.particularBooks )

router.get("/getXINRPrice", BookController.getXINRPrice )

router.get("/getRandomBooks", BookController.getRandomBooks)



module.exports = router;


