import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'


export const groupService = {
  add,
  query,
  remove,
  getById,
  update
}

function query(filterBy) {
  var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  return httpService.get(`group${queryStr}`)
}

async function remove(reviewId) {
  // await httpService.delete(`review/${reviewId}`)
  await storageService.remove('review', reviewId)
}

async function add(group) {
  const addedReview = await httpService.post(`group`, group)
  
  return addedReview
}

async function getById(groupId) {
  const group = await httpService.get(`group/${groupId}`,groupId)
  return group
}

async function update(data) {
  const group = await httpService.put(`group/update`,data)
  return group
}

