module.exports = function (folderForViews, urlPrefix, router) {
  router.get('/equipment-and-adaptations/start-a-claim', function (req, res) {

    res.render(`./${folderForViews}/equipment-and-adaptations/start-a-claim`)
  })

  router.post('/equipment-and-adaptations/test-answer', function (req, res) {
    const test = req.session.data.test
    if (test === 'New') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations/special-aids-and-equipment`)
    } else if (test === 'Repeat') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations/test-2`)
    }
  })

  // Information on how to make a get

  // router.get('/equipment-and-adaptations/test-2', function (req, res) {
  //   res.render(`./${folderForViews}/equipment-and-adaptations/test-2`)
  // });
  // router.get('/equipment-and-adaptations/before-you-continue', function (req, res) {
  //   res.render(`./${folderForViews}/equipment-and-adaptations/before-you-continue`)
  // });
  //
  //
  // //aids and equipment
  //
  // // get
  // router.get('/equipment-and-adaptations/special-aids-and-equipment', function (req, res) {
  //   res.render(`./${folderForViews}/equipment-and-adaptations/special-aids-and-equipment`)
  // });

  // post - aids and equipment answer
  router.post('/equipment-and-adaptations/aids-and-equipment-answer', function (req, res) {
    const aids = req.session.data['aids-and-equipment']

    if (aids === 'Yes') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations/before-you-continue`)
    } else if (aids === 'No') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations/contact-dwp`)
    }
  })

  // post - who purchased the equipment
  router.post('/equipment-and-adaptations/purchase-answer', function (req, res) {
    const purchase = req.session.data['purchase-equipment']

    if (purchase === 'Me') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations/cost-sharing`)
    } else if (purchase === 'My-employer') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations/cost-sharing`)
    } else if (purchase === 'Someone-else') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations/someone-else`)
    }
  })

  // post - additional equipement purchased?
  router.post('/equipment-and-adaptations/additional-equipment-answer', function (req, res) {
    const equipment = req.session.data['additional-equipment']

    if (equipment === 'No') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations/information-about-the-purchaser`)
    } else if (equipment === 'Yes') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations/test-2`)
    }
  })

  // post - Digital upload
  router.post('/equipment-and-adaptations/digital-upload-answer', function (req, res) {
    const upload = req.session.data['digital-upload']

    if (upload === 'Yes') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations/providing-evidence`)
    } else if (upload === 'No') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations/claim-via-post`)
    }
  })

  // Cost sharing
  router.post('/equipment-and-adaptations/cost-sharing-answer', function (req, res) {
    const cost = req.session.data['cost-sharing']

    if (cost === 'No') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations/banking-details`)
    } else if (cost === 'Yes') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations/additional-cost-sharing`)
    }
  })

  // add more equipment

  // post - Add more hours
  router.post('/equipment-and-adaptations/equipment-more', function (req, res) {
    const addMoreEquipment = req.session.data['add-equipment']
    console.log(req.session.data['equipment'])
    if (addMoreEquipment === 'Yes') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations/description`)
    } else if (addMoreEquipment === 'No' && (req.session.data.equipment === undefined || req.session.data.equipment.length == 0)) {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations/no-hours-entered`)
    } else {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations/hours-confirmation`)
    }
  })

  router.post('/equipment-and-adaptations/before-you-continue', function (req, res) {
    res.redirect(`/${urlPrefix}/equipment-and-adaptations/description`)
  })

  router.post('/equipment-and-adaptations/description', function (req, res) {
    res.redirect(`/${urlPrefix}/equipment-and-adaptations/date-of-purchase`)
  })
}
