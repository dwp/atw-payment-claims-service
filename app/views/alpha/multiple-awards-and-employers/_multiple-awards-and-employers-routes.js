module.exports = function (folderForViews, urlPrefix, router) {

  router.post('/multiple-awards-and-employers/employers-grant-information', function (req, res) {
    const award = req.session.data['journey-type-secondary']

    if (award === 'traveltowork') {
      res.redirect(`/${urlPrefix}/multiple-awards-and-employers/employers-grant-information`)
    } else if (award === 'specialaidsandequipment') {
      req.session.data['journey-type'] = 'specialaidsandequipment'
      res.redirect(`/${urlPrefix}/portal-screens/grant-information`)
    } else if (award === 'wrong-award') {
      res.redirect(`/${urlPrefix}/multiple-awards-and-employers/contact-dwp`)
    }
  })


  router.post('/multiple-awards-and-employers/start-a-claim', function (req, res) {
    const award = req.session.data['journey-type']

    if (award === 'traveltowork') {
      res.redirect(`/${urlPrefix}/multiple-employers/start-a-claim`)
    } else if (award === 'specialaidsandequipment') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations/grant-information`)
    } else if (award === 'wrong-award') {
      res.redirect(`/${urlPrefix}/multiple-awards-and-employers/contact-dwp`)
    }
  })


}
