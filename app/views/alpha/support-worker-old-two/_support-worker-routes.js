module.exports = function (folderForViews, urlPrefix, router) {
  router.get('/support-worker-old-two/start-a-claim', function (req, res) {

    res.render(`./${folderForViews}/support-worker-old-two/start-a-claim`)
  })

  // post - Are you claiming for support in the workplace
  router.post('/support-worker-old-two/support-for-workplace-answers', function (req, res) {
    const aids = req.session.data['support-for-workplace']

    if (aids === 'Yes') {
      res.redirect(`/${urlPrefix}/support-worker-old-two/before-you-continue`)
    } else if (aids === 'No') {
      res.redirect(`/${urlPrefix}/support-worker-old-two/contact-dwp`)
    }
  })



  // post - Add more hours
  router.post('/support-worker-old-two/hours-for-day-more', function (req, res) {
    const addAnotherDay = req.session.data['add-another-day']
    if (addAnotherDay === 'Yes') {
      // Reset to stop pre-population of previous visit to page
      req.session.data['hours-of-day-date-day'] = null
      req.session.data['hours-of-day-date-month'] = null
      req.session.data['hours-of-day-date-year'] = null
      req.session.data['hours-of-day-worked'] = null

      res.redirect(`/${urlPrefix}/support-worker-old-two/hours-for-day`)
    } else if (addAnotherDay === 'No' && (req.session.data.hours === undefined||req.session.data.hours.length == 0)){
      res.redirect(`/${urlPrefix}/support-worker-old-two/no-hours-entered`)
    } else {
      res.redirect(`/${urlPrefix}/support-worker-old-two/hours-confirmation`)
    }
  })

  // post - Confirm work hours
  router.post('/support-worker-old-two/hours-confirm-post', function (req, res) {
    const aids = req.session.data['hours-confirmation']

    if (aids === 'Yes') {
      res.redirect(`/${urlPrefix}/support-worker-old-two/cost-of-support`)
    } else if (aids === 'No') {
      res.redirect(`/${urlPrefix}/support-worker-old-two/hours-for-day-summary`)
    }
  })

  // post - Add more support hours
  router.post('/support-worker-old-two/hours-for-day-summary', function (req, res) {
    console.log(req.session.data.support)

    if (req.session.data.support === undefined || req.session.data.support.length == 0) {
      res.redirect(`/${urlPrefix}/support-worker-old-two/no-hours-entered`)
    } else {
      res.redirect(`/${urlPrefix}/support-worker-old-two/cost-of-support`)
    }
  })

  router.post('/support-worker-old-two/before-you-continue', function (req, res) {
    res.redirect(`/${urlPrefix}/support-worker-old-two/hours-for-day`)
  })

  router.post('/support-worker-old-two/hours-for-day', function (req, res) {
    console.log(req.session.data.support)
    if (req.session.data.remove !== undefined) {
      console.log('Remove')
      req.session.data.remove = undefined
      req.session.data.support.splice(req.session.data.remove, 1)
      res.redirect(`/${urlPrefix}/support-worker-old-two/hours-for-day`)
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
        res.redirect(`/${urlPrefix}/support-worker-old-two/hours-for-day`)
      } else {
        console.log('Continue')
        res.redirect(`/${urlPrefix}/support-worker-old-two/hours-for-day-summary`)
      }
    }
  })

  // post - Submit for upload
  router.post('/support-worker-old-two/receipt-upload-add', function (req, res) {
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
    res.redirect(`/${urlPrefix}/support-worker-old-two/upload-summary`)
  })

  // Get
  router.get('/support-worker-old-two/remove-receipt-upload', function (req, res) {
    req.session.data['file-receipt-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/support-worker-old-two/remove-receipt-upload`)
  })

  // post - Remove receipt confirmation
  router.post('/support-worker-old-two/remove-receipt-upload', function (req, res) {
    const allUploads = req.session.data.uploads
    const fileToDelete = req.session.data['file-receipt-to-remove']
    const removeFile = req.session.data['file-upload-remove']

    if (removeFile === 'Yes') {
      allUploads.splice(fileToDelete, 1)
    }
    req.session.data.uploads = allUploads
    req.session.data['file-receipt-to-remove'] = null
    req.session.data['confirm-file-upload-remove'] = null
    res.redirect(`/${urlPrefix}/support-worker-old-two/upload-summary`)
  })

  // Get
  router.get('/support-worker-old-two/remove-day-hours', function (req, res) {
    req.session.data['day-hours-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/support-worker-old-two/remove-day-hours`)
  })

  // post - Remove receipt confirmation
  router.post('/support-worker-old-two/remove-day-hours', function (req, res) {
    const allhours = req.session.data.hours
    const hoursToRemove = req.session.data['day-hours-to-remove']
    const removeFile = req.session.data['day-hours-remove-confirmation']

    if (removeFile === 'Yes') {
      allhours.splice(hoursToRemove, 1)
    }
    req.session.data.hours = allhours
    req.session.data['day-hours-to-remove'] = null
    req.session.data['day-hours-remove-confirmation'] = null
    res.redirect(`/${urlPrefix}/support-worker-old-two/hours-for-day-summary`)
  })

  // post - Confirm work hours
  router.post('/support-worker-old-two/cost-of-support-answer', function (req, res) {
    const cost = req.session.data['cost-of-support']

    if (cost === '100') {
      res.redirect(`/${urlPrefix}/support-worker-old-two/employer-contribution`)
    } else {
      res.redirect(`/${urlPrefix}/support-worker-old-two/providing-evidence`)
    }
  })

  // post - Add more receipts
  router.post('/support-worker-old-two/receipt-upload-more', function (req, res) {
    const anotherReceipt = req.session.data['add-another-receipt']
    if (anotherReceipt === 'Yes') {
      // Reset to stop pre-population of previous visit to page
      req.session.data['file-upload'] = null

      res.redirect(`/${urlPrefix}/support-worker-old-two/receipt-upload`)
    } else {
      res.redirect(`/${urlPrefix}/support-worker-old-two/guidance-payee-details`)
    }
  })
}
