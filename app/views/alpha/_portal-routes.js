module.exports = function (folderForViews, urlPrefix, router) {

  router.post('/start-journey', function (req, res) {
    if (req.session.data['journey-type'] == "multipleawards"){
      req.session.data['multiple-awards'] = true
      req.session.data['multiple-employers'] = false
    }
    else if (req.session.data['journey-type'] == "multipleemployers"){
      req.session.data['multiple-employers'] = true
      req.session.data['multiple-awards'] = false
    }
    else if (req.session.data['journey-type'] == "multipleawardsandemployers"){
      req.session.data['multiple-awards'] = true
      req.session.data['multiple-employers'] = true
    }
    else{
      req.session.data['multiple-employers'] = false
      req.session.data['multiple-awards'] = false
    }

    res.redirect(`/${urlPrefix}/portal`)
  })

  router.post('/populate-answers', function (req, res) {

    const journeytype = req.session.data['journeytype']

    if (journeytype === 'equipment-and-adaptations') {
      req.session.data['aids-and-equipment'] = "Yes"
      req.session.data['equipment-name'] = "A wheelchair"
      req.session.data['purchase-date-day'] = "12"
      req.session.data['purchase-date-month'] = "06"
      req.session.data['purchase-date-year'] = "21"
      req.session.data['equipment-cost'] = "13500"
      req.session.data['purchase-equipment'] = "My-employer"
      req.session.data['cost-sharing'] = "No"
      req.session.data['name-on-the-account'] = "Joe Bloggs"
      req.session.data['sort-code'] = "01-02-99"
      req.session.data['account-number'] = "12453288"
      req.session.data['digital-upload'] = "Yes"
      req.session.data['file-upload'] = "invoice12-12-21.PDF"
    } else if (journeytype === 'Support-worker') {
      req.session.data['support-for-workplace'] = "Yes"
      req.session.data['support-date-month'] = "May"
      req.session.data['support-date-year'] = "2021"
      // req.session.data['hours'] = "7.5"
      // req.session.data['day.day'] = "04"
      // req.session.data['day.hours'] = "7"
      req.session.data['hourTotal'] = "12"
      req.session.data['cost-of-support'] = "9350"
      req.session.data['name-on-the-account'] = "Mark Stephenson"
      req.session.data['sort-code'] = "01-02-99"
      req.session.data['account-number'] = "12453288"
      // req.session.data['file'] = "invoice12-12-21.PDF"
      req.session.data['counter-signatory-full-name'] = "Mark Stephenson"
      req.session.data['counter-signatory-email'] = "mark.stephenson@deaf-action.co.uk"
    } else if (journeytype === 'travel-to-work') {
      req.session.data['travel-to-work'] = "Yes"
      req.session.data['travel-to-work-date-month'] = "June"
      req.session.data['travel-to-work-date-year'] = "2021"
      req.session.data['transport-option'] = "taxi"
      // req.session.data['mileageTotal'] = "24"
      // req.session.data['mileages'] = "122"
      req.session.data['cost-of-taxi'] = "54"
      req.session.data['name-on-the-account'] = "Mark Stephenson"
      req.session.data['sort-code'] = "01-02-99"
      req.session.data['account-number'] = "12453288"
      req.session.data['counter-signatory-full-name'] = "Mark Stephenson"
      req.session.data['counter-signatory-email'] = "mark.stephenson@deaf-action.co.uk"
    }
    res.redirect(`/index`)
  })

  router.post('/multiple-employer-history-answer', function (req, res) {
    const employer = req.session.data['journey-type']

    if (employer === 'multipleawards') {
      res.redirect(`/${urlPrefix}/portal-screens/multiple-claims-history`)
    } else if (employer === 'supportworker') {
      res.redirect(`/${urlPrefix}/portal-screens/claims-history`)
    }
  })


  // Get
  router.get('/post-login-routing', function (req, res) {
    const useremail = req.query.email
    if (useremail === 'supportworker@email.com') {
      req.session.data['journey-type'] = "supportworker"
      res.redirect(`/${urlPrefix}/portal`)
    } else if (useremail === 'equipment@email.com') {
      req.session.data['journey-type'] = "specialaidsandequipment"
      res.redirect(`/${urlPrefix}/portal`)
    } else if (useremail === 'mobile@email.com') {
      req.session.data['journey-type'] = "mobilenumber"
      res.redirect(`/${urlPrefix}/portal`)
    } else if (useremail === 'travel@email.com') {
      req.session.data['journey-type'] = "traveltowork"
      res.redirect(`/${urlPrefix}/portal`)
    } else if (useremail === 'travelinwork@email.com') {
      req.session.data['journey-type'] = "travelinwork"
      res.redirect(`/${urlPrefix}/portal`)
    } else {
      res.redirect(`/index`)
    }


  })

  // Get
  router.get('/portal-screens/remove-phone-number', function (req, res) {
    res.render(`./${folderForViews}/portal-screens/remove-phone-number`)
  })

  router.get('/portal-screens/personal-information', function (req, res) {
    if (!(req.session.data['new-phone']) && !(req.session.data['new-mobile'])){
    }
    currentPersonalInfo = {
      mobile: req.session.data['new-mobile'],
      home: req.session.data['new-phone']
    }
    req.session.data['currentPersonalInfo'] = currentPersonalInfo
    res.render(`./${folderForViews}/portal-screens/personal-information`)
  })

  // post - Remove phone number confirmation
  router.post('/portal-screens/remove-phone-number', function (req, res) {
    const phoneNumber = req.session.data['new-phone']
    const removeNumber = req.session.data['phone-number-remove']

    if (removeNumber === 'Yes') {
      req.session.data['new-phone'] = null
    }
    res.redirect(`/${urlPrefix}/portal-screens/telephone-number-change`)
  })

  // Get
  router.get('/portal-screens/remove-mobile-number', function (req, res) {
    res.render(`./${folderForViews}/portal-screens/remove-mobile-number`)
  })

  // post - Remove phone number confirmation
  router.post('/portal-screens/remove-mobile-number', function (req, res) {
    const mobileNumber = req.session.data['new-mobile']
    const removeNumber = req.session.data['mobile-number-remove']

    if (removeNumber === 'Yes') {
      req.session.data['new-mobile'] = null
    }
    res.redirect(`/${urlPrefix}/portal-screens/telephone-number-change`)
  })


  router.get('/portal-screens/view-claim', function (req, res) {
    const type = req.query.type
    const claim = req.query.claim

    if (type === 'supportworker') {

    }
    res.redirect(`/${urlPrefix}/support-worker/check-your-answers`)
  })
}
