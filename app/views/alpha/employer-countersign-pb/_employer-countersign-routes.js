module.exports = function (folderForViews, urlPrefix, router) {

  // post - aids and equipment answer
  router.post('/employer-countersign-pb/employer-countersign-answer', function (req, res) {
    const employer = req.session.data['employer-agree']

    if (employer === 'Yes') {
      res.redirect(`/${urlPrefix}/employer-countersign-pb/declaration`)
    } else if (employer === 'No') {
      res.redirect(`/${urlPrefix}/employer-countersign-pb/claim-incorrect`)
    }
  })

  router.post('/employer-countersign-pb/claim-number-answer', function (req, res) {
    const claim = req.session.data['do-you-know-claim-number']

    if (claim === 'Yes') {
      res.redirect(`/${urlPrefix}/employer-countersign-pb/enter-citizen-urn`)
    } else if (claim === 'No') {
      res.redirect(`/${urlPrefix}/employer-countersign-pb/cannot-countersign`)
    }
  })

  router.post('/employer-countersign-pb/review-the-claim-answer', function (req, res) {
    const correctclaim = req.session.data['correct-claim']

    if (correctclaim === 'Yes') {
      res.redirect(`/${urlPrefix}/employer-countersign-pb/before-you-continue`)
    } else if (correctclaim === 'No') {
      res.redirect(`/${urlPrefix}/employer-countersign-pb/view-wrong-claim`)
    }
  })

  router.post('/employer-countersign-pb/one-time-code-answer', function (req, res) {
    const onetimecode = req.session.data['one-time-code']

    if (onetimecode === '246135' || onetimecode === '135246') {
      res.redirect(`/${urlPrefix}/employer-countersign-pb/one-time-code`)
    } else if (onetimecode === '222444') {
      res.redirect(`/${urlPrefix}/employer-countersign-pb/incorrect-one-time-code`)
    } else {
      res.redirect(`/${urlPrefix}/employer-countersign-pb/employees-claim`)
    }
  })


}
