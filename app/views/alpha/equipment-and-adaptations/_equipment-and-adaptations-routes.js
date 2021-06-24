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
  router.post('/equipment-and-adaptations/equipment-summary', function (req, res) {
    console.log(req.session.data.equipment)

    if (req.session.data.equipment === undefined || req.session.data.equipment.length == 0) {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations/no-hours-entered`)
    } else {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations/equipement-cost`)
    }
  })

  router.post('/equipment-and-adaptations/before-you-continue', function (req, res) {
    res.redirect(`/${urlPrefix}/equipment-and-adaptations/description`)
  })

  router.post('/equipment-and-adaptations/description', function (req, res) {
    if (req.session.data.remove !== undefined) {
      console.log('Remove')
      req.session.data.remove = undefined
      req.session.data.equipment.splice(req.session.data.remove, 1)
      res.redirect(`/${urlPrefix}/equipment-and-adaptations/description`)
    } else {
      if (req.session.data.action === 'add') {
        console.log('Add')
        console.log(req.session.data)
        req.session.data.equipment = [...req.session.data.equipment, {
          equipment_name: '',
          day: '',
          month: '',
          year: ''
        }]
        res.redirect(`/${urlPrefix}/equipment-and-adaptations/description`)
      } else {
        console.log('Continue')
        res.redirect(`/${urlPrefix}/equipment-and-adaptations/equipment-summary`)
      }
    }
  })

  // //remove a submission
  // // Get
  // router.get('/equipment-and-adaptations/remove-equipment', function (req, res) {
  //   req.session.data['equipment-to-remove'] = req.query.removeId
  //   res.render(`./${folderForViews}/support-worker/remove-day-hours`)
  // })
  //
  // // post - Remove receipt confirmation
  // router.post('/equipment-and-adaptations/remove-equipment', function (req, res) {
  //   const allhours = req.session.data.hours
  //   const hoursToRemove = req.session.data['equipment-to-remove']
  //   const removeFile = req.session.data['day-hours-remove-confirmation']
  //
  //   if (removeFile === 'Yes') {
  //     allhours.splice(hoursToRemove, 1)
  //   }
  //   req.session.data.hours = allhours
  //   req.session.data['equipment-to-remove'] = null
  //   req.session.data['day-hours-remove-confirmation'] = null
  //   res.redirect(`/${urlPrefix}/equipment-and-adaptations/equipment-summary`)
  // })

  // receipt upload summary
  // post - Submit for upload
  router.post('/equipment-and-adaptations/receipt-upload-add', function (req, res) {
    let allUploads = req.session.data.uploads // This is the running list of files

    const fileToUpload = req.session.data['file-upload'] // User submitted file

    // Stop null pointer
    if (allUploads == null) {
      allUploads = []
    }

    allUploads.push({
      file: fileToUpload
    })

    req.session.data.uploads = allUploads
    res.redirect(`/${urlPrefix}/equipment-and-adaptations/upload-summary`)
  })

  // Get
  router.get('/equipment-and-adaptations/remove-receipt-upload', function (req, res) {
    req.session.data['file-receipt-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/equipment-and-adaptations/remove-receipt-upload`)
  })

  // post - Remove receipt confirmation
  router.post('/equipment-and-adaptations/remove-receipt-upload', function (req, res) {
    const allUploads = req.session.data.uploads
    const fileToDelete = req.session.data['file-receipt-to-remove']
    const removeFile = req.session.data['file-upload-remove']

    if (removeFile === 'Yes') {
      allUploads.splice(fileToDelete, 1)
    }
    req.session.data.uploads = allUploads
    req.session.data['file-receipt-to-remove'] = null
    req.session.data['confirm-file-upload-remove'] = null
    res.redirect(`/${urlPrefix}/support-worker/upload-summary`)
  })

  // Get
  router.get('/equipment-and-adaptations/remove-day-hours', function (req, res) {
    req.session.data['day-hours-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/support-worker/remove-day-hours`)
  })

  // post - Remove receipt confirmation
  router.post('/equipment-and-adaptations/remove-day-hours', function (req, res) {
    const allhours = req.session.data.hours
    const hoursToRemove = req.session.data['day-hours-to-remove']
    const removeFile = req.session.data['day-hours-remove-confirmation']

    if (removeFile === 'Yes') {
      allhours.splice(hoursToRemove, 1)
    }
    req.session.data.hours = allhours
    req.session.data['day-hours-to-remove'] = null
    req.session.data['day-hours-remove-confirmation'] = null
    res.redirect(`/${urlPrefix}/support-worker/hours-for-day-summary`)
  })

  // post - Add more receipts
  router.post('/equipment-and-adaptations/receipt-upload-more', function (req, res) {
    const anotherReceipt = req.session.data['add-another-receipt']
    if (anotherReceipt === 'Yes') {
      // Reset to stop pre-population of previous visit to page
      req.session.data['file-upload'] = null

      res.redirect(`/${urlPrefix}/equipment-and-adaptations/receipt-upload`)
    } else {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations/banking-details`)
    }
  })
}
