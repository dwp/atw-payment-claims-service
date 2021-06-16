module.exports = function (folderForViews, urlPrefix, router) {

  router.post('/start-journey', function (req, res) {
    res.redirect(`/${urlPrefix}/portal`)
  })

  router.post('/populate-answers', function (req, res) {

    const journeytype = req.session.data['journeytype']

    if (journeytype ==='equipment-and-adaptations') {
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
    } else if (journeytype ==='Support-worker') {
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
    } else if (journeytype ==='travel-to-work') {
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


}
