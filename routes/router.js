const express = require('express');
const router = new express.Router();
const conn = require('../db/conn');
const User = require('../db/user')
const path = require('path')


//post api 
router.post("/post-newuser", async (req, res) => {
    try {
      const { user_name, age,position, gender, location } = req.body;
      console.log(req.body)
  
      const newUser = new User({
        user_name,
        age,
        position,
        gender,
        location,
        createdAt: Date.now()
  
      })
  
      let result = await newUser.save();
      res.send(result)
  
    } catch (error) {
      console.log(error)
  
    }
  
  })
  


module.exports = router