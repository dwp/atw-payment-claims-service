const express = require('express')
const router = express.Router()

const folderWithinViews = 'alpha'
const urlPrefix = 'alpha'

require(`../views/${folderWithinViews}/newclaim/_new-claim-routes`)(folderWithinViews, urlPrefix, router)

module.exports = router
