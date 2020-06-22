const Users = require('../models/user-model')
const JWT = require('../helpers/jwt-helpers')
const saltRounds = 10;
const bcrypt = require('bcrypt')

class userController {
    async signUpUser(req, resp, next) {
        console.log(req.body)
        const { email, firstName, lastName, password } = req.body
        try {
            const user = await Users.findOne({ email: email })
            if (user) {
                return resp.status(409).json({
                    success: false,
                    message: 'User already exists',
                })
            } else {
                let user = new Users({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: bcrypt.hashSync(password, saltRounds)
                })
                try {
                    const savedUser = await user.save()
                    if (savedUser) {
                        return resp.status(200).json({
                            success: true,
                            message: 'User registered Successfully. Please Login to continue',
                            data: savedUser.id
                        })
                    }
                }
                catch (err) {
                    console.log(err)
                    return resp.status(403).json({
                        success: false,
                        message: 'Something went wrong'
                    })
                }
            }
        }
        catch (err) {
            console.log(err)
            return resp.status(403).json({
                success: false,
                message: 'Something went wrong'
            })
        }
    }

    async loginUser(req, res, next) {
        const {email , password} =req.body
        try {
            const user = await Users.findOne({ email: email })
            console.log(user)

            if (!user) {
                return res.status(404).json({
                    'success': false,
                    'message': "User not found"
                })
            } else {
                if (bcrypt.compareSync(password, user.password)) {
                    const token = JWT.sign({ email: email })
                    console.log(token,"in login")
                    return res.status(200).json({
                        'success': true,
                        'token': token,
                        'data': {
                            id: user._id,
                            name: user.name,
                            email: user.email
                        },
                        'message': 'user logged In successfully'
                    })

                } else {
                    return res.status(401).json({
                        'success': false,
                        'message': 'incorrect password'
                    })
                }
            }
        }
        catch (err) {
            return res.status(403).json({
                success: false,
                message: 'Something went wrong'
            })
        }
    }
}

module.exports = userController