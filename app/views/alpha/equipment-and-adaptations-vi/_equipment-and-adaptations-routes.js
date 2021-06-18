module.exports = function (folderForViews, urlPrefix, router) {
  router.get('/equipment-and-adaptations-vi/start-a-claim', function (req, res) {

    res.render(`./${folderForViews}/equipment-and-adaptations-vi/start-a-claim`)
  })

  router.post('/equipment-and-adaptations-vi/test-answer', function (req, res) {
    const test = req.session.data.test
    if (test === 'New') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-vi/special-aids-and-equipment`)
    } else if (test === 'Repeat') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-vi/test-2`)
    }
  })

  // Information on how to make a get

  // router.get('/equipment-and-adaptations-vi/test-2', function (req, res) {
  //   res.render(`./${folderForViews}/equipment-and-adaptations-vi/test-2`)
  // });
  // router.get('/equipment-and-adaptations-vi/before-you-continue', function (req, res) {
  //   res.render(`./${folderForViews}/equipment-and-adaptations-vi/before-you-continue`)
  // });
  //
  //
  // //aids and equipment
  //
  // // get
  // router.get('/equipment-and-adaptations-vi/special-aids-and-equipment', function (req, res) {
  //   res.render(`./${folderForViews}/equipment-and-adaptations-vi/special-aids-and-equipment`)
  // });

  // post - aids and equipment answer
  router.post('/equipment-and-adaptations-vi/aids-and-equipment-answer', function (req, res) {
    const aids = req.session.data['aids-and-equipment']

    if (aids === 'Yes') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-vi/before-you-continue`)
    } else if (aids === 'No') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-vi/contact-dwp`)
    }
  })

  // post - who purchased the equipment
  router.post('/equipment-and-adaptations-vi/purchase-answer', function (req, res) {
    const purchase = req.session.data['purchase-equipment']

    if (purchase === 'Me') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-vi/cost-sharing`)
    } else if (purchase === 'My-employer') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-vi/cost-sharing`)
    } else if (purchase === 'Someone-else') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-vi/someone-else`)
    }
  })

  // post - additional equipement purchased?
  router.post('/equipment-and-adaptations-vi/additional-equipment-answer', function (req, res) {
    const equipment = req.session.data['additional-equipment']

    if (equipment === 'No') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-vi/information-about-the-purchaser`)
    } else if (equipment === 'Yes') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-vi/test-2`)
    }
  })

  // post - Digital upload
  router.post('/equipment-and-adaptations-vi/digital-upload-answer', function (req, res) {
    const upload = req.session.data['digital-upload']

    if (upload === 'Yes') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-vi/providing-evidence`)
    } else if (upload === 'No') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-vi/claim-via-post`)
    }
  })

  // Cost sharing
  router.post('/equipment-and-adaptations-vi/cost-sharing-answer', function (req, res) {
    const cost = req.session.data['cost-sharing']

    if (cost === 'No') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-vi/banking-details`)
    } else if (cost === 'Yes') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-vi/additional-cost-sharing`)
    }
  })
}
