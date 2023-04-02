const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const collection = await dbService.getCollection('messages')
        var messages = await collection.find(filterBy).toArray()
        return messages
    } catch (err) {
        logger.error('cannot find messages', err)
        throw err
    }
}

async function getById(messageId) {
    try {
        const collection = await dbService.getCollection('messages')
        const message = collection.findOne({ _id: ObjectId(messageId) })
        return message
    } catch (err) {
        logger.error(`while finding message ${messageId}`, err)
        throw err
    }
}

async function remove(messageId) {
    try {
        const collection = await dbService.getCollection('messages')
        await collection.deleteOne({ _id: ObjectId(messageId) })
        return messageId
    } catch (err) {
        logger.error(`cannot remove message ${messageId}`, err)
        throw err
    }
}

async function add(message) {
    try {
        const collection = await dbService.getCollection('messages')
        await collection.insertOne(message)
        return message
    } catch (err) {
        logger.error('cannot insert message', err)
        throw err
    }
}

async function update(message) {
    try {
        const messageToSave = {
            vendor: message.vendor,
            price: message.price
        }
        const collection = await dbService.getCollection('messages')
        await collection.updateOne({ _id: ObjectId(message._id) }, { $set: messageToSave })
        return message
    } catch (err) {
        logger.error(`cannot update message ${carId}`, err)
        throw err
    }
}


module.exports = {
    remove,
    query,
    getById,
    add,
    update
}
