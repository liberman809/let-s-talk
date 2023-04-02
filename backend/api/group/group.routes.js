const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { addGroup, getgroup, deleteReview, updateGroup } = require('./group.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/:id', log, getgroup)
router.post('/', log, requireAuth, addGroup)
router.put('/update', log, updateGroup)
router.delete('/:id', requireAuth, deleteReview)

module.exports = router