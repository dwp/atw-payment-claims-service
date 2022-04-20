module.exports = function (folderForViews, urlPrefix, router) {
  router.get('/multiple/start-a-claim', function (req, res) {
    res.render(`./${folderForViews}/travel-to-work/start-a-claim`)
  })

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


}
