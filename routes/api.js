const express = require('express')
const router = express.Router()
const ctrl = require('../controllers')

router.get('/list',ctrl.api.getList)

module.exports = router