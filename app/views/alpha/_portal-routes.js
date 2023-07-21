module.exports = function (folderForViews, urlPrefix, router) {

  router.post('/start-journey', function (req, res) {
    if (req.session.data['journey-type'] == "multipleawards") {
      req.session.data['multiple-awards'] = true
      req.session.data['multiple-employers'] = false
    }
    else if (req.session.data['journey-type'] == "multipleemployers") {
      req.session.data['multiple-employers'] = true
      req.session.data['multiple-awards'] = false
    }
    else if (req.session.data['journey-type'] == "multipleawardsandemployers") {
      req.session.data['multiple-awards'] = true
      req.session.data['multiple-employers'] = true
    }
    else {
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
    if (!(req.session.data['new-phone']) && !(req.session.data['new-mobile'])) {
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

  router.post('/portal-screens/cookies', function (req, res) {
    const analyticsCookies = req.session.data['analytics-cookies']

    if (analyticsCookies){
      res.redirect(`/${urlPrefix}/portal-screens/yes`)

    }

    res.redirect(`/${urlPrefix}/portal-screens/no`)
  })


  router.get('/portal-screens/view-claim', function (req, res) {
    const type = req.query.type
    const claim = req.query.claim

    if (type === 'supportworker') {

      if (claim == 1) {
        req.session.data =
        {
          type: "supportworker",
          claim: "1",
          "view-claim": true,
          "journey-type": "supportworker",
          "multiple-employers": false,
          "multiple-awards": false,
          "answers-checked-sw": "true",
          "support-for-workplace": "Yes",
          providor: "John Doe",
          "support-month": "6",
          "support-year": "2023",
          dataList: [
            {
              weekNumber: 1,
              days: [
                {
                  value: 1,
                  text: "Thursday 1 June",
                },
                {
                  value: 2,
                  text: "Friday 2 June",
                },
                {
                  value: 3,
                  text: "Saturday 3 June",
                },
                {
                  value: 4,
                  text: "Sunday 4 June",
                },
              ],
            },
            {
              weekNumber: 2,
              days: [
                {
                  value: 5,
                  text: "Monday 5 June",
                },
                {
                  value: 6,
                  text: "Tuesday 6 June",
                },
                {
                  value: 7,
                  text: "Wednesday 7 June",
                },
                {
                  value: 8,
                  text: "Thursday 8 June",
                },
                {
                  value: 9,
                  text: "Friday 9 June",
                },
                {
                  value: 10,
                  text: "Saturday 10 June",
                },
                {
                  value: 11,
                  text: "Sunday 11 June",
                },
              ],
            },
            {
              weekNumber: 3,
              days: [
                {
                  value: 12,
                  text: "Monday 12 June",
                },
                {
                  value: 13,
                  text: "Tuesday 13 June",
                },
                {
                  value: 14,
                  text: "Wednesday 14 June",
                },
                {
                  value: 15,
                  text: "Thursday 15 June",
                },
                {
                  value: 16,
                  text: "Friday 16 June",
                },
                {
                  value: 17,
                  text: "Saturday 17 June",
                },
                {
                  value: 18,
                  text: "Sunday 18 June",
                },
              ],
            },
            {
              weekNumber: 4,
              days: [
                {
                  value: 19,
                  text: "Monday 19 June",
                },
                {
                  value: 20,
                  text: "Tuesday 20 June",
                },
                {
                  value: 21,
                  text: "Wednesday 21 June",
                },
                {
                  value: 22,
                  text: "Thursday 22 June",
                },
                {
                  value: 23,
                  text: "Friday 23 June",
                },
                {
                  value: 24,
                  text: "Saturday 24 June",
                },
                {
                  value: 25,
                  text: "Sunday 25 June",
                },
              ],
            },
            {
              weekNumber: 5,
              days: [
                {
                  value: 26,
                  text: "Monday 26 June",
                },
                {
                  value: 27,
                  text: "Tuesday 27 June",
                },
                {
                  value: 28,
                  text: "Wednesday 28 June",
                },
                {
                  value: 29,
                  text: "Thursday 29 June",
                },
                {
                  value: 30,
                  text: "Friday 30 June",
                },
              ],
            },
          ],
          "support-days": [
            "1",
            "2",
            "8",
            "9",
            "15",
            "16",
            "22",
            "23",
            "29",
            "30",
          ],
          action: "continue",
          support: [
            {
              day: "1",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "2",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "8",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "9",
              support_hours: "3",
              support_minutes: "",
            },
            {
              day: "15",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "16",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "22",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "23",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "29",
              support_hours: "4",
              support_minutes: "30",
            },
            {
              day: "30",
              support_hours: "4",
              support_minutes: "",
            },
          ],
          "support-worker-errors": [
          ],
          "month-list": [
            {
              month: "6",
              year: "2023",
              support: [
                {
                  day: "1",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "2",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "8",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "9",
                  support_hours: "3",
                  support_minutes: "",
                },
                {
                  day: "15",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "16",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "22",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "23",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "29",
                  support_hours: "4",
                  support_minutes: "30",
                },
                {
                  day: "30",
                  support_hours: "4",
                  support_minutes: "",
                },
              ],
              totalhours: 39,
              totalminutes: 30,
            },
          ],
          "hour-total": 39,
          "minute-total": 30,
          "new-month": "no",
          "cost-of-support": "1450",
          "file-upload": "",
          uploads: [
            {
              file: "",
            },
          ],
          "add-another-receipt": "No",
          "existing-payee": "one",
          "counter-signatory-full-name": "John Smith",
          "counter-signatory-email": "john.smith@abc.com",
          "contact-confirmed": "true",
        }
      }
      else if (claim == 2) {
        req.session.data =
        {
          "journey-type": "supportworker",
          "multiple-employers": false,
          "multiple-awards": false,
          "support-for-workplace": "Yes",
          providor: "Jane Green",
          "support-month": "5",
          "support-year": "2023",
          dataList: [
            {
              weekNumber: 1,
              days: [
                {
                  value: 1,
                  text: "Thursday 1 June",
                },
                {
                  value: 2,
                  text: "Friday 2 June",
                },
                {
                  value: 3,
                  text: "Saturday 3 June",
                },
                {
                  value: 4,
                  text: "Sunday 4 June",
                },
              ],
            },
            {
              weekNumber: 2,
              days: [
                {
                  value: 5,
                  text: "Monday 5 June",
                },
                {
                  value: 6,
                  text: "Tuesday 6 June",
                },
                {
                  value: 7,
                  text: "Wednesday 7 June",
                },
                {
                  value: 8,
                  text: "Thursday 8 June",
                },
                {
                  value: 9,
                  text: "Friday 9 June",
                },
                {
                  value: 10,
                  text: "Saturday 10 June",
                },
                {
                  value: 11,
                  text: "Sunday 11 June",
                },
              ],
            },
            {
              weekNumber: 3,
              days: [
                {
                  value: 12,
                  text: "Monday 12 June",
                },
                {
                  value: 13,
                  text: "Tuesday 13 June",
                },
                {
                  value: 14,
                  text: "Wednesday 14 June",
                },
                {
                  value: 15,
                  text: "Thursday 15 June",
                },
                {
                  value: 16,
                  text: "Friday 16 June",
                },
                {
                  value: 17,
                  text: "Saturday 17 June",
                },
                {
                  value: 18,
                  text: "Sunday 18 June",
                },
              ],
            },
            {
              weekNumber: 4,
              days: [
                {
                  value: 19,
                  text: "Monday 19 June",
                },
                {
                  value: 20,
                  text: "Tuesday 20 June",
                },
                {
                  value: 21,
                  text: "Wednesday 21 June",
                },
                {
                  value: 22,
                  text: "Thursday 22 June",
                },
                {
                  value: 23,
                  text: "Friday 23 June",
                },
                {
                  value: 24,
                  text: "Saturday 24 June",
                },
                {
                  value: 25,
                  text: "Sunday 25 June",
                },
              ],
            },
            {
              weekNumber: 5,
              days: [
                {
                  value: 26,
                  text: "Monday 26 June",
                },
                {
                  value: 27,
                  text: "Tuesday 27 June",
                },
                {
                  value: 28,
                  text: "Wednesday 28 June",
                },
                {
                  value: 29,
                  text: "Thursday 29 June",
                },
                {
                  value: 30,
                  text: "Friday 30 June",
                },
              ],
            },
          ],
          "support-days": [
            "29",
          ],
          action: "continue",
          support: [
            {
              day: "29",
              support_hours: "1",
              support_minutes: "50",
            },
          ],
          "support-worker-errors": [
          ],
          "month-list": [
            {
              month: "5",
              year: "2023",
              support: [
                {
                  day: "29",
                  support_hours: "1",
                  support_minutes: "50",
                },
              ],
              totalhours: 1,
              totalminutes: 50,
            },
            {
              month: "6",
              year: "2023",
              support: [
                {
                  day: "5",
                  repeatsupport_hours: "1",
                  repeatsupport_minutes: "10",
                },
                {
                  day: "12",
                  repeatsupport_hours: "1",
                  repeatsupport_minutes: "",
                },
                {
                  day: "19",
                  repeatsupport_hours: "1",
                  repeatsupport_minutes: "",
                },
                {
                  day: "20",
                  repeatsupport_hours: "1",
                  repeatsupport_minutes: "55",
                },
                {
                  day: "26",
                  repeatsupport_hours: "2",
                  repeatsupport_minutes: "",
                },
                {
                  day: "27",
                  repeatsupport_hours: "1",
                  repeatsupport_minutes: "",
                },
              ],
              totalhours: 8,
              totalminutes: 5,
            },
          ],
          "hour-total": 9,
          "minute-total": 55,
          "new-month": "no",
          "repeatsupport-month": "6",
          "repeatsupport-year": "2023",
          "repeatsupport-days": [
            "5",
            "12",
            "19",
            "20",
            "26",
            "27",
          ],
          repeatsupport: null,
          "cost-of-support": "980",
          "file-upload": "",
          uploads: [
            {
              file: "",
            },
          ],
          "add-another-receipt": "No",
          "existing-payee": "two",
          "counter-signatory-full-name": "John Smith",
          "counter-signatory-email": "john.smith@abc.com",
          "contact-confirmed": "true",
        }


      }
      else if (claim == 3) {
        req.session.data = 
        {
          "journey-type": "supportworker",
          "multiple-employers": false,
          "multiple-awards": false,
          "support-for-workplace": "Yes",
          providor: "John Smith",
          "support-month": "5",
          "support-year": "2023",
          dataList: [
            {
              weekNumber: 1,
              days: [
                {
                  value: 1,
                  text: "Monday 1 May",
                },
                {
                  value: 2,
                  text: "Tuesday 2 May",
                },
                {
                  value: 3,
                  text: "Wednesday 3 May",
                },
                {
                  value: 4,
                  text: "Thursday 4 May",
                },
                {
                  value: 5,
                  text: "Friday 5 May",
                },
                {
                  value: 6,
                  text: "Saturday 6 May",
                },
                {
                  value: 7,
                  text: "Sunday 7 May",
                },
              ],
            },
            {
              weekNumber: 2,
              days: [
                {
                  value: 8,
                  text: "Monday 8 May",
                },
                {
                  value: 9,
                  text: "Tuesday 9 May",
                },
                {
                  value: 10,
                  text: "Wednesday 10 May",
                },
                {
                  value: 11,
                  text: "Thursday 11 May",
                },
                {
                  value: 12,
                  text: "Friday 12 May",
                },
                {
                  value: 13,
                  text: "Saturday 13 May",
                },
                {
                  value: 14,
                  text: "Sunday 14 May",
                },
              ],
            },
            {
              weekNumber: 3,
              days: [
                {
                  value: 15,
                  text: "Monday 15 May",
                },
                {
                  value: 16,
                  text: "Tuesday 16 May",
                },
                {
                  value: 17,
                  text: "Wednesday 17 May",
                },
                {
                  value: 18,
                  text: "Thursday 18 May",
                },
                {
                  value: 19,
                  text: "Friday 19 May",
                },
                {
                  value: 20,
                  text: "Saturday 20 May",
                },
                {
                  value: 21,
                  text: "Sunday 21 May",
                },
              ],
            },
            {
              weekNumber: 4,
              days: [
                {
                  value: 22,
                  text: "Monday 22 May",
                },
                {
                  value: 23,
                  text: "Tuesday 23 May",
                },
                {
                  value: 24,
                  text: "Wednesday 24 May",
                },
                {
                  value: 25,
                  text: "Thursday 25 May",
                },
                {
                  value: 26,
                  text: "Friday 26 May",
                },
                {
                  value: 27,
                  text: "Saturday 27 May",
                },
                {
                  value: 28,
                  text: "Sunday 28 May",
                },
              ],
            },
            {
              weekNumber: 5,
              days: [
                {
                  value: 29,
                  text: "Monday 29 May",
                },
                {
                  value: 30,
                  text: "Tuesday 30 May",
                },
                {
                  value: 31,
                  text: "Wednesday 31 May",
                },
              ],
            },
          ],
          "support-days": [
            "4",
            "5",
            "11",
            "12",
            "18",
            "19",
            "25",
            "26",
          ],
          action: "continue",
          support: [
            {
              day: "4",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "5",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "11",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "12",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "18",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "19",
              support_hours: "4",
              support_minutes: "",
            },
            {
              day: "25",
              support_hours: "4",
              support_minutes: "20",
            },
            {
              day: "26",
              support_hours: "4",
              support_minutes: "",
            },
          ],
          "support-worker-errors": [
          ],
          "month-list": [
            {
              month: "5",
              year: "2023",
              support: [
                {
                  day: "4",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "5",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "11",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "12",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "18",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "19",
                  support_hours: "4",
                  support_minutes: "",
                },
                {
                  day: "25",
                  support_hours: "4",
                  support_minutes: "20",
                },
                {
                  day: "26",
                  support_hours: "4",
                  support_minutes: "",
                },
              ],
              totalhours: 32,
              totalminutes: 20,
            },
          ],
          "hour-total": 32,
          "minute-total": 20,
          "new-month": "no",
          "cost-of-support": "1600",
          "file-upload": "",
          uploads: [
            {
              file: "",
            },
          ],
          "add-another-receipt": "No",
          "existing-payee": "one",
          "counter-signatory-full-name": "John Smith",
          "counter-signatory-email": "john.smith@abc.com",
          "contact-confirmed": "true",
        }


      }
      req.session.data['view-claim'] = true

    }
    res.redirect(`/${urlPrefix}/support-worker/check-your-answers`)
  })
}
