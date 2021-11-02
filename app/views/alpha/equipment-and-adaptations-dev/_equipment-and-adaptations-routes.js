module.exports = function (folderForViews, urlPrefix, router) {
  router.get('/equipment-and-adaptations-dev/start-a-claim', function (req, res) {
    res.render(`./${folderForViews}/equipment-and-adaptations-dev/start-a-claim`)
  })

  router.post('/equipment-and-adaptations-dev/test-answer', function (req, res) {
    const test = req.session.data.test
    if (test === 'New') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/special-aids-and-equipment`)
    } else if (test === 'Repeat') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/test-2`)
    }
  })

  // Information on how to make a get

  // router.get('/equipment-and-adaptations-dev/test-2', function (req, res) {
  //   res.render(`./${folderForViews}/equipment-and-adaptations-dev/test-2`)
  // });
  // router.get('/equipment-and-adaptations-dev/before-you-continue', function (req, res) {
  //   res.render(`./${folderForViews}/equipment-and-adaptations-dev/before-you-continue`)
  // });
  //
  //
  // //aids and equipment
  //
  // // get
  // router.get('/equipment-and-adaptations-dev/special-aids-and-equipment', function (req, res) {
  //   res.render(`./${folderForViews}/equipment-and-adaptations-dev/special-aids-and-equipment`)
  // });

  // post - aids and equipment answer
  router.post('/equipment-and-adaptations-dev/aids-and-equipment-answer', function (req, res) {
    const aids = req.session.data['aids-and-equipment']

    if (aids === 'Yes') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/grant-information`)
    } else if (aids === 'No') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/contact-dwp`)
    }
  })

  // // post - who purchased the equipment
  // router.post('/equipment-and-adaptations-dev/purchase-answer', function (req, res) {
  //   const purchase = req.session.data['purchase-equipment']
  //
  //   if (purchase === 'Me') {
  //     res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/cost-sharing`)
  //   } else if (purchase === 'My-employer') {
  //     res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/cost-sharing`)
  //   } else if (purchase === 'Someone-else') {
  //     res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/someone-else`)
  //   }
  // })
  //
  // // post - additional equipement purchased?
  // router.post('/equipment-and-adaptations-dev/additional-equipment-answer', function (req, res) {
  //   const equipment = req.session.data['additional-equipment']
  //
  //   if (equipment === 'No') {
  //     res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/information-about-the-purchaser`)
  //   } else if (equipment === 'Yes') {
  //     res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/test-2`)
  //   }
  // })

  // post - Digital upload
  router.post('/equipment-and-adaptations-dev/digital-upload-answer', function (req, res) {
    const upload = req.session.data['digital-upload']

    if (upload === 'Yes') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/providing-evidence`)
    } else if (upload === 'No') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/claim-via-post`)
    }
  })

  // Cost sharing
  router.post('/equipment-and-adaptations-dev/cost-sharing-answer', function (req, res) {
    const cost = req.session.data['cost-sharing']

    if (cost === 'No') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/banking-details`)
    } else if (cost === 'Yes') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/additional-cost-sharing`)
    }
  })

  // add more equipment

  // post - Add more hours
  router.post('/equipment-and-adaptations-dev/equipment-summary', function (req, res) {
    console.log(req.session.data.equipment)
    const checked = req.session.data['contact-confirmed']

    if (req.session.data.equipment === undefined || req.session.data.equipment.length == 0) {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/no-hours-entered`)
    } else if (checked) {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/check-your-answers`)
    } else {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/equipement-cost`)
    }
  })

  router.post('/equipment-and-adaptations-dev/before-you-continue-answer', function (req, res) {
    res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/description`)
  })

  router.post('/equipment-and-adaptations-dev/description', function (req, res) {
    if (req.session.data.remove !== undefined) {
      console.log('Remove')
      req.session.data.remove = undefined
      req.session.data.equipment.splice(req.session.data.remove, 1)
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/description`)
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
        res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/description`)
      } else {
        console.log('Continue')
        res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/equipment-summary`)
      }
    }
  })

  // //remove a submission
  // // Get
  // router.get('/equipment-and-adaptations-dev/remove-equipment', function (req, res) {
  //   req.session.data['equipment-to-remove'] = req.query.removeId
  //   res.render(`./${folderForViews}/support-worker/remove-day-hours`)
  // })
  //
  // // post - Remove receipt confirmation
  // router.post('/equipment-and-adaptations-dev/remove-equipment', function (req, res) {
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
  //   res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/equipment-summary`)
  // })

  // receipt upload summary
  // post - Submit for upload
  router.post('/equipment-and-adaptations-dev/receipt-upload-add', function (req, res) {
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
    res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/upload-summary`)
  })

  // Get
  router.get('/equipment-and-adaptations-dev/remove-receipt-upload', function (req, res) {
    req.session.data['file-receipt-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/equipment-and-adaptations-dev/remove-receipt-upload`)
  })

  // post - Remove receipt confirmation
  router.post('/equipment-and-adaptations-dev/remove-receipt-upload', function (req, res) {
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
  router.get('/equipment-and-adaptations-dev/remove-day-hours', function (req, res) {
    req.session.data['day-hours-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/support-worker/remove-day-hours`)
  })

  // post - Remove receipt confirmation
  router.post('/equipment-and-adaptations-dev/remove-day-hours', function (req, res) {
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
  router.post('/equipment-and-adaptations-dev/receipt-upload-more', function (req, res) {
    const anotherReceipt = req.session.data['add-another-receipt']
    const checked = req.session.data['contact-confirmed']

    if (anotherReceipt === 'Yes') {
      // Reset to stop pre-population of previous visit to page
      req.session.data['file-upload'] = null

      res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/receipt-upload`)
    } else if (checked) {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/check-your-answers`)
    } else {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/guidance-payee-details`)
    }
  })

  router.post('/equipment-and-adaptations-dev/cost-answer', function (req, res) {
    const cost = req.session.data['equipment-cost']
    const checked = req.session.data['contact-confirmed']

    if (cost === '100') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/employer-contribution`)
    } else if (cost === '2500') {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/too-much-claimed`)
    } else if (checked){
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/check-your-answers`)
    } else {
      res.redirect(`/${urlPrefix}/equipment-and-adaptations-dev/providing-evidence`)
    }
  })
}
