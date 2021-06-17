const express = require('express')
const router = express.Router()

const folderWithinViews = 'alpha'
const urlPrefix = 'alpha'

require(`../views/${folderWithinViews}/_portal-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/equipment-and-adaptations/_equipment-and-adaptations-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/equipment-and-adaptations-vi/_equipment-and-adaptations-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/employer-countersign/_employer-countersign-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/support-worker/_support-worker-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/travel-to-work/_travel-to-work-routes`)(folderWithinViews, urlPrefix, router)


module.exports = router
