const express = require('express');
const router = new express.Router();
const conn = require('../db/conn');
const User = require('../db/user')
const path = require('path')


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

//update api 

// router.post("user/:_id", async (req, res) => {
//     try {
//         const { user_name, age, position, gender, location } = req.body;
//         console.log(req.body)
//         const updatedUser = {
//             user_name,
//             age,
//             position,
//             gender,
//             location,
//             createdAt: Date.now()
//           };
//         let result = await User.findByIdAndUpdate(req.params._id, updatedUser, { new: true });
//         res.send(result);

//     } catch (error) {
//         console.log(error)

//     }
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


module.exports = router