const express = require('express')
const router = express.Router()

const folderWithinViews = 'alpha'
const urlPrefix = 'alpha'

require(`../views/${folderWithinViews}/newclaim/_new-claim-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/employer-countersign/_employer-countersign-routes`)(folderWithinViews, urlPrefix, router)



module.exports = router
