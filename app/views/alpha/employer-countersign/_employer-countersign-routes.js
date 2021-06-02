module.exports = function (folderForViews, urlPrefix, router) {

  // post - aids and equipment answer
  router.post('/employer-countersign/employer-countersign-answer', function (req, res) {
    const employer = req.session.data['employer-agree']

    if (employer === 'Yes') {
      res.redirect(`/${urlPrefix}/employer-countersign/declaration`)
    } else if (employer === 'No') {
      res.redirect(`/${urlPrefix}/employer-countersign/send-back`)
    }
  })

}
