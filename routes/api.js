const express = require('express')
const router = express.Router()
const ctrl = require('../controllers')

router.get('/list',ctrl.api.getList)
router.get('/rating',ctrl.api.getRating)
router.post('/ratinguser',ctrl.api.postRating)
router.post('/userrating',ctrl.api.getUserRating)

module.exports = router