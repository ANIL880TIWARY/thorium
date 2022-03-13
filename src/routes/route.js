const express = require('express');

const router = express.Router();



const bookController = require('../controllers/bookController')

router.post('/createBook', bookController.createBook)

router.post('/createAuthor', bookController.createAuthor)


router.get('/allBooks', bookController.allBooks)

router.get('/updatedBookPrice', bookController.upadatedBookPrice)

router.get('/authorsName', bookController.authorsName)

module.exports = router;