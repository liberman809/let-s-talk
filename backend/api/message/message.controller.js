const messageService = require('./message.service.js')
const socketService = require('../../services/socket.service')

const logger = require('../../services/logger.service')

async function getMessage(req, res) {
  try {
    const filterBy = {
      to: req.query
    }
    const messages = await messageService.query(req.query)
    res.json(messages)
  } catch (err) {
    logger.error('Failed to get messages', err)
    res.status(500).send({ err: 'Failed to get messages' })
  }
}

async function getMessageById(req, res) {
  try {
    const messageId = req.params.id
    const message = await messageService.getById(messageId)
    res.json(message)
  } catch (err) {
    logger.error('Failed to get message', err)
    res.status(500).send({ err: 'Failed to get message' })
  }
}

async function addMessage(req, res) {

  try {
    const message = req.body
    const addedMessage = await messageService.add(message)
    socketService.broadcast({ type: `group ${message.to}`, data: message, userId: message.from })

    res.json(addedMessage)
  } catch (err) {
    logger.error('Failed to add message', err)
    res.status(500).send({ err: 'Failed to add message' })
  }
}


async function updateMessage(req, res) {
  try {
    const message = req.body
    const updatedMessage = await messageService.update(message)
    res.json(updatedMessage)
  } catch (err) {
    logger.error('Failed to update message', err)
    res.status(500).send({ err: 'Failed to update message' })

  }
}

async function removeMessage(req, res) {
  try {
    const messageId = req.params.id
    const removedId = await messageService.remove(messageId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove car', err)
    res.status(500).send({ err: 'Failed to remove car' })
  }
}


module.exports = {
  getMessage,
  getMessageById,
  addMessage,
  updateMessage,
  removeMessage
}
