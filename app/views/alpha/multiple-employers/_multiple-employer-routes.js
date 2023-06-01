module.exports = function (folderForViews, urlPrefix, router) {

  router.post('/multiple-employers/multiple-employer-answers', function (req, res) {
    const employer = req.session.data['journey-type']

    if (employer === 'multipleawards') {
      res.redirect(`/${urlPrefix}/multiple-award-elements/start-a-claim`)
    } else if (employer === 'supportworker') {
      res.redirect(`/${urlPrefix}/support-worker/support-for-workplace`)
    } else if (employer === 'wrong-award') {
      res.redirect(`/${urlPrefix}/multiple-employers/contact-dwp`)
    }
  })

  router.post('/multiple-employers/start-a-claim', function (req, res) {
    const employer = req.session.data['journey-type']

    if (employer === 'wrong-award') {
      res.redirect(`/${urlPrefix}/multiple-employers/contact-dwp`)
    }
    else{
      res.redirect(`/${urlPrefix}/travel-to-work/grant-information`)
    }

  })


}
