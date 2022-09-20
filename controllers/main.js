const JWT = require('jsonwebtoken')
const {BadRequestError} = require('../errors')

const login = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        throw new BadRequestError('Please provide an email and a password')
    }
    const id = new Date().getDate()
    const token = JWT.sign({id, email}, process.env.JWT_SECRET, {expiresIn: '30d'})
    res.status(200).json({msg:'user created', token})
}

const dashboard = async (req, res) => {
    const user = req.user
    res.status(200).json({
        msg: `Hello, ${user.email}`, 
        secret: `Here is your authorized data : ${JSON.stringify(user)}`
    })
}

module.exports = {
    login,
    dashboard
}