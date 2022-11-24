const User = require('../models').User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async(req, res) => {
    const { email, password } = req.body

    try {
        //find the user
        const user = await User.findOne({
            where: {
                email
            }
        })

        //check if user found
        if (!user){
            return res.status(404).json({ message: 'User not found!' })
        }
        //check if password matches
        if(!bcrypt.compareSync(password, user.password)){
            return res.status(401).json({ message: 'Incorrect password!'})
        }
        //generate auth token
        const userWithToken = generateToken(user.get({ raw: true }));
        return res.send(userWithToken)
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}

exports.register = async(req,res)=>{

}

const generateToken = (user) => {
    delete user.password

    const token = jwt.sign(user, 'secret', { expiresIn: 86400 })
    return { ...user, ...{ token }} 
}