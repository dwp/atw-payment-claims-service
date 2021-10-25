const express = require('express')
const router = express.Router()

const folderWithinViews = 'alpha'
const urlPrefix = 'alpha'

require(`../views/${folderWithinViews}/_portal-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/equipment-and-adaptations/_equipment-and-adaptations-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/equipment-and-adaptations-vi/_equipment-and-adaptations-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/employer-countersign/_employer-countersign-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/support-worker/_support-worker-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/support-worker-dev/_support-worker-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/support-worker-old/_support-worker-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/support-worker-old-two/_support-worker-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/travel-to-work/_travel-to-work-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/travel-to-work-dev/_travel-to-work-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/travel-in-work/_travel-in-work-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/travel-to-work-old/_travel-to-work-routes`)(folderWithinViews, urlPrefix, router)
require(`../views/${folderWithinViews}/multiple-award-elements/_multiple-award-routes`)(folderWithinViews, urlPrefix, router)


module.exports = router
