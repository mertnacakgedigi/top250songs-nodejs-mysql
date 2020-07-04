const express = require('express')
const router = express.Router()
const ctrl = require('../controllers')

router.get('/list',ctrl.api.getList)
router.post('/rating',ctrl.api.postRating)
router.post('/userrating',ctrl.api.getUserRating)

module.exports = router