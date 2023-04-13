import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Menu } from './menu/menu.jsx'
import { NewGroup } from './menu/newGroup.jsx'
import { loadUserGroups, loadGroup, addGroup } from '../store/groups.actions.js'
import { signup, updateUser, setGroups, loadUser } from '../store/user.actions'
import { userService } from '../services/user.service.js'
import { Body } from './body/body.jsx'



export function Main({ newmsg }) {
    const loggedinUser = useSelector((state) => state.userModule.user)
    const chat = useSelector((state) => state.groupModule.group)
    
    const [newGroupModal, setNewGroupModal] = useState(false)
    const [setingsOpen, setSetingsOpen] = useState(false)

    useEffect(() => {
        setSetingsOpen(false)
    }, [chat])

    async function addNewGroup(group) {
        try {
            const newGroup = await addGroup(group)
            const data = {
                by: 'id',
                memberId: loggedinUser._id
            }
            const member = await loadUser(data)
            member.groups.push(newGroup)
            updateUser(member)
            userService.saveLocalUser(member)
        } catch (err) {
            console.log('ReviewActions: err in addReview', err)
            throw err
        }
    }

    return <section className="main">
        <Menu setNewGroupModal={setNewGroupModal} newGroupModal={newGroupModal} loggedinUser={loggedinUser} addNewGroup={addNewGroup} />
        {chat && <Body setSetingsOpen={setSetingsOpen} setingsOpen={setingsOpen} newmsg={newmsg}  />}
    </section>

}