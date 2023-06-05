module.exports = function (folderForViews, urlPrefix, router) {
  router.get('/adaptation-to-vehicle/start-a-claim', function (req, res) {

    res.render(`./${folderForViews}/adaptation-to-vehicle/adaptation-to-vehicle`)
  })

  // post - Are you claiming for support in the workplace
  router.post('/adaptation-to-vehicle/adaptation-to-vehicle-answer', function (req, res) {
    const adaptation = req.session.data['adaptation-to-vehicle']

    if (adaptation === 'Yes') {
      res.redirect(`/${urlPrefix}/adaptation-to-vehicle/grant-information`)
    } else if (adaptation === 'No') {
      res.redirect(`/${urlPrefix}/adaptation-to-vehicle/contact-dwp`)
    }
  })

  router.post('/adaptation-to-vehicle/before-you-continue-answer', function (req, res) {
    res.redirect(`/${urlPrefix}/adaptation-to-vehicle/adaptation-description`)
  })

  router.get('/adaptation-to-vehicle/adaptation-description', function (req, res) {
    req.session.data.adaptation_name = ""
    req.session.data.adaptation_name2 = "Test"+req.query['key']

    if (req.query['key']) {
      var match = req.session.data.adaptation.filter(obj => {
        return obj.key == req.query['key']
      })
      req.session.data.adaptation_name = match[0].adaptation_name
      req.session.data.key = match[0].key
      req.session.data.adaptation_day = match[0].day
      req.session.data.adaptation_month = match[0].month
      req.session.data.adaptation_year = match[0].year
    }
    else {
      req.session.data.adaptation_name = ""
      req.session.data.key = null
      req.session.data.adaptation_day = null
      req.session.data.adaptation_month = null
      req.session.data.adaptation_year = null
    }

    res.redirect(`/${urlPrefix}/adaptation-to-vehicle/adaptation-description2`)
  })

  router.get('/adaptation-to-vehicle/adaptation-description2', function (req, res) {
    res.render(`./${folderForViews}/adaptation-to-vehicle/adaptation-description`)
  })

  router.post('/adaptation-to-vehicle/adaptation-description2', function (req, res) {

    if (!req.session.data.adaptation) {
      req.session.data.adaptation = []
    }

    if (req.session.data.key) {
      var match = req.session.data.adaptation.filter(obj => {
        return obj.key == req.session.data.key
      })

      if (match[0]) {
        req.session.data.adaptation[0] = {
          key: req.session.data.key,
          adaptation_name: req.session.data.adaptation_name,
          day: req.session.data.adaptation_day,
          month: req.session.data.adaptation_month,
          year: req.session.data.adaptation_year
        }
      }
      else {
        req.session.data.adaptation.push({
          key: req.session.data.adaptation.length,
          adaptation_name: req.session.data.adaptation_name,
          day: req.session.data.adaptation_day,
          month: req.session.data.adaptation_month,
          year: req.session.data.adaptation_year
        })
      }
    }
    else {
      req.session.data.adaptation.push({
        key: req.session.data.adaptation.length,
        adaptation_name: req.session.data.adaptation_name,
        day: req.session.data.adaptation_day,
        month: req.session.data.adaptation_month,
        year: req.session.data.adaptation_year
      })
    }

    req.session.data.adaptation_name = ""
    req.session.data.key = null
    req.session.data.adaptation_day = null
    req.session.data.adaptation_month = null
    req.session.data.adaptation_year = null

    if (req.session.data.remove !== undefined) {
      console.log('Remove')
      req.session.data.remove = undefined
      req.session.data.adaptation.splice(req.session.data.remove, 1)
      res.redirect(`/${urlPrefix}/adaptation-to-vehicle/adaptation-description`)
    } else {
      if (req.session.data.action === 'add') {
        console.log('Add')
        console.log(req.session.data)
        req.session.data.adaptation = [...req.session.data.adaptation, {
          adaptation_name: '',
          day: '',
          month: '',
          year: ''
        }]
        res.redirect(`/${urlPrefix}/adaptation-to-vehicle/adaptation-description`)
      } else {
        console.log('Continue')
        res.redirect(`/${urlPrefix}/adaptation-to-vehicle/adaptation-summary`)
      }
    }
  })

  router.post('/adaptation-to-vehicle/adaptation-summary', function (req, res) {
    console.log(req.session.data.adaptation)
    const checked = req.session.data['contact-confirmed']
    const add_vehicle_adaptation = req.session.data['add-vehicle-adaptation']

    if (add_vehicle_adaptation == "Yes") {
      res.redirect(`/${urlPrefix}/adaptation-to-vehicle/adaptation-description`)
    }
    else if (add_vehicle_adaptation == "No") {
      if (req.session.data.adaptation === undefined || req.session.data.adaptation.length == 0) {
        res.redirect(`/${urlPrefix}/adaptation-to-vehicle/no-hours-entered`)
      } else if (checked) {
        res.redirect(`/${urlPrefix}/adaptation-to-vehicle/check-your-answers`)
      } else {
        res.redirect(`/${urlPrefix}/adaptation-to-vehicle/adaptation-cost`)
      }
    }
    else {
      res.redirect(`/${urlPrefix}/adaptation-to-vehicle/adaptation-summary`)
    }


  })

  router.post('/adaptation-to-vehicle/cost-answer', function (req, res) {
    const cost = req.session.data['adaptation-cost']
    const checked = req.session.data['contact-confirmed']

    if (cost === '100') {
      res.redirect(`/${urlPrefix}/adaptation-to-vehicle/employer-contribution`)
    } else if (cost === '2500') {
      res.redirect(`/${urlPrefix}/adaptation-to-vehicle/too-much-claimed`)
    } else if (checked) {
      res.redirect(`/${urlPrefix}/adaptation-to-vehicle/check-your-answers`)
    } else {
      res.redirect(`/${urlPrefix}/adaptation-to-vehicle/providing-evidence`)
    }
  })

  router.post('/adaptation-to-vehicle/receipt-upload-more', function (req, res) {
    const anotherReceipt = req.session.data['add-another-receipt']
    const checked = req.session.data['contact-confirmed']

    if (anotherReceipt === 'Yes') {
      // Reset to stop pre-population of previous visit to page
      req.session.data['file-upload'] = null

      res.redirect(`/${urlPrefix}/adaptation-to-vehicle/receipt-upload`)
    } else if (checked) {
      res.redirect(`/${urlPrefix}/adaptation-to-vehicle/check-your-answers`)
    } else {
      res.redirect(`/${urlPrefix}/adaptation-to-vehicle/new-payee-name`)
    }
  })

  router.post('/adaptation-to-vehicle/receipt-upload-add', function (req, res) {
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
    res.redirect(`/${urlPrefix}/adaptation-to-vehicle/upload-summary`)
  })

  // Get
  router.get('/adaptation-to-vehicle/remove-receipt-upload', function (req, res) {
    req.session.data['file-receipt-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/adaptation-to-vehicle/remove-receipt-upload`)
  })

  // post - Remove receipt confirmation
  router.post('/adaptation-to-vehicle/remove-receipt-upload', function (req, res) {
    const allUploads = req.session.data.uploads
    const fileToDelete = req.session.data['file-receipt-to-remove']
    const removeFile = req.session.data['file-upload-remove']

    if (removeFile === 'Yes') {
      allUploads.splice(fileToDelete, 1)
    }
    req.session.data.uploads = allUploads
    req.session.data['file-receipt-to-remove'] = null
    req.session.data['confirm-file-upload-remove'] = null
    res.redirect(`/${urlPrefix}/adaptation-to-vehicle/upload-summary`)
  })






}
