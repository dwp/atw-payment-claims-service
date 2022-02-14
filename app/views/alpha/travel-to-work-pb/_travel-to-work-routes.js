module.exports = function (folderForViews, urlPrefix, router) {
  router.get('/travel-to-work-pb/start-a-claim', function (req, res) {
    res.render(`./${folderForViews}/travel-to-work-pb/start-a-claim`)
  })

  router.post('/travel-to-work-pb/travel-to-work-pb-answers', function (req, res) {
    const aids = req.session.data['travel-to-work-pb']

    if (aids === 'Yes') {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/grant-information`)
    } else if (aids === 'No') {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/contact-dwp`)
    }
  })

  router.post('/travel-to-work-pb/transport-option-answers', function (req, res) {
    const aids = req.session.data['transport-option']
      const claiming = req.session.data['way-of-claiming']

    if (aids === 'taxi' || aids === 'taxi-during-work') {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/taxi-journeys-for-day`)
    } else if (aids === 'lift'  && claiming === 'mileage') {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/mileage-for-day`)
    } else if (aids === 'lift' && claiming === 'journeys') {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/taxi-journeys-for-day`)
    } else if (aids === 'lift-during-work') {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/mileage-for-day`)
    }
  })

  router.post('/travel-to-work-pb/transport-option-answers-repeat', function (req, res) {
    const aids = req.session.data['transport-option']
    const claiming = req.session.data['way-of-claiming']

    if (aids === 'taxi' || aids === 'taxi-during-work') {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/taxi-journeys-for-day-repeat`)
    } else if (aids === 'lift' && claiming === 'mileage') {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/mileage-for-day-repeat`)
    } else if (aids === 'lift' && claiming === 'journeys') {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/taxi-journeys-for-day-repeat`)
    } else if (aids === 'lift-during-work') {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/mileage-for-day-repeat`)
    }
  })


  router.post('/travel-to-work-pb/taxi-cost-answer', function (req, res) {
    const cost = req.session.data['cost-of-taxi']
    const journeytype = req.session.data['journey-type']
    const alreadyupload = req.session.data['new-payee-full-name']
    const checked = req.session.data['contact-confirmed']


    if (cost === '100') {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/employer-contribution`)
    } else if (journeytype === 'traveltowork-ammendment'){
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (checked) {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/check-your-answers`)
    } else if (alreadyupload){
      res.redirect(`/${urlPrefix}/portal-screens/upload-summary`)
    } else {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/providing-evidence`)
    }
  })

  router.post('/travel-to-work-pb/change-cost-answer', function (req, res) {
    const change = req.session.data['change-cost']

    if (change === 'yes') {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/taxi-cost`)
    } else if (change === 'no'){
      res.redirect(`/${urlPrefix}/travel-to-work-pb/upload-summary`)
    }
  })

  // router.post('/travel-to-work-pb/agreed-monthly-taxi-answers', function (req, res) {
  //   const aids = req.session.data['agreed-monthly-taxi']
  //
  //   if (aids === 'Yes') {
  //     res.redirect(`/${urlPrefix}/travel-to-work-pb/exceed-agreed-monthly-taxi`)
  //   } else if (aids === 'No') {
  //     res.redirect(`/${urlPrefix}/travel-to-work-pb/taxi-journeys-for-day`)
  //   }
  // })
  // router.post('/travel-to-work-pb/exceed-agreed-monthly-taxi-answers', function (req, res) {
  //   const aids = req.session.data['exceed-agreed-monthly-taxi']
  //
  //   if (aids === 'Yes') {
  //     res.redirect(`/${urlPrefix}/travel-to-work-pb/taxi-journeys-for-day`)
  //   } else if (aids === 'No') {
  //     res.redirect(`/${urlPrefix}/travel-to-work-pb/agreed-monthly-taxi-cost`)
  //   }
  // })

  // post - Submit for upload
  router.post('/travel-to-work-pb/receipt-upload-add', function (req, res) {
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
    res.redirect(`/${urlPrefix}/travel-to-work-pb/upload-summary`)
  })

  // Get
  router.get('/travel-to-work-pb/remove-receipt-upload', function (req, res) {
    req.session.data['file-receipt-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/travel-to-work-pb/remove-receipt-upload`)
  })

  // post - Remove receipt confirmation
  router.post('/travel-to-work-pb/remove-receipt-upload', function (req, res) {
    const allUploads = req.session.data.uploads
    const fileToDelete = req.session.data['file-receipt-to-remove']
    const removeFile = req.session.data['file-upload-remove']

    if (removeFile === 'Yes') {
      allUploads.splice(fileToDelete, 1)
    }
    req.session.data.uploads = allUploads
    req.session.data['file-receipt-to-remove'] = null
    req.session.data['confirm-file-upload-remove'] = null
    res.redirect(`/${urlPrefix}/travel-to-work-pb/upload-summary`)
  })

  // post - Add more receipts
  router.post('/travel-to-work-pb/receipt-upload-more', function (req, res) {
    const anotherReceipt = req.session.data['add-another-receipt']
    const journeytype = req.session.data['journey-type']
    const checked = req.session.data['contact-confirmed']


    if (anotherReceipt === 'Yes') {
      // Reset to stop pre-population of previous visit to page
      req.session.data['file-upload'] = null

      res.redirect(`/${urlPrefix}/travel-to-work-pb/receipt-upload`)
    } else if (anotherReceipt === 'No' && journeytype === 'traveltowork-ammendment') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (checked) {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/check-your-answers`)
    } else if (anotherReceipt === 'No' && journeytype === 'traveltoworkpb') {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/new-payee-name`)
    }
  })

  // post - Submit for mileage
  router.post('/travel-to-work-pb/mileage-for-day-add', function (req, res) {
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
    res.redirect(`/${urlPrefix}/travel-to-work-pb/mileage-for-day-summary`)
  })

  // post - Add more hours
  router.post('/travel-to-work-pb/mileage-for-day-more', function (req, res) {
    const addAnotherDay = req.session.data['add-more-mileage']
    if (addAnotherDay === 'Yes') {
      // Reset to stop pre-population of previous visit to page
      req.session.data['mileage-of-day-date-day'] = null
      req.session.data['mileage-of-day-distance'] = null

      res.redirect(`/${urlPrefix}/travel-to-work-pb/mileage-for-day`)
    } else {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/mileage-confirmation`)
    }
  })

  // Get
  router.get('/travel-to-work-pb/remove-day-mileage', function (req, res) {
    req.session.data['mileage-hours-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/travel-to-work-pb/remove-day-mileage`)
  })

  // post - Remove receipt confirmation
  router.post('/travel-to-work-pb/remove-day-mileage', function (req, res) {
    const allUploads = req.session.data.mileages
    const mileageToRemove = req.session.data['day-mileage-to-remove']
    const confirmationToRemove = req.session.data['day-mileage-remove-confirmation']

    if (confirmationToRemove === 'Yes') {
      allUploads.splice(mileageToRemove, 1)
    }
    req.session.data.mileages = allUploads
    req.session.data['mileage-hours-to-remove'] = null
    req.session.data['day-mileage-remove-confirmation'] = null
    res.redirect(`/${urlPrefix}/travel-to-work-pb/mileage-for-day-summary`)
  })

  // post - Submit for taxi
  router.post('/travel-to-work-pb/taxi-journeys-for-day-add', function (req, res) {
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
    res.redirect(`/${urlPrefix}/travel-to-work-pb/taxi-journeys-for-day-summary`)
  })

  // post - Add more hours
  router.post('/travel-to-work-pb/taxi-journeys-for-day-more', function (req, res) {
    const addAnotherDay = req.session.data['add-more-taxi-journeys']

    if (addAnotherDay === 'Yes') {
      // Reset to stop pre-population of previous visit to page
      req.session.data['taxi-journeys-for-day-date-day'] = null
      req.session.data['taxi-journeys-for-day-journeys'] = null

      res.redirect(`/${urlPrefix}/travel-to-work-pb/taxi-journeys-for-day`)
    } else if (addAnotherDay === 'No' && (req.session.data.journeys === undefined||req.session.data.journeys.length == 0)){
      res.redirect(`/${urlPrefix}/travel-to-work-pb/no-hours-entered`)
    } else {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/taxi-confirmation`)
    }
  })

  // Get
  router.get('/travel-to-work-pb/remove-day-journeys', function (req, res) {
    req.session.data['day-to-remove'] = req.query.removeId
    res.render(`./${folderForViews}/travel-to-work-pb/remove-day-journeys`)
  })

  // post - Remove receipt confirmation
  router.post('/travel-to-work-pb/remove-day-journeys', function (req, res) {
    const all = req.session.data.journeys
    const toRemove = req.session.data['day-to-remove']
    const confirmationToRemove = req.session.data['day-to-remove-confirmation']

    if (confirmationToRemove === 'Yes') {
      all.splice(toRemove, 1)
    }
    req.session.data.journeys = all
    req.session.data['day-to-remove'] = null
    req.session.data['day-to-remove-confirmation'] = null
    res.redirect(`/${urlPrefix}/travel-to-work-pb/taxi-journeys-for-day-summary`)
  })

  router.post('/travel-to-work-pb/taxi-confirmation-answers', function (req, res) {
    const confirm = req.session.data['taxi-confirmation']
    if (confirm === 'Yes') {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/taxi-cost`)
    } else {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/taxi-journeys-for-day-summary`)
    }
  })

  router.post('/travel-to-work-pb/mileage-confirmation-answers', function (req, res) {
    const confirm = req.session.data['mileage-confirmation']
    if (confirm === 'Yes') {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/new-payee-name`)
    } else {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/mileage-for-day-summary`)
    }
  })



  // new journey stuff - taxis


  router.post('/travel-to-work-pb/taxi-journeys-for-day', function (req, res) {
    console.log(req.session.data.support)
    if (req.session.data.remove !== undefined) {
      console.log('Remove')
      req.session.data.remove = undefined
      req.session.data.support.splice(req.session.data.remove, 1)
      res.redirect(`/${urlPrefix}/travel-to-work-pb/taxi-journeys-for-day`)
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
        res.redirect(`/${urlPrefix}/travel-to-work-pb/taxi-journeys-for-day`)
      } else {
        console.log('Continue')
        res.redirect(`/${urlPrefix}/travel-to-work-pb/taxi-journeys-for-day-summary`)
      }
    }
  })

  router.post('/travel-to-work-pb/taxi-journeys-for-day-repeat', function (req, res) {
    console.log(req.session.data.support)
    if (req.session.data.remove !== undefined) {
      console.log('Remove')
      req.session.data.remove = undefined
      req.session.data.support.splice(req.session.data.remove, 1)
      res.redirect(`/${urlPrefix}/travel-to-work-pb/taxi-journeys-for-day-repeat`)
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
        res.redirect(`/${urlPrefix}/travel-to-work-pb/taxi-journeys-for-day`)
      } else {
        console.log('Continue')
        res.redirect(`/${urlPrefix}/travel-to-work-pb/taxi-journeys-for-day-summary`)
      }
    }
  })

  // post - for next screen
  router.post('/travel-to-work-pb/taxi-journeys-for-day-summary', function (req, res) {
    console.log(req.session.data.support)
    const addmonth = req.session.data['new-month']
    const journeytype = req.session.data['journey-type']
    const checked = req.session.data['contact-confirmed']
    const aids = req.session.data['transport-option']
    const lift = req.session.data['way-of-claiming']




    if (req.session.data.travel === undefined || req.session.data.travel.length == 0) {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/no-hours-entered`)
    } else if (addmonth === 'no' && journeytype === 'traveltowork-ammendment' && aids === 'taxi') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (addmonth === 'no' && journeytype === 'traveltowork-ammendment' && aids === 'lift') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (addmonth === 'no' && journeytype === 'traveltowork-ammendment' && aids === 'taxi-during-work') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (checked && addmonth === 'no') {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/check-your-answers`)
    } else if (addmonth === 'no' && journeytype === 'traveltoworkpb' && lift === 'journeys') {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/mileage-amount-paid`)
    } else if (addmonth === 'no' && journeytype === 'traveltoworkpb') {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/taxi-cost`)
    } else if (addmonth === 'yes') {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/claiming-for-month-repeat`)
    }
  })


// new journey stuff - milage
  router.post('/travel-to-work-pb/mileage-for-day', function (req, res) {
    console.log(req.session.data.support)
    if (req.session.data.remove !== undefined) {
      console.log('Remove')
      req.session.data.remove = undefined
      req.session.data.support.splice(req.session.data.remove, 1)
      res.redirect(`/${urlPrefix}/travel-to-work-pb/mileage-for-day`)
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
        res.redirect(`/${urlPrefix}/travel-to-work-pb/mileage-for-day`)
      } else {
        console.log('Continue')
        res.redirect(`/${urlPrefix}/travel-to-work-pb/mileage-for-day-summary`)
      }
    }
  })

  router.post('/travel-to-work-pb/mileage-for-day-repeat', function (req, res) {
    console.log(req.session.data.support)
    if (req.session.data.remove !== undefined) {
      console.log('Remove')
      req.session.data.remove = undefined
      req.session.data.support.splice(req.session.data.remove, 1)
      res.redirect(`/${urlPrefix}/travel-to-work-pb/mileage-for-day-repeat`)
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
        res.redirect(`/${urlPrefix}/travel-to-work-pb/mileage-for-day-repeat`)
      } else {
        console.log('Continue')
        res.redirect(`/${urlPrefix}/travel-to-work-pb/mileage-for-day-summary`)
      }
    }
  })

  // post - Add more support hours
  router.post('/travel-to-work-pb/mileage-for-day-summary', function (req, res) {
    const addmonth = req.session.data['new-month']



     if (addmonth === "yes") {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/claiming-for-month-repeat`)
    } else if (addmonth === "no") {
        res.redirect(`/${urlPrefix}/travel-to-work-pb/mileage-amount-paid`)
    }
  })



  // employer contribution answer

  router.post('/travel-to-work-pb/employer-contribution-answer', function (req, res) {
    const transport = req.session.data['transport-option']
    const journeytype = req.session.data['journey-type']
    const checked = req.session.data['contact-confirmed']

    if (transport === 'taxi' && journeytype === 'traveltowork-ammendment') {
          res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (transport === 'taxi-during-work' && journeytype === 'traveltowork-ammendment') {
          res.redirect(`/${urlPrefix}/travel-to-work-pb/check-your-answers`)
    } else if (transport === 'taxi' && checked) {
          res.redirect(`/${urlPrefix}/travel-to-work-pb/check-your-answers`)
    } else if (transport === 'taxi-during-work' && checked) {
          res.redirect(`/${urlPrefix}/travel-to-work-pb/check-your-answers`)
    } else if (transport === 'taxi' && journeytype === 'traveltoworkpb') {
          res.redirect(`/${urlPrefix}/travel-to-work-pb/providing-evidence`)
    } else if (transport === 'taxi-during-work' && journeytype === 'traveltoworkpb') {
          res.redirect(`/${urlPrefix}/travel-to-work-pb/providing-evidence`)
    } else if (transport === 'lift' && journeytype === 'traveltowork-ammendment') {
          res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (transport === 'lift-during-work' && journeytype === 'traveltowork-ammendment') {
          res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (transport === 'lift' && checked) {
          res.redirect(`/${urlPrefix}/travel-to-work-pb/check-your-answers`)
    } else if (transport === 'lift-during-work' && checked) {
          res.redirect(`/${urlPrefix}/travel-to-work-pb/check-your-answers`)
    } else if (transport === 'lift' && journeytype === 'traveltoworkpb') {
          res.redirect(`/${urlPrefix}/travel-to-work-pb/new-payee-name`)
    } else if (transport === 'lift-during-work' && journeytype === 'traveltoworkpb') {
          res.redirect(`/${urlPrefix}/travel-to-work-pb/new-payee-name`)
    }
  })

  // workplace conact answer

  router.post('/travel-to-work-pb/workplace-contact-answer', function (req, res) {
    const journeytype = req.session.data['journey-type']
    const checked = req.session.data['ttw-declaration']

    if (journeytype === 'traveltowork-ammendment' ) {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (checked === 'true') {
      res.redirect(`/${urlPrefix}/portal-screens/citizen-new-declaration-pre-confirm`)
    } else if (journeytype === 'traveltoworkpb') {
      res.redirect(`/${urlPrefix}/travel-to-work-pb/check-your-answers`)
    }
})

router.post('/travel-to-work-pb/employment-status-answer', function (req, res) {
  const status = req.session.data['employment-status']
  const checked = req.session.data['ttw-declaration']

  if (status === 'Employed') {
  res.redirect(`/${urlPrefix}/travel-to-work-pb/counter-signatory-name`)
} else if (status === 'Self-employed' && checked === 'true') {
  res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
} else if (status === 'Self-employed') {
  res.redirect(`/${urlPrefix}/travel-to-work-pb/check-your-answers`)
}
})

router.post('/travel-to-work-pb/transport-option-answer-preview', function (req, res) {
  const transport = req.session.data['transport-option']

  if (transport === 'taxi') {
  res.redirect(`/${urlPrefix}/travel-to-work-pb/claiming-for-month`)
} else if (transport === 'lift') {
  res.redirect(`/${urlPrefix}/travel-to-work-pb/mileage-or-journey`)
}
})





}
