module.exports = function (folderForViews, urlPrefix, router) {

  // post - aids and equipment answer
  router.post('/employer-countersign/employer-countersign-answer', function (req, res) {
    const employer = req.session.data['employer-agree']

    if (employer === 'Yes') {
      res.redirect(`/${urlPrefix}/employer-countersign/declaration`)
    } else if (employer === 'No') {
      res.redirect(`/${urlPrefix}/employer-countersign/claim-incorrect`)
    }
  })

  router.post('/employer-countersign/claim-number-answer', function (req, res) {
    const claim = req.session.data['do-you-know-claim-number']

    if (claim === 'Yes') {
      res.redirect(`/${urlPrefix}/employer-countersign/enter-citizen-urn`)
    } else if (claim === 'No') {
      res.redirect(`/${urlPrefix}/employer-countersign/cannot-countersign`)
    }
  })

  router.post('/employer-countersign/review-the-claim-answer', function (req, res) {
    const correctclaim = req.session.data['correct-claim']

    if (correctclaim === 'Yes') {
      res.redirect(`/${urlPrefix}/employer-countersign/before-you-continue`)
    } else if (correctclaim === 'No') {
      res.redirect(`/${urlPrefix}/employer-countersign/view-wrong-claim`)
    }
  })



}
