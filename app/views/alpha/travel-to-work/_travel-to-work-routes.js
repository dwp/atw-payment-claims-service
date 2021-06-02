module.exports = function (folderForViews, urlPrefix, router) {
  router.get('/travel-to-work/start-a-claim', function (req, res) {
    req.session.destroy()
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
      res.redirect(`/${urlPrefix}/travel-to-work/agreed-monthly-taxi`)
    } else if (aids === 'lift') {
      res.redirect(`/${urlPrefix}/travel-to-work/mileage-for-day`)
    }
  })

  router.post('/travel-to-work/agreed-monthly-taxi-answers', function (req, res) {
    const aids = req.session.data['agreed-monthly-taxi']

    if (aids === 'Yes') {
      res.redirect(`/${urlPrefix}/travel-to-work/exceed-agreed-monthly-taxi`)
    } else if (aids === 'No') {
      res.redirect(`/${urlPrefix}/travel-to-work/cost-for-day`)
    }
  })
  router.post('/travel-to-work/exceed-agreed-monthly-taxi-answers', function (req, res) {
    const aids = req.session.data['exceed-agreed-monthly-taxi']

    if (aids === 'Yes') {
      res.redirect(`/${urlPrefix}/travel-to-work/cost-for-day`)
    } else if (aids === 'No') {
      res.redirect(`/${urlPrefix}/travel-to-work/agreed-monthly-taxi-cost`)
    }
  })

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
      res.redirect(`/${urlPrefix}/travel-to-work/counter-signatory-name`)
    }
  })

  // post - Submit for mileage
  router.post('/travel-to-work/mileage-for-day-add', function (req, res) {
    let allDays = req.session.data.mileages // This is the running list of days with mileage

    const submittedDay = req.session.data['mileage-of-day-date-day']
    const submittedMileage = req.session.data['mileage-of-day-distance']
    const submittedPassengers = req.session.data['passengers-for-day']

    // Stop null pointer
    if (allDays == null) {
      allDays = []
    }

    allDays.push({
      day: submittedDay,
      mileage: submittedMileage,
      passengers: submittedPassengers
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
      req.session.data['passengers-for-day'] = null

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
  router.post('/travel-to-work/cost-for-day-add', function (req, res) {
    let allDays = req.session.data.costs // This is the running list of days with mileage

    const submittedDay = req.session.data['cost-of-day-date-day']
    const submittedCost = req.session.data['cost-of-day-distance']
    const submittedPassengers = req.session.data['passengers-for-day']

    // Stop null pointer
    if (allDays == null) {
      allDays = []
    }

    allDays.push({
      day: submittedDay,
      cost: submittedCost,
      passengers: submittedPassengers
    })

    req.session.data.costs = allDays
    res.redirect(`/${urlPrefix}/travel-to-work/cost-for-day-summary`)
  })

  // post - Add more hours
  router.post('/travel-to-work/cost-for-day-more', function (req, res) {
    const addAnotherDay = req.session.data['add-more-cost']
    if (addAnotherDay === 'Yes') {
      // Reset to stop pre-population of previous visit to page
      req.session.data['cost-of-day-date-day'] = null
      req.session.data['cost-of-day-distance'] = null
      req.session.data['passengers-for-day'] = null

      res.redirect(`/${urlPrefix}/travel-to-work/cost-for-day`)
    } else {
      res.redirect(`/${urlPrefix}/travel-to-work/cost-confirmation`)
    }
  })

  // Get
  router.get('/travel-to-work/remove-day-cost', function (req, res) {
    req.session.data['cost-day-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/travel-to-work/remove-day-cost`)
  })

  // post - Remove receipt confirmation
  router.post('/travel-to-work/remove-day-cost', function (req, res) {
    const allUploads = req.session.data.costs
    const costToRemove = req.session.data['day-cost-to-remove']
    const confirmationToRemove = req.session.data['day-cost-remove-confirmation']

    if (confirmationToRemove === 'Yes') {
      allUploads.splice(costToRemove, 1)
    }
    req.session.data.costs = allUploads
    req.session.data['cost-day-to-remove'] = null
    req.session.data['day-cost-remove-confirmation'] = null
    res.redirect(`/${urlPrefix}/travel-to-work/cost-for-day-summary`)
  })

  router.post('/travel-to-work/cost-confirmation-answers', function (req, res) {
    const confirm = req.session.data['cost-confirmation']
    if (confirm === 'Yes') {
      res.redirect(`/${urlPrefix}/travel-to-work/banking-details`)
    } else {
      res.redirect(`/${urlPrefix}/travel-to-work/cost-for-day-summary`)
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
}
