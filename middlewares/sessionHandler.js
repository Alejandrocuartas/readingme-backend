const jwt = require('jsonwebtoken')
const { request, response } = require('express')

const sessionHandler = (service = '') => {
    return (req = request, res = response, next) => {
        const token = req.cookies.userToken
        if(!token){
            return res.status(401).json({
                msg: 'User is not logged'
            })
        }
        try {
            const { id } = jwt.verify(token, process.env.JWT_KEY)
            req.writterId = id
            if(service === postsDelete){
                if(id !== req.params.id){
                    return res.status(401).json({
                        msg: 'You cannot delete this user.',
                    })
                }
            }
            next()
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                msg: 'Unvalid user token',
                error: error.message
            })
        }
    
    }
}

module.exports = sessionHandler