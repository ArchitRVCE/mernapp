const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')

const jwt = require('jsonwebtoken');
const jwtSecret = "MyNameIsProdDeveloper#1"
const bcrypt = require('bcrypt')

const User = require('../models/User')

router.post('/createuser', [
    body('email','Check your email brother!').isEmail(),
    body('password').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let securePassword = await bcrypt.hash(req.body.password,salt)
        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                location: req.body.location,
                password: securePassword
            })
            res.json({ success: true })
        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })


router.post('/loginuser',[body('email','Check your email brother').isEmail()],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            let email = req.body.email;
            try {
                let userData = await User.findOne({email})
                if(!userData){
                    return res.status(400).json({errors:'Try loggin with correct credentials'})
                }
                let pwdCheck = bcrypt.compare(req.body.password,userData.password);
                if(!pwdCheck){
                //if(userData.password !== req.body.password ){
                    return res.status(400).json({errors:'Try loggin with correct credentials'})     
                }
                const data = {
                    user:{
                        id: userData.id
                    }
                }
                const authToken = jwt.sign(data,jwtSecret); // can add expiry date
                return res.json({success:true,authToken: authToken})
            } catch (error) {
                console.log(error)
                res.json({ success: false })
            }
        })
module.exports = router;