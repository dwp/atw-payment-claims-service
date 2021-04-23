module.exports = function (folderForViews, urlPrefix, router) {
  // Load Portal
  router.get('/portal', function (req, res) {
    res.render(`./${folderForViews}/newclaim/portal`)
  });

  // Branching
  router.get('/newclaim/new-claim', function (req, res) {
    res.render(`./${folderForViews}/newclaim/new-claim`)
  });

  router.post('/newclaim/test-answer', function (req, res) {
    const test = req.session.data['test']

    if (test === 'Yes') {

      res.redirect(`/${urlPrefix}/newclaim/special-aids-and-equipment`)
    } else if (test === 'No') {

      res.redirect(`/${urlPrefix}/newclaim/test-2`)
    }
  });

  router.get('/newclaim/special-aids-and-equipment', function (req, res) {
    res.render(`./${folderForViews}/newclaim/special-aids-and-equipment`)
  });

  router.get('/newclaim/test-2', function (req, res) {
    res.render(`./${folderForViews}/newclaim/test-2`)
  });

  router.get('/newclaim/before-you-continue', function (req, res) {
    res.render(`./${folderForViews}/newclaim/before-you-continue`)
  });

  //aids and equipment
  router.post('newclaim/aids-and-equipment-answer', function (req, res) {
    const aids = req.session.data['aids-and-equipment']

    if (aids === 'Yes') {
      console.log('yes')
      res.redirect(`/${urlPrefix}/newclaim/before-you-continue`)
    } else if (aids === 'No') {
      console.log('no')
      res.redirect(`/${urlPrefix}/newclaim/test-2`)
    }
  });
}
