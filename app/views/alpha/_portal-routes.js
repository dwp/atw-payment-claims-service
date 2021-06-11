module.exports = function (folderForViews, urlPrefix, router) {

  // post - aids and equipment answer
  router.post('/start-journey', function (req, res) {
    res.redirect(`/${urlPrefix}/portal`)



  })

}
