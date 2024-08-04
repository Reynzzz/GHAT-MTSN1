const express = require('express')
const router = express.Router()
const routerClient =  require('./router')

router.use('/',routerClient)

module.exports = router