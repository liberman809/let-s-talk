const Cryptr = require('cryptr')
const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

module.exports = {
    signup,
    login,
    getLoginToken,
    validateToken
}

async function login(phoneNum, password) {
    logger.debug(`auth.service - login with username: ${phoneNum}`)

    const user = await userService.getByUsername(phoneNum)
    if (!user) return Promise.reject('Invalid phoneNum')
    // TODO: un-comment for real login
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid password')

    delete user.password
    user._id = user._id.toString()
    return user
}


async function signup({ phoneNum, nickname, groups, password }) {
    const saltRounds = 10

    console.log('work')
    logger.debug(`auth.service - signup with phoneNum: ${phoneNum}`)
    if (!phoneNum  || !nickname || !groups || !password) return Promise.reject('Missing required signup information')

    const userExist = await userService.getByUsername(phoneNum)
    if (userExist) return Promise.reject('Username already taken')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ phoneNum, nickname, groups, password: hash })
}


function getLoginToken(user) {
    const userInfo = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin }
    return cryptr.encrypt(JSON.stringify(userInfo))
}

function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser
    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}




// ;(async ()=>{
//     await signup('bubu', '123', 'Bubu Bi')
//     await signup('mumu', '123', 'Mumu Maha')
// })()