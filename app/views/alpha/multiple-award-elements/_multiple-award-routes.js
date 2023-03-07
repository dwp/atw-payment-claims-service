module.exports = function (folderForViews, urlPrefix, router) {

  router.post('/multiple-award-elements/employers-grant-information', function (req, res) {
    const award = req.session.data['journey-type']

    if (award === 'traveltowork') {
      res.redirect(`/${urlPrefix}/portal-screens/grant-information`)
    } else if (award === 'specialaidsandequipment') {
      res.redirect(`/${urlPrefix}/portal-screens/grant-information`)
    } else if (award === 'wrong-award') {
      res.redirect(`/${urlPrefix}/multiple-award-elements/contact-dwp`)
    }
  })


  router.post('/multiple-award-elements/start-a-claim', function (req, res) {
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
