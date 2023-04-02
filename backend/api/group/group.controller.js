const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const authService = require('../auth/auth.service')
const socketService = require('../../services/socket.service')
const groupService = require('./group.service')

async function getgroup(req, res) {
    try {
        const group = await groupService.getById(req.query[0])
        res.send(group)
    } catch (err) {
        logger.error('Cannot get reviews', err)
        res.status(500).send({ err: 'Failed to get reviews' })
    }
}

async function deleteReview(req, res) {
    try {
        const deletedCount = await reviewService.remove(req.params.id)
        if (deletedCount === 1) {
            res.send({ msg: 'Deleted successfully' })
        } else {
            res.status(400).send({ err: 'Cannot remove review' })
        }
    } catch (err) {
        logger.error('Failed to delete review', err)
        res.status(500).send({ err: 'Failed to delete review' })
    }
}

async function addGroup(req, res) {
    
    try {
        var newGroup = req.body
        group = await groupService.add(newGroup)
        res.send(group)
    } catch (err) {
        logger.error('Failed to add review', err)
        res.status(500).send({ err: 'Failed to add review' })
    }
}

async function updateGroup(req, res) {
    
    try {
        const group = req.body
        const savedGroup = await groupService.update(group)
        res.send(savedGroup)
    } catch (err) {
        logger.error('Failed to update user', err)
        res.status(500).send({ err: 'Failed to update user' })
    }
}

module.exports = {
    getgroup,
    deleteReview,
    addGroup,
    updateGroup
}