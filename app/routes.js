const express = require('express')
const router = express.Router()


var alphaRoutes = require('./routes/alpha');
// var betaRoutes = require('./routes/beta');


router.use('/alpha', alphaRoutes);
// router.use('/beta', betaRoutes);


module.exports = router
