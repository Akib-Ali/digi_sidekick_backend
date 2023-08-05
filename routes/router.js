const express = require('express');
const router = new express.Router();
const conn = require('../db/conn');
const User = require('../db/user');
const Patient =  require("../db/clinic_patient");
const Doctor = require("../db/clinic_admin");
const path = require('path')
const Jwt = require("jsonwebtoken")
const jwtKey = "dela-axionic";
const bcrypt = require("bcrypt")



//post api 
router.post("/users", async (req, res) => {
    try {
        const { user_name, age, position, gender, location } = req.body;
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

//get api
router.get("/users", async (req, res) => {
    let userlist = await User.find().sort({ createdAt: -1 })
    if (userlist.length > 0) {
        res.send(userlist)
    } else {
        res.send({ result: "No Result found" })
    }
})


//delete api 
router.delete("/user/:_id", async (req, res) => {
    let deleteselecteduser = await User.deleteOne(req.params)
    res.send(deleteselecteduser)
})

//single user api


router.get('/user/:_id', async (req, res) => {
    let result = await User.findOne({ _id: req.params._id });
    if (result) {
      res.send(result);
    } else {
      res.send({ result: "No Record found" });
    }
  });

//update api 

router.put("/user/:_id", async (req, res) => {
    try {
      const { user_name, age, position, gender, location } = req.body;
      console.log(req.body);
      const updatedUser = {
        user_name,
        age,
        position,
        gender,
        location,
        createdAt: Date.now()
      };
      let result = await User.findByIdAndUpdate(req.params._id, updatedUser, { new: true });
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  })



  //clinics 


  //post api 
router.post("/add-patient", async (req, res) => {
  try {
      const {first_name, middle_name,last_name, mobile_no, whatsapp_no, clinic_name} = req.body;
      console.log(req.body)

      const newPatient = new Patient({
          first_name,
          middle_name,
          last_name,
          whatsapp_no,
          mobile_no,
          clinic_name,
          createdAt: Date.now()

      })

      let result = await newPatient.save();
      res.send(result)

  } catch (error) {
      console.log(error)

  }

})

//get api
router.get("/patient-list", async (req, res) => {
  let patientlist = await Patient.find().sort({ createdAt: -1 })
  if (patientlist.length > 0) {
      res.send(patientlist)
  } else {
      res.send({ result: "No Result found" })
  }
})



//jwt




router.post("/register-doctor", async (req, res) => {
  const { name, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10)
  const user = new Doctor({
    name,
    email,
    password: hashPassword,
    createdAt: Date.now()
  })
  let result = await user.save()
  result = result.toObject()
  delete result.password
  res.send(result)

})



router.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await Doctor.findOne({ email: req.body.email });
    if (user) {
      const matchPassword = await bcrypt.compare(req.body.password, user.password);
      if (matchPassword) {
        Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
          if (err) {
            res.send({ result: "something went wrong please try again later" });
          } else {
            res.send({ user, auth: token });
          }
        });
      } else {
        res.send({ result: "Incorrect password" });
      }
    } else {
      res.send({ result: "No User found" });
    }
  }
});

module.exports = router