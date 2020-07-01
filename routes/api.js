const express = require('express')
const router = express.Router()
const ctrl = require('../controllers')

router.get('/list',ctrl.api.getList)
router.get('/rating',ctrl.api.getRating)
router.post('/rating',ctrl.api.postRating)
router.get('/userRating',ctrl.api.getUserRating)

module.exports = router