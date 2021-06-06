//Importing Libraries
const express = require('express')
//Importing  signUpTemplate
const router = express.Router()
const signUpTemplateCopy = require('../models/signupmodel')
const bcrypt = require('bcrypt')


//Creating a post request for signup page
router.post('/signup', async(request, response) => {
  //Creating instance of signUpTemplate
  const saltPassword = await bcrypt.genSalt(10)
  const securePassword = await bcrypt.hash(request.body.password, saltPassword)

  const signedUpUser = new signUpTemplateCopy({
    //storing data from frontend inputs to labels
    fullName: request.body.fullName,  
    email: request.body.email,
    mobileNumber: request.body.mobileNumber,
    password: securePassword
  })
  //Saving new database entry
  signedUpUser.save()
  //Sending data to database
    .then(data => {
      response.json(data)
    })
  //Displaying error as json object , if catches any
    .catch(error => {
      response.json(error)
    })
})


module.exports = router