module.exports = function (folderForViews, urlPrefix, router) {
  router.get('/travel-to-work/start-a-claim', function (req, res) {
    res.render(`./${folderForViews}/travel-to-work/start-a-claim`)
  })

  router.post('/travel-to-work/travel-to-work-answers', function (req, res) {
    const aids = req.session.data['travel-to-work']

    if (aids === 'Yes') {
      res.redirect(`/${urlPrefix}/travel-to-work/before-you-continue`)
    } else if (aids === 'No') {
      res.redirect(`/${urlPrefix}/travel-to-work/contact-dwp`)
    }
  })

  router.post('/travel-to-work/transport-option-answers', function (req, res) {
    const aids = req.session.data['transport-option']

    if (aids === 'taxi') {
      res.redirect(`/${urlPrefix}/travel-to-work/taxi-journeys-for-day`)
    } else if (aids === 'lift') {
      res.redirect(`/${urlPrefix}/travel-to-work/mileage-for-day`)
    }
  })


  router.post('/travel-to-work/taxi-cost-answer', function (req, res) {
    const cost = req.session.data['cost-of-taxi']

    if (cost === '100') {
      res.redirect(`/${urlPrefix}/travel-to-work/employer-contribution`)
    } else {
      res.redirect(`/${urlPrefix}/travel-to-work/providing-evidence`)
    }
  })

  // router.post('/travel-to-work/agreed-monthly-taxi-answers', function (req, res) {
  //   const aids = req.session.data['agreed-monthly-taxi']
  //
  //   if (aids === 'Yes') {
  //     res.redirect(`/${urlPrefix}/travel-to-work/exceed-agreed-monthly-taxi`)
  //   } else if (aids === 'No') {
  //     res.redirect(`/${urlPrefix}/travel-to-work/taxi-journeys-for-day`)
  //   }
  // })
  // router.post('/travel-to-work/exceed-agreed-monthly-taxi-answers', function (req, res) {
  //   const aids = req.session.data['exceed-agreed-monthly-taxi']
  //
  //   if (aids === 'Yes') {
  //     res.redirect(`/${urlPrefix}/travel-to-work/taxi-journeys-for-day`)
  //   } else if (aids === 'No') {
  //     res.redirect(`/${urlPrefix}/travel-to-work/agreed-monthly-taxi-cost`)
  //   }
  // })

  // post - Submit for upload
  router.post('/travel-to-work/receipt-upload-add', function (req, res) {
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
    res.redirect(`/${urlPrefix}/travel-to-work/upload-summary`)
  })

  // Get
  router.get('/travel-to-work/remove-receipt-upload', function (req, res) {
    req.session.data['file-receipt-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/travel-to-work/remove-receipt-upload`)
  })

  // post - Remove receipt confirmation
  router.post('/travel-to-work/remove-receipt-upload', function (req, res) {
    const allUploads = req.session.data.uploads
    const fileToDelete = req.session.data['file-receipt-to-remove']
    const removeFile = req.session.data['file-upload-remove']

    if (removeFile === 'Yes') {
      allUploads.splice(fileToDelete, 1)
    }
    req.session.data.uploads = allUploads
    req.session.data['file-receipt-to-remove'] = null
    req.session.data['confirm-file-upload-remove'] = null
    res.redirect(`/${urlPrefix}/travel-to-work/upload-summary`)
  })

  // post - Add more receipts
  router.post('/travel-to-work/receipt-upload-more', function (req, res) {
    const anotherReceipt = req.session.data['add-another-receipt']
    if (anotherReceipt === 'Yes') {
      // Reset to stop pre-population of previous visit to page
      req.session.data['file-upload'] = null

      res.redirect(`/${urlPrefix}/travel-to-work/receipt-upload`)
    } else if (anotherReceipt === 'No') {
      res.redirect(`/${urlPrefix}/travel-to-work/banking-details`)
    }
  })

  // post - Submit for mileage
  router.post('/travel-to-work/mileage-for-day-add', function (req, res) {
    let allDays = req.session.data.mileages // This is the running list of days with mileage

    const submittedDay = req.session.data['mileage-of-day-date-day']
    const submittedMileage = req.session.data['mileage-of-day-distance']

    // Stop null pointer
    if (allDays == null) {
      allDays = []
    }

    allDays.push({
      day: submittedDay,
      mileage: submittedMileage
    })

    req.session.data.mileages = allDays
    res.redirect(`/${urlPrefix}/travel-to-work/mileage-for-day-summary`)
  })

  // post - Add more hours
  router.post('/travel-to-work/mileage-for-day-more', function (req, res) {
    const addAnotherDay = req.session.data['add-more-mileage']
    if (addAnotherDay === 'Yes') {
      // Reset to stop pre-population of previous visit to page
      req.session.data['mileage-of-day-date-day'] = null
      req.session.data['mileage-of-day-distance'] = null

      res.redirect(`/${urlPrefix}/travel-to-work/mileage-for-day`)
    } else {
      res.redirect(`/${urlPrefix}/travel-to-work/mileage-confirmation`)
    }
  })

  // Get
  router.get('/travel-to-work/remove-day-mileage', function (req, res) {
    req.session.data['mileage-hours-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/travel-to-work/remove-day-mileage`)
  })

  // post - Remove receipt confirmation
  router.post('/travel-to-work/remove-day-mileage', function (req, res) {
    const allUploads = req.session.data.mileages
    const mileageToRemove = req.session.data['day-mileage-to-remove']
    const confirmationToRemove = req.session.data['day-mileage-remove-confirmation']

    if (confirmationToRemove === 'Yes') {
      allUploads.splice(mileageToRemove, 1)
    }
    req.session.data.mileages = allUploads
    req.session.data['mileage-hours-to-remove'] = null
    req.session.data['day-mileage-remove-confirmation'] = null
    res.redirect(`/${urlPrefix}/travel-to-work/mileage-for-day-summary`)
  })

  // post - Submit for taxi
  router.post('/travel-to-work/taxi-journeys-for-day-add', function (req, res) {
    let allDays = req.session.data.journeys // This is the running list of days with mileage

    const submittedDay = req.session.data['taxi-journeys-for-day-date-day']
    const submittedCost = req.session.data['taxi-journeys-for-day-journeys']

    // Stop null pointer
    if (allDays == null) {
      allDays = []
    }

    allDays.push({
      day: submittedDay,
      journeys: submittedCost
    })

    req.session.data.journeys = allDays
    res.redirect(`/${urlPrefix}/travel-to-work/taxi-journeys-for-day-summary`)
  })

  // post - Add more hours
  router.post('/travel-to-work/taxi-journeys-for-day-more', function (req, res) {
    const addAnotherDay = req.session.data['add-more-taxi-journeys']
    if (addAnotherDay === 'Yes') {
      // Reset to stop pre-population of previous visit to page
      req.session.data['taxi-journeys-for-day-date-day'] = null
      req.session.data['taxi-journeys-for-day-journeys'] = null

      res.redirect(`/${urlPrefix}/travel-to-work/taxi-journeys-for-day`)
    } else if (addAnotherDay === 'No' && (req.session.data.journeys === undefined||req.session.data.journeys.length == 0)){
      res.redirect(`/${urlPrefix}/travel-to-work/no-hours-entered`)
    } else {
      res.redirect(`/${urlPrefix}/travel-to-work/taxi-confirmation`)
    }
  })

  // Get
  router.get('/travel-to-work/remove-day-journeys', function (req, res) {
    req.session.data['day-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/travel-to-work/remove-day-journeys`)
  })

  // post - Remove receipt confirmation
  router.post('/travel-to-work/remove-day-journeys', function (req, res) {
    const all = req.session.data.journeys
    const toRemove = req.session.data['day-to-remove']
    const confirmationToRemove = req.session.data['day-to-remove-confirmation']

    if (confirmationToRemove === 'Yes') {
      all.splice(toRemove, 1)
    }
    req.session.data.journeys = all
    req.session.data['day-to-remove'] = null
    req.session.data['day-to-remove-confirmation'] = null
    res.redirect(`/${urlPrefix}/travel-to-work/taxi-journeys-for-day-summary`)
  })

  router.post('/travel-to-work/taxi-confirmation-answers', function (req, res) {
    const confirm = req.session.data['taxi-confirmation']
    if (confirm === 'Yes') {
      res.redirect(`/${urlPrefix}/travel-to-work/taxi-cost`)
    } else {
      res.redirect(`/${urlPrefix}/travel-to-work/taxi-journeys-for-day-summary`)
    }
  })

  router.post('/travel-to-work/mileage-confirmation-answers', function (req, res) {
    const confirm = req.session.data['mileage-confirmation']
    if (confirm === 'Yes') {
      res.redirect(`/${urlPrefix}/travel-to-work/banking-details`)
    } else {
      res.redirect(`/${urlPrefix}/travel-to-work/mileage-for-day-summary`)
    }
  })



  // new journey stuff


  router.post('/travel-to-work/taxi-journeys-for-day', function (req, res) {
    console.log(req.session.data.support)
    if (req.session.data.remove !== undefined) {
      console.log('Remove')
      req.session.data.remove = undefined
      req.session.data.support.splice(req.session.data.remove, 1)
      res.redirect(`/${urlPrefix}/travel-to-work/taxi-journeys-for-day`)
    } else {
      if (req.session.data.action === 'add') {
        console.log('Add')
        console.log(req.session.data)
        req.session.data.support = [...req.session.data.support, {
          support_hours: '',
          day: '',
          month: '',
          year: ''
        }]
        res.redirect(`/${urlPrefix}/travel-to-work/taxi-journeys-for-day`)
      } else {
        console.log('Continue')
        res.redirect(`/${urlPrefix}/travel-to-work/taxi-journeys-for-day-summary`)
      }
    }
  })

  // post - Add more support hours
  router.post('/travel-to-work/taxi-journeys-for-day-summary', function (req, res) {
    console.log(req.session.data.support)

    if (req.session.data.travel === undefined || req.session.data.travel.length == 0) {
      res.redirect(`/${urlPrefix}/travel-to-work/no-hours-entered`)
    } else {
      res.redirect(`/${urlPrefix}/travel-to-work/taxi-cost`)
    }
  })
}
