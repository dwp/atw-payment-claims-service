module.exports = function (folderForViews, urlPrefix, router) {
  router.get('/multiple/start-a-claim', function (req, res) {
    res.render(`./${folderForViews}/travel-to-work/start-a-claim`)
  })

  router.post('/multiple-award-elements/multiple-awards-answers', function (req, res) {
    const award = req.session.data['journey-type']

    if (award === 'traveltowork') {
      res.redirect(`/${urlPrefix}/travel-to-work/grant-information`)
    } else if (award === 'specialaidsandequipment') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations/grant-information`)
    } else if (award === 'wrong-award') {
      res.redirect(`/${urlPrefix}/multiple-award-elements/contact-dwp`)
    }
  })


}
