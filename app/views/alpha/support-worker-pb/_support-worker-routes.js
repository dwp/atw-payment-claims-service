module.exports = function (folderForViews, urlPrefix, router) {
  router.get('/support-worker-pb/start-a-claim', function (req, res) {

    res.render(`./${folderForViews}/support-worker-pb/start-a-claim`)
  })

  // post - Are you claiming for support in the workplace
  router.post('/support-worker-pb/support-for-workplace-answers', function (req, res) {
    const aids = req.session.data['support-for-workplace']

    if (aids === 'Yes') {
      res.redirect(`/${urlPrefix}/support-worker-pb/grant-information`)
    } else if (aids === 'No') {
      res.redirect(`/${urlPrefix}/support-worker-pb/contact-dwp`)
    }
  })

  // // post - Submit for hours
  // router.post('/support-worker-pb/hours-for-day-summary', function (req, res) {
  //   let allHours = req.session.data.hours // This is the running list of hours
  //
  //   const submittedDay = req.session.data['support[0][day]' || 'support[{{loop.index0}}][day]'] // User submitted day
  //   const submittedHours = req.session.data['support[0][support_hours]' || 'support[{{loop.index0}}][support_hours]'] // User submitted hours worked
  //
  //   // Stop null pointer
  //   if (allHours == null) {
  //     allHours = []
  //   }
  //
  //   allHours.push({
  //     day: submittedDay,
  //     hours: submittedHours
  //   })
  //
  //   req.session.data.hours = allHours
  //   res.redirect(`/${urlPrefix}/support-worker-pb/hours-for-day-summary`)
  // })

  // post - Add more hours
  router.post('/support-worker-pb/hours-for-day-more', function (req, res) {
    const addAnotherDay = req.session.data['add-another-day']
    if (addAnotherDay === 'Yes') {
      // Reset to stop pre-population of previous visit to page
      req.session.data['hours-of-day-date-day'] = null
      req.session.data['hours-of-day-date-month'] = null
      req.session.data['hours-of-day-date-year'] = null
      req.session.data['hours-of-day-worked'] = null

      res.redirect(`/${urlPrefix}/support-worker-pb/hours-for-day`)
    } else if (addAnotherDay === 'No' && (req.session.data.hours === undefined||req.session.data.hours.length == 0)){
      res.redirect(`/${urlPrefix}/support-worker-pb/no-hours-entered`)
    } else {
      res.redirect(`/${urlPrefix}/support-worker-pb/hours-confirmation`)
    }
  })

  // post - Confirm work hours
  router.post('/support-worker-pb/hours-confirm-post', function (req, res) {
    const aids = req.session.data['hours-confirmation']

    if (aids === 'Yes') {
      res.redirect(`/${urlPrefix}/support-worker-pb/cost-of-support`)
    } else if (aids === 'No') {
      res.redirect(`/${urlPrefix}/support-worker-pb/hours-for-day-summary`)
    }
  })

  // post - Add more support hours
  router.post('/support-worker-pb/hours-for-day-summary', function (req, res) {
    console.log(req.session.data.support)
    const month = req.session.data['new-month']
    const journeytype = req.session.data['journey-type']
    const checked = req.session.data['contact-confirmed']

    if (req.session.data.support === undefined || req.session.data.support.length == 0) {
      res.redirect(`/${urlPrefix}/support-worker-pb/no-hours-entered`)
    } else if (month === 'yes') {
      res.redirect(`/${urlPrefix}/support-worker-pb/claiming-for-month-repeat`)
    } else if (month === 'no' && journeytype === 'traveltowork-ammendment') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (month === 'no' && checked) {
      res.redirect(`/${urlPrefix}/support-worker-pb/check-your-answers`)
    } else if (month === 'no' && journeytype === 'supportworkerpb') {
      res.redirect(`/${urlPrefix}/support-worker-pb/cost-of-support`)
    }
  })

  router.post('/support-worker-pb/grant-information-answer', function (req, res) {
    res.redirect(`/${urlPrefix}/support-worker-pb/before-you-continue`)
  })

  router.post('/support-worker-pb/before-you-continue-answer', function (req, res) {
    res.redirect(`/${urlPrefix}/support-worker-pb/claiming-for-month`)
  })

  router.post('/support-worker-pb/month-claim-answer', function (req, res) {
    res.redirect(`/${urlPrefix}/support-worker-pb/hours-for-day`)
  })

  router.post('/support-worker-pb/month-claim-answer-repeat', function (req, res) {
    res.redirect(`/${urlPrefix}/support-worker-pb/hours-for-day-repeat`)
  })

  router.post('/support-worker-pb/hours-for-day', function (req, res) {
    console.log(req.session.data.support)
    if (req.session.data.remove !== undefined) {
      console.log('Remove')
      req.session.data.remove = undefined
      req.session.data.support.splice(req.session.data.remove, 1)
      res.redirect(`/${urlPrefix}/support-worker-pb/hours-for-day`)
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
        res.redirect(`/${urlPrefix}/support-worker-pb/hours-for-day`)
      } else {
        console.log('Continue')
        res.redirect(`/${urlPrefix}/support-worker-pb/hours-for-day-summary`)
      }
    }
  })

  router.post('/support-worker-pb/hours-for-day-repeat', function (req, res) {
    console.log(req.session.data.support)
    if (req.session.data.remove !== undefined) {
      console.log('Remove')
      req.session.data.remove = undefined
      req.session.data.support.splice(req.session.data.remove, 1)
      res.redirect(`/${urlPrefix}/support-worker-pb/hours-for-day-repeat`)
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
        res.redirect(`/${urlPrefix}/support-worker-pb/hours-for-day-repeat`)
      } else {
        console.log('Continue')
        res.redirect(`/${urlPrefix}/support-worker-pb/hours-for-day-summary`)
      }
    }
  })

  // post - Submit for upload
  router.post('/support-worker-pb/receipt-upload-add', function (req, res) {
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
    res.redirect(`/${urlPrefix}/support-worker-pb/upload-summary`)
  })

  // Get
  router.get('/support-worker-pb/remove-receipt-upload', function (req, res) {
    req.session.data['file-receipt-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/support-worker-pb/remove-receipt-upload`)
  })

  // post - Remove receipt confirmation
  router.post('/support-worker-pb/remove-receipt-upload', function (req, res) {
    const allUploads = req.session.data.uploads
    const fileToDelete = req.session.data['file-receipt-to-remove']
    const removeFile = req.session.data['file-upload-remove']

    if (removeFile === 'Yes') {
      allUploads.splice(fileToDelete, 1)
    }
    req.session.data.uploads = allUploads
    req.session.data['file-receipt-to-remove'] = null
    req.session.data['confirm-file-upload-remove'] = null
    res.redirect(`/${urlPrefix}/support-worker-pb/upload-summary`)
  })

  // Get
  router.get('/support-worker-pb/remove-day-hours', function (req, res) {
    req.session.data['day-hours-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/support-worker-pb/remove-day-hours`)
  })

  // post - Remove receipt confirmation
  router.post('/support-worker-pb/remove-day-hours', function (req, res) {
    const allhours = req.session.data.hours
    const hoursToRemove = req.session.data['day-hours-to-remove']
    const removeFile = req.session.data['day-hours-remove-confirmation']

    if (removeFile === 'Yes') {
      allhours.splice(hoursToRemove, 1)
    }
    req.session.data.hours = allhours
    req.session.data['day-hours-to-remove'] = null
    req.session.data['day-hours-remove-confirmation'] = null
    res.redirect(`/${urlPrefix}/support-worker-pb/hours-for-day-summary`)
  })

  // post - Confirm work hours
  router.post('/support-worker-pb/cost-of-support-answer', function (req, res) {
    const cost = req.session.data['cost-of-support']
    const journeytype = req.session.data['journey-type']
    const checked = req.session.data['contact-confirmed']

    if (cost === '100') {
      res.redirect(`/${urlPrefix}/support-worker-pb/employer-contribution`)
    } else if (journeytype === 'traveltowork-ammendment'){
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (journeytype === 'supportworkerpb' && checked){
      res.redirect(`/${urlPrefix}/support-worker-pb/check-your-answers`)
    } else if (journeytype === 'supportworkerpb'){
      res.redirect(`/${urlPrefix}/support-worker-pb/providing-evidence`)
    }
  })

  router.post('/support-worker-pb/change-cost-answer', function (req, res) {
    const change = req.session.data['change-cost']

    if (change === 'yes') {
      res.redirect(`/${urlPrefix}/support-worker-pb/cost-of-support`)
    } else if (change === 'no'){
      res.redirect(`/${urlPrefix}/travel-to-work/upload-summary`)
    }
  })

  // post - Add more receipts
  router.post('/support-worker-pb/receipt-upload-more', function (req, res) {
    const anotherReceipt = req.session.data['add-another-receipt']
    const journeytype = req.session.data['journey-type']
    const checked = req.session.data['contact-confirmed']

    if (anotherReceipt === 'Yes') {
      // Reset to stop pre-population of previous visit to page
      req.session.data['file-upload'] = null

      res.redirect(`/${urlPrefix}/support-worker-pb/receipt-upload`)
    } else if (journeytype === 'traveltowork-ammendment') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (journeytype === 'supportworkerpb' && checked) {
      res.redirect(`/${urlPrefix}/support-worker-pb/check-your-answers`)
    } else if (journeytype === 'supportworkerpb') {
      res.redirect(`/${urlPrefix}/support-worker-pb/existing-payee-details`)
    }
  })

  // workplace conact answer

  router.post('/support-worker-pb/contact-answers', function (req, res) {
    const journeytype = req.session.data['journey-type']
    const checked = req.session.data['sw-declaration']

    if (journeytype === 'supportworkerpb' && checked === 'true') {
    res.redirect(`/${urlPrefix}/portal-screens/citizen-new-declaration-pre-confirm`)
  } else if (journeytype === 'supportworkerpb') {
      res.redirect(`/${urlPrefix}/support-worker-pb/check-your-answers`)
  } else if (journeytype === 'traveltowork-ammendment') {
    res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
  }
})

router.post('/support-worker-pb/existing-payee-answers', function (req, res) {
  const payee = req.session.data['existing-payee']
  const checked = req.session.data['contact-confirmed']

  if (payee === 'New') {
  res.redirect(`/${urlPrefix}/support-worker-pb/new-payee-name`)
} else if (checked){
  res.redirect(`/${urlPrefix}/support-worker-pb/check-your-answers`)
} else {
  res.redirect(`/${urlPrefix}/support-worker-pb/counter-signatory-name`)
}
})

}
