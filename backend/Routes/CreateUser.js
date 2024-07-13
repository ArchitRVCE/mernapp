import express from 'express'
const router = express.Router()
import { body, validationResult } from 'express-validator'

import jwt from 'jsonwebtoken'
const jwtSecret = "MyNameIsProdDeveloper#1"
import bcrypt from 'bcrypt'
import localStorageWithAuth from '../Middleware/TokenAuth.js'

import User from '../models/User.js'

router.post('/createuser', [
    body('email', 'Check your email brother!').isEmail(),
    body('password').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let securePassword = await bcrypt.hash(req.body.password, salt)
        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                location: req.body.location,
                password: securePassword
            }).then((user) => {
                const data = {
                    user: {
                        id: user.id
                    }
                }
                const authToken = jwt.sign(data, jwtSecret,{expiresIn:"1h"})
                success = true
                res.json({ success, authToken })
            }).catch(err => {
                console.log(err);
                res.json({ error: "Please enter a unique value." })
            })
        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })


router.post('/loginuser', [body('email', 'Check your email brother').isEmail()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email })
            if (!userData) {
                return res.status(400).json({ errors: 'Incorrect Email address' })
            }
            let pwdCheck = await bcrypt.compare(req.body.password, userData.password);
            if (!pwdCheck) {
                //if(userData.password !== req.body.password ){
                return res.status(400).json({ errors: 'Incorrect Password' })
            }
            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret,{expiresIn:"1h"}); // can add expiry date
            return res.json({ success: true, authToken: authToken })
        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })

// Get logged in User details, Login Required.
router.post('/getuser', localStorageWithAuth, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password") // -password will not pick password from db.
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})
export default router;