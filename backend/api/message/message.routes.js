const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getMessage, getMessageById, addMessage, updateMessage, removeMessage, addMessageMsg} = require('./message.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getMessage)
router.get('/:id', getMessageById)
router.post('/', requireAuth, addMessage)
router.put('/:id', requireAuth, updateMessage)
router.delete('/:id', requireAuth, removeMessage)
// router.delete('/:id', requireAuth, requireAdmin, removeCar)



module.exports = router