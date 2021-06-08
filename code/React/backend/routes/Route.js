//Importing Libraries
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt') //̵Library for generating encrypted passwords
const Joi = require('joi') //Library for Validation
const User = require('../models/signupmodel') //Importing  signUpTemplate
const jwt = require('jsonwebtoken') //Library for generating login tokens

//Creating Register Validation Schema
const registerSchema = Joi.object(
    {
    fullName: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    mobileNumber: Joi.string().min(10).max(10).required()
    }
    );

//Creating Login Validation Schema
const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(6).required(),
})

//Creating a post request for signup page
router.post('/signup', async(req, res) => {

  //Validate before putting user data into database
  const { error } = registerSchema.validate(req.body);
  if(error) return res.status(400).send(res.send(error.details[0].message))

  //Generating encrypted password for given password
  const saltPassword = await bcrypt.genSalt(10)
  const securePassword = await bcrypt.hash(req.body.password, saltPassword)
  
  //Checking if the user already exists with the same email in the database
  const emailExist = await User.findOne({email: req.body.email })
  if (emailExist) return res.status(400).send('Email already exists')

  //Checking if the user already exists with the same email in the database
  const numberExist = await User.findOne({mobileNumber: req.body.mobileNumber })
  if (numberExist) return res.status(400).send('User Already Exists with this number ')
  //Creating instance of signUpTemplate , New User
  const signedUpUser = new User({
    //storing data from frontend inputs to labels
    fullName: req.body.fullName,  
    email: req.body.email,
    mobileNumber: req.body.mobileNumber,
    password: securePassword
  })
  
  try{
    //Trying to save user
      const savedUser = await signedUpUser.save();
      res.send({user : signedUpUser._id});
  }catch(err){
    //If saving gets any error then res with status 400 and sends the error
    res.status(400).send(err);
  }
})

//Creating a post request for login page
router.post('/login', async(req, res) => {
  const { error } = loginSchema.validate(req.body);
  if(error) return res.status(400).send(res.send(error.details[0].message))

  //Checking if the user exists
  const user = await User.findOne({email: req.body.email })
  if (!user) return res.status(400).send('Invalid Crendentials')
  
  //Checking if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if(!validPass) return res.status(400).send('Invalid Credentials')

  //Creating and assigning token
  const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN); //Passing in user id for generating token for specific id
  res.header('auth-token', token).send(token);

  // res.send('Logged In');

})


module.exports = router