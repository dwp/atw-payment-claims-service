module.exports = function (folderForViews, urlPrefix, router) {

  // post - aids and equipment answer
  router.post('/employer-countersign-dev/employer-countersign-answer', function (req, res) {
    const employer = req.session.data['employer-agree']

    if (employer === 'Yes') {
      res.redirect(`/${urlPrefix}/employer-countersign-dev/declaration`)
    } else if (employer === 'No') {
      res.redirect(`/${urlPrefix}/employer-countersign-dev/claim-incorrect`)
    }
  })

  router.post('/employer-countersign-dev/claim-number-answer', function (req, res) {
    const claim = req.session.data['do-you-know-claim-number']

    if (claim === 'Yes') {
      res.redirect(`/${urlPrefix}/employer-countersign-dev/enter-citizen-urn`)
    } else if (claim === 'No') {
      res.redirect(`/${urlPrefix}/employer-countersign-dev/cannot-countersign`)
    }
  })

  router.post('/employer-countersign-dev/review-the-claim-answer', function (req, res) {
    const correctclaim = req.session.data['correct-claim']

    if (correctclaim === 'Yes') {
      res.redirect(`/${urlPrefix}/employer-countersign-dev/before-you-continue`)
    } else if (correctclaim === 'No') {
      res.redirect(`/${urlPrefix}/employer-countersign-dev/view-wrong-claim`)
    }
  })



}
