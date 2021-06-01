const express = require('express')
const router = express.Router()

const folderWithinViews = 'alpha'
const urlPrefix = 'alpha'

require(`../views/${folderWithinViews}/equipment-and-adaptations/_equipment-and-adaptations-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/employer-countersign/_employer-countersign-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/support-worker/_support-worker-routes`)(folderWithinViews, urlPrefix, router)

module.exports = router
