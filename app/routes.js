const express = require('express')
const router = express.Router()

var newclaimsroutes = require('./views/alpha/newclaim/_new-claim-routes');

router.use('/',newclaimsroutes);

module.exports = router
