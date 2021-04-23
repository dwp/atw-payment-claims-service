const express = require('express')
const router = express.Router()

// Branching
router.post('/alpha/newclaim/test-answer', function (req, res) {



  const test = req.session.data['test']

  if (test === 'Yes') {

    res.redirect('/alpha/newclaim/special-aids-and-equipment')
  } else if (test === 'No'){

    res.redirect('/alpha/newclaim/test-1')
  }
})



//aids and equipment
router.post('/alpha/newclaim/aids-and-equipment-answer', function (req, res) {



  const aids = req.session.data['aids-and-equipment']

  if (aids === 'Yes') {
    console.log('yes')
    res.redirect('/alpha/newclaim/before-you-continue')
  } else if (aids === 'No'){
    console.log('no')
    res.redirect('/alpha/newclaim/test-1')
  }
})




module.exports = router
