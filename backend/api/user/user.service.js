
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const reviewService = require('../group/group.service')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt')

module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('user')
        var users = await collection.find(criteria).toArray()
        users = users.map(user => {
            delete user.password
            user.createdAt = ObjectId(user._id).getTimestamp()
            // Returning fake fresh data
            // user.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
            return user
        })
        return users
    } catch (err) {
        logger.error('cannot find users', err)
        throw err
    }
}


async function getById(data) {
    try {
        let user
        const collection = await dbService.getCollection('users')
        if (data.by === 'id') {
            user = await collection.findOne({ _id: ObjectId(data.memberId) })
        } else if (data.by === 'num') {
            user = await collection.findOne({ phoneNum: data.memberNum })
        }
        delete user.password

        // user.givenReviews = await reviewService.query({ byUserId: ObjectId(user._id) })
        // user.givenReviews = user.givenReviews.map(review => {
        //     delete review.byUser
        //     return review
        // })

        return user
    } catch (err) {
        logger.error(`while finding user by id: ${userId}`, err)
        throw err
    }
}
async function getByUsername(phoneNum) {
    try {
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ phoneNum })
        return user
    } catch (err) {
        logger.error(`while finding user by phoneNum: ${phoneNum}`, err)
        throw err
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.deleteOne({ _id: ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err)
        throw err
    }
}

async function update(user) {
    try {
        // peek only updatable properties   
        let userToSave
        if (user.password) {
            const saltRounds = 10
            const hash = await bcrypt.hash(user.password, saltRounds)
             userToSave = {
                _id: ObjectId(user._id), // needed for the returnd obj
                phoneNum: user.phoneNum,
                nickname: user.nickname,
                groups: user.groups,
                password: hash
            }
        } else {
             userToSave = {
                _id: ObjectId(user._id), // needed for the returnd obj
                phoneNum: user.phoneNum,
                nickname: user.nickname,
                groups: user.groups,
            }
        }

        const collection = await dbService.getCollection('users')
        await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
        return userToSave
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err)
        throw err
    }
}

async function add(user) {
    try {

        console.log('bbbbbbbbbbbbbbbbbbbbbbb')
        // peek only updatable fields!
        const userToAdd = {
            phoneNum: user.phoneNum,
            nickname: user.nickname,
            groups: user.groups,
            password: user.password,
        }
        const collection = await dbService.getCollection('users')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        console.log('not add')
        logger.error('cannot add user', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                username: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.score = { $gte: filterBy.minBalance }
    }
    return criteria
}




