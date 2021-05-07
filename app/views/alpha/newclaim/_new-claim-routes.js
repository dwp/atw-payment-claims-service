module.exports = function (folderForViews, urlPrefix, router) {
  // Load Portal



  router.post('/newclaim/test-answer', function (req, res) {
    const test = req.session.data['test']
    if (test === 'New') {
      res.redirect(`/${urlPrefix}/newclaim/special-aids-and-equipment`)
    } else if (test === 'Repeat') {
      res.redirect(`/${urlPrefix}/newclaim/test-2`)
    }
  });



// Information on how to make a get

  // router.get('/newclaim/test-2', function (req, res) {
  //   res.render(`./${folderForViews}/newclaim/test-2`)
  // });
  // router.get('/newclaim/before-you-continue', function (req, res) {
  //   res.render(`./${folderForViews}/newclaim/before-you-continue`)
  // });
  //
  //
  // //aids and equipment
  //
  // // get
  // router.get('/newclaim/special-aids-and-equipment', function (req, res) {
  //   res.render(`./${folderForViews}/newclaim/special-aids-and-equipment`)
  // });

 //post - aids and equipment answer
  router.post('/newclaim/aids-and-equipment-answer', function (req, res) {
    const aids = req.session.data['aids-and-equipment']

    if (aids === 'Yes') {

      res.redirect(`/${urlPrefix}/newclaim/before-you-continue`)
    } else if (aids === 'No') {

      res.redirect(`/${urlPrefix}/newclaim/contact-dwp`)
    }
  });

  //post - who purchased the equipment
   router.post('/newclaim/purchase-answer', function (req, res) {
     const purchase = req.session.data['purchase-equipment']

     if (purchase === 'Me') {
       res.redirect(`/${urlPrefix}/newclaim/cost-sharing`)
     } else if (purchase === 'My-employer') {
       res.redirect(`/${urlPrefix}/newclaim/cost-sharing`)
     } else if (purchase === 'Someone-else') {
       res.redirect(`/${urlPrefix}/newclaim/someone-else`)
     }
   });

   //post - additional equipement purchased?
    router.post('/newclaim/additional-equipment-answer', function (req, res) {
      const equipment = req.session.data['additional-equipment']

      if (equipment === 'No') {
        res.redirect(`/${urlPrefix}/newclaim/information-about-the-purchaser`)
      } else if (equipment === 'Yes') {
        res.redirect(`/${urlPrefix}/newclaim/test-2`)
      }
    });

    //post - Digital upload
     router.post('/newclaim/digital-upload-answer', function (req, res) {
       const upload = req.session.data['digital-upload']

       if (upload === 'Yes') {
         res.redirect(`/${urlPrefix}/newclaim/providing-evidence`)
       } else if (upload === 'No') {
         res.redirect(`/${urlPrefix}/newclaim/claim-via-post`)
       }
     });

     //Cost sharing
      router.post('/newclaim/cost-sharing-answer', function (req, res) {
        const cost = req.session.data['cost-sharing']

        if (cost === 'No') {
          res.redirect(`/${urlPrefix}/newclaim/banking-details`)
        } else if (cost === 'Yes') {
          res.redirect(`/${urlPrefix}/newclaim/additional-cost-sharing`)
        }
      });





}
