module.exports = function (folderForViews, urlPrefix, router) {
  router.get('/support-worker/start-a-claim', function (req, res) {
    req.session.destroy()
    res.render(`./${folderForViews}/support-worker/start-a-claim`)
  })

  // post - Are you claiming for support in the workplace
  router.post('/support-worker/support-for-workplace-answers', function (req, res) {
    const aids = req.session.data['support-for-workplace']

    if (aids === 'Yes') {
      res.redirect(`/${urlPrefix}/support-worker/before-you-continue`)
    } else if (aids === 'No') {
      res.redirect(`/${urlPrefix}/support-worker/contact-dwp`)
    }
  })

  // post - Submit for hours
  router.post('/support-worker/hours-for-day-add', function (req, res) {
    let allHours = req.session.data.hours // This is the running list of hours

    const submittedDay = req.session.data['hours-of-day-date-day'] // User submitted day
    const submittedHours = req.session.data['hours-of-day-worked'] // User submitted hours worked

    // Stop null pointer
    if (allHours == null) {
      allHours = []
    }

    allHours.push({
      day: submittedDay,
      hours: submittedHours
    })

    req.session.data.hours = allHours
    res.redirect(`/${urlPrefix}/support-worker/hours-for-day-summary`)
  })

  // post - Add more hours
  router.post('/support-worker/hours-for-day-more', function (req, res) {
    const addAnotherDay = req.session.data['add-another-day']
    if (addAnotherDay === 'Yes') {
      // Reset to stop pre-population of previous visit to page
      req.session.data['hours-of-day-date-day'] = null
      req.session.data['hours-of-day-date-month'] = null
      req.session.data['hours-of-day-date-year'] = null
      req.session.data['hours-of-day-worked'] = null

      res.redirect(`/${urlPrefix}/support-worker/hours-for-day`)
    } else {
      res.redirect(`/${urlPrefix}/support-worker/hours-confirmation`)
    }
  })

  // post - Confirm work hours
  router.post('/support-worker/hours-confirm-post', function (req, res) {
    const aids = req.session.data['hours-confirmation']

    if (aids === 'Yes') {
      res.redirect(`/${urlPrefix}/support-worker/cost-of-support`)
    } else if (aids === 'No') {
      res.redirect(`/${urlPrefix}/support-worker/hours-for-day-summary`)
    }
  })

  // post - Submit for upload
  router.post('/support-worker/receipt-upload-add', function (req, res) {
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
    res.redirect(`/${urlPrefix}/support-worker/upload-summary`)
  })

  // Get
  router.get('/support-worker/remove-receipt-upload', function (req, res) {
    req.session.data['file-receipt-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/support-worker/remove-receipt-upload`)
  })

  // post - Remove receipt confirmation
  router.post('/support-worker/remove-receipt-upload', function (req, res) {
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
  router.get('/support-worker/remove-day-hours', function (req, res) {
    req.session.data['day-hours-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/support-worker/remove-day-hours`)
  })

  // post - Remove receipt confirmation
  router.post('/support-worker/remove-day-hours', function (req, res) {
    const allUploads = req.session.data.hours
    const hoursToRemove = req.session.data['day-hours-to-remove']
    const removeFile = req.session.data['day-hours-remove-confirmation']

    if (removeFile === 'Yes') {
      allUploads.splice(hoursToRemove, 1)
    }
    req.session.data.uploads = allUploads
    req.session.data['day-hours-to-remove'] = null
    req.session.data['day-hours-remove-confirmation'] = null
    res.redirect(`/${urlPrefix}/support-worker/hours-for-day-summary`)
  })

  // post - Confirm work hours
  router.post('/support-worker/cost-of-support-answer', function (req, res) {
    const cost = req.session.data['cost-of-support']

    if (cost === '100') {
      res.redirect(`/${urlPrefix}/support-worker/employer-contribution`)
    } else {
      res.redirect(`/${urlPrefix}/support-worker/banking-details`)
    }
  })

  // post - Add more receipts
  router.post('/support-worker/receipt-upload-more', function (req, res) {
    const anotherReceipt = req.session.data['add-another-receipt']
    if (anotherReceipt === 'Yes') {
      // Reset to stop pre-population of previous visit to page
      req.session.data['file-upload'] = null

      res.redirect(`/${urlPrefix}/support-worker/receipt-upload`)
    } else {
      res.redirect(`/${urlPrefix}/support-worker/counter-signatory-name`)
    }
  })
}
