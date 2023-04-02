const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('groups')
        // const reviews = await collection.find(criteria).toArray()
        var reviews = await collection.aggregate([
            {
                $match: criteria
            },
            {
                $lookup:
                {
                    localField: 'byUserId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'byUser'
                }
            },
            {
                $unwind: '$byUser'
            },
            {
                $lookup:
                {
                    localField: 'aboutUserId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'aboutUser'
                }
            },
            {
                $unwind: '$aboutUser'
            }
        ]).toArray()
        reviews = reviews.map(review => {
            review.byUser = { _id: review.byUser._id, fullname: review.byUser.fullname }
            review.aboutUser = { _id: review.aboutUser._id, fullname: review.aboutUser.fullname }
            delete review.byUserId
            delete review.aboutUserId
            return review
        })

        return reviews
    } catch (err) {
        logger.error('cannot find reviews', err)
        throw err
    }

}

async function remove(reviewId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { loggedinUser } = store
        const collection = await dbService.getCollection('review')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(reviewId) }
        if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
        const { deletedCount } = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
}


async function add(group) {
    try {
        const groupToAdd = {
            title: group.title,
            description: group.description,
            members: group.members,
            privetGroup: group.privetGroup,
            privetMasege: group.privetMasege,
            admin: group.admin,
            removedMembers:group.removedMembers,
            founder: group.founder,
            createdat: group.createdat
        }
        const collection = await dbService.getCollection('groups')
        const newGroup = await collection.insertOne(groupToAdd)
        return newGroup.ops[0]._id
    } catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.byUserId) criteria.byUserId = filterBy.byUserId
    return criteria
}

async function getById(groupId) {
    try {
        const collection = await dbService.getCollection('groups')
        const group = await collection.findOne({ _id: ObjectId(groupId) })
        return group
    } catch (err) {
        logger.error(`while finding user by id: ${groupId}`, err)
        throw err
    }
}

async function update(group) {
    try {
        // peek only updatable properties
        const groupToSave = {
            _id: ObjectId(group._id), // needed for the returnd obj
            title: group.title,
            description: group.description,
            members: group.members,
            privetGroup: group.privetGroup,
            privetMasege: group.privetMasege,
            admin: group.admin,
            removedMembers: group.removedMembers,
            founder: group.founder,
        }

        const collection = await dbService.getCollection('groups')
        await collection.updateOne({ _id: groupToSave._id }, { $set: groupToSave })
        return groupToSave
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err)
        throw err
    }
}

module.exports = {
    query,
    remove,
    add,
    getById,
    update
}


