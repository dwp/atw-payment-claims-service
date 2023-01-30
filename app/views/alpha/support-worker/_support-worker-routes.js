const { indexOf } = require("lodash")

module.exports = function (folderForViews, urlPrefix, router) {
  router.get('/support-worker/start-a-claim', function (req, res) {

    res.render(`./${folderForViews}/support-worker/start-a-claim`)
  })

  // post - Are you claiming for support in the workplace
  router.post('/support-worker/support-for-workplace-answers', function (req, res) {
    const aids = req.session.data['support-for-workplace']

    if (aids === 'Yes') {
      res.redirect(`/${urlPrefix}/support-worker/grant-information`)
    } else if (aids === 'No') {
      res.redirect(`/${urlPrefix}/support-worker/contact-dwp`)
    }
  })

  // // post - Submit for hours
  // router.post('/support-worker/hours-for-day-summary', function (req, res) {
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
  //   res.redirect(`/${urlPrefix}/support-worker/hours-for-day-summary`)
  // })

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
    } else if (addAnotherDay === 'No' && (req.session.data.hours === undefined||req.session.data.hours.length == 0)){
      res.redirect(`/${urlPrefix}/support-worker/no-hours-entered`)
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

  // post - Add more support hours
  router.post('/support-worker/hours-for-day-summary', function (req, res) {
    console.log(req.session.data.support)
    const month = req.session.data['new-month']
    const journeytype = req.session.data['journey-type']
    const checked = req.session.data['contact-confirmed']

    if (req.session.data.support === undefined || req.session.data.support.length == 0) {
      res.redirect(`/${urlPrefix}/support-worker/no-hours-entered`)
    } else if (month === 'yes') {
      res.redirect(`/${urlPrefix}/support-worker/claiming-for-month-repeat`)
    } else if (month === 'no' && journeytype === 'traveltowork-ammendment') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (month === 'no' && checked) {
      res.redirect(`/${urlPrefix}/support-worker/check-your-answers`)
    } else if (month === 'no' && journeytype === 'supportworker') {
      res.redirect(`/${urlPrefix}/support-worker/cost-of-support`)
    }
  })

  router.post('/support-worker/grant-information-answer', function (req, res) {
    res.redirect(`/${urlPrefix}/support-worker/before-you-continue`)
  })

  router.post('/support-worker/before-you-continue-answer', function (req, res) {
    res.redirect(`/${urlPrefix}/support-worker/claiming-for-month`)
  })

  router.post('/support-worker/month-claim-answer', function (req, res) {
    res.redirect(`/${urlPrefix}/support-worker/hours-for-day`)
  })

  router.post('/support-worker/month-claim-answer-repeat', function (req, res) {
    res.redirect(`/${urlPrefix}/support-worker/hours-for-day-repeat`)
  })

  router.post('/support-worker/hours-for-day', function (req, res) {
    console.log(req.session.data.support)
    var month = req.session.data['support-month']
    var year = req.session.data['support-year']

    var daysInMonth = function (month, year) {
      switch (month) {
          case 1 :
              return (year % 4 == 0 && year % 100) || year % 400 == 0 ? 29 : 28;
          case 8 : case 3 : case 5 : case 10 :
              return 30;
          default :
              return 31
      }
    };
    var month_support_check = req.session.data.support
    var errors = []
    req.session.data["support-worker-errors"] = []

    month_support_check.forEach(function(day_support) {
      //Enter hours of support
      if (!day_support.support_hours){
        errors.push({text: "Enter hours of support", href: "#support["+indexOf(month_support_check, day_support)+"][support_hours]"})
      }
      //Hours of support must be between 1 and 24
      else if (day_support.support_hours < 1 || day_support.support_hours > 24){
        errors.push({text: "Hours of support must be between 1 and 24", href: "#support["+indexOf(month_support_check, day_support)+"][support_hours]"})
      }
      //Hours must be a whole number
      else if (isNaN(day_support.support_hours)){
        errors.push({text: "Hours must be a whole number", href: "#support["+indexOf(month_support_check, day_support)+"][support_hours]"})
      }

      //Minutes of support must be below 60
      if (day_support.support_minutes > 60){
        errors.push({text: "Minutes of support must be below 60", href: "#support["+indexOf(month_support_check, day_support)+"][support_minutes]"})
      }
      //Minutes must be a whole number
      else if (isNaN(day_support.support_minutes)){
        errors.push({text: "Minutes must be a whole number", href: "#support["+indexOf(month_support_check, day_support)+"][support_minutes]"})
      }
      
    });

    if (errors.length){
      req.session.data["support-worker-errors"] = errors
      res.redirect(`/${urlPrefix}/support-worker/hours-for-day`)
      return
    }

    if (req.session.data.remove !== undefined) {
      console.log('Remove')
      req.session.data.remove = undefined
      req.session.data.support.splice(req.session.data.remove, 1)
      res.redirect(`/${urlPrefix}/support-worker/hours-for-day`)
    } else {
      if (req.session.data.action === 'add') {
        console.log('Add')
        console.log(req.session.data)
        req.session.data.support = [...req.session.data.support, {
          support_hours: '',
          support_minutes: '',
          day: '',
          month: '',
          year: ''
        }]
        res.redirect(`/${urlPrefix}/support-worker/hours-for-day`)
      } else {
        console.log('Continue')
        
        var month_support = req.session.data.support
        console.log(month)
        console.log(year)
        console.log(month_support)
        var list = [
          { month: month, year: year, support: month_support }
        ];
        if (req.session.data['month-list']){
          var month_index = req.session.data['month-list'].findIndex((el) => el.month === month && el.year === year);
          if (month_index != -1){
            req.session.data['month-list'][month_index] = list[0]
          }
          else{
            req.session.data['month-list'].push(list[0]);
          }
        }
        else{
          req.session.data['month-list'] = list
        }
        console.log(req.session.data['month-list'])
        res.redirect(`/${urlPrefix}/support-worker/hours-for-day-summary`)
      }
    }
  })

  router.post('/support-worker/hours-for-day-repeat', function (req, res) {
    console.log(req.session.data.support)

    var month = req.session.data['repeatsupport-month']
    var year = req.session.data['repeatsupport-year']

    var daysInMonth = function (month, year) {
      switch (month) {
          case 1 :
              return (year % 4 == 0 && year % 100) || year % 400 == 0 ? 29 : 28;
          case 8 : case 3 : case 5 : case 10 :
              return 30;
          default :
              return 31
      }
    };
    var month_support_check = req.session.data.repeatsupport
    var errors = []
    req.session.data["support-worker-errors"] = []

    month_support_check.forEach(function(day_support) {
      //Enter hours of support
      if (!day_support.repeatsupport_hours){
        errors.push({text: "Enter hours of support", href: "#repeatsupport["+indexOf(month_support_check, day_support)+"][repeatsupport_hours]"})
      }
      //Hours of support must be between 1 and 24
      else if (day_support.repeatsupport_hours < 1 || day_support.repeatsupport_hours > 24){
        errors.push({text: "Hours of support must be between 1 and 24", href: "#repeatsupport["+indexOf(month_support_check, day_support)+"][repeatsupport_hours]"})
      }
      //Hours must be a whole number
      else if (isNaN(day_support.repeatsupport_hours)){
        errors.push({text: "Hours must be a whole number", href: "#repeatsupport["+indexOf(month_support_check, day_support)+"][repeatsupport_hours]"})
      }

      //Minutes of support must be below 60
      if (day_support.repeatsupport_minutes > 60){
        errors.push({text: "Minutes of support must be below 60", href: "#repeatsupport["+indexOf(month_support_check, day_support)+"][repeatsupport_minutes]"})
      }
      //Minutes must be a whole number
      else if (isNaN(day_support.repeatsupport_minutes)){
        errors.push({text: "Minutes must be a whole number", href: "#repeatsupport["+indexOf(month_support_check, day_support)+"][repeatsupport_minutes]"})
      }
      
    });

    if (errors.length){
      req.session.data["support-worker-errors"] = errors
      res.redirect(`/${urlPrefix}/support-worker/hours-for-day-repeat`)
      return
    }

    if (req.session.data.remove !== undefined) {
      console.log('Remove')
      req.session.data.remove = undefined
      req.session.data.support.splice(req.session.data.remove, 1)
      res.redirect(`/${urlPrefix}/support-worker/hours-for-day-repeat`)
    } else {
      if (req.session.data.action === 'add') {
        console.log('Add')
        console.log(req.session.data)
        req.session.data.support = [...req.session.data.support, {
          support_hours: '',
          support_minutes: '',
          day: '',
          month: '',
          year: ''
        }]
        res.redirect(`/${urlPrefix}/support-worker/hours-for-day-repeat`)
      } else {
        console.log('Continue')
        var month = req.session.data['repeatsupport-month']
        var year = req.session.data['repeatsupport-year']
        var month_support = req.session.data.repeatsupport
        req.session.data.repeatsupport = null
        console.log(month)
        console.log(year)
        console.log(month_support)
        var list = [
          { month: month, year: year, support: month_support }
        ];
        if (req.session.data['month-list']){
          var month_index = req.session.data['month-list'].findIndex((el) => el.month === month && el.year === year);
          if (month_index != -1){
            req.session.data['month-list'][month_index] = list[0]
          }
          else{
            req.session.data['month-list'].push(list[0]);
          }
        }
        else{
          req.session.data['month-list'] = list
        }
        console.log(req.session.data['month-list'])
        res.redirect(`/${urlPrefix}/support-worker/hours-for-day-summary`)
      }
    }
  })

  // Get
router.get('/support-worker/hours-for-day-change', function (req, res) {
  if (req.query.month){
    var month_list = req.session.data['month-list']
    var month_data = month_list.find((month) => month.month === req.query.month && month.year === req.query.year);
    if (month_data.support[0]["repeatsupport_hours"]){
      req.session.data["repeatsupport-month-repeat"] = req.query.month
      req.session.data["repeatsupport-year-repeat"] = req.query.year
      req.session.data["repeatsupport"] = month_data.support
      res.redirect(`/${urlPrefix}/support-worker/hours-for-day-repeat`)
    }
    else {
      req.session.data["support-month"] = req.query.month
      req.session.data["support-year"] = req.query.year
      req.session.data["support"] = month_data.support
      res.redirect(`/${urlPrefix}/support-worker/hours-for-day`)
    }
  }
  else{
    res.redirect(`/${urlPrefix}/support-worker/hours-for-day`)
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

  // post - Confirm work hours
  router.post('/support-worker/cost-of-support-answer', function (req, res) {
    const cost = req.session.data['cost-of-support']
    const journeytype = req.session.data['journey-type']
    const checked = req.session.data['contact-confirmed']

    if (cost === '100') {
      res.redirect(`/${urlPrefix}/support-worker/employer-contribution`)
    } else if (journeytype === 'traveltowork-ammendment'){
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (journeytype === 'supportworker' && checked){
      res.redirect(`/${urlPrefix}/support-worker/check-your-answers`)
    } else if (journeytype === 'supportworker'){
      res.redirect(`/${urlPrefix}/support-worker/providing-evidence`)
    }
  })

  router.post('/support-worker/change-cost-answer', function (req, res) {
    const change = req.session.data['change-cost']

    if (change === 'yes') {
      res.redirect(`/${urlPrefix}/support-worker/cost-of-support`)
    } else if (change === 'no'){
      res.redirect(`/${urlPrefix}/travel-to-work/upload-summary`)
    }
  })

  // post - Add more receipts
  router.post('/support-worker/receipt-upload-more', function (req, res) {
    const anotherReceipt = req.session.data['add-another-receipt']
    const journeytype = req.session.data['journey-type']
    const checked = req.session.data['contact-confirmed']

    if (anotherReceipt === 'Yes') {
      // Reset to stop pre-population of previous visit to page
      req.session.data['file-upload'] = null

      res.redirect(`/${urlPrefix}/support-worker/receipt-upload`)
    } else if (journeytype === 'traveltowork-ammendment') {
      res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
    } else if (journeytype === 'supportworker' && checked) {
      res.redirect(`/${urlPrefix}/support-worker/check-your-answers`)
    } else if (journeytype === 'supportworker') {
      res.redirect(`/${urlPrefix}/support-worker/existing-payee-details`)
    }
  })

  // workplace conact answer

  router.post('/support-worker/contact-answers', function (req, res) {
    const journeytype = req.session.data['journey-type']
    const checked = req.session.data['sw-declaration']

    if (journeytype === 'supportworker' && checked === 'true') {
    res.redirect(`/${urlPrefix}/portal-screens/citizen-new-declaration-pre-confirm`)
  } else if (journeytype === 'supportworker') {
      res.redirect(`/${urlPrefix}/support-worker/check-your-answers`)
  } else if (journeytype === 'traveltowork-ammendment') {
    res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
  }
})

router.post('/support-worker/existing-payee-answers', function (req, res) {
  const payee = req.session.data['existing-payee']
  const journey = req.session.data['journey-type']
  const checked = req.session.data['contact-confirmed']

  if (payee === 'New') {
  res.redirect(`/${urlPrefix}/support-worker/new-payee-name`)
} else if (journey === 'traveltowork-ammendment') {
  res.redirect(`/${urlPrefix}/portal-screens/check-your-answers`)
} else if (checked){
  res.redirect(`/${urlPrefix}/support-worker/check-your-answers`)
} else {
  res.redirect(`/${urlPrefix}/support-worker/counter-signatory-name`)
}
})



}
