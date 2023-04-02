import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { socketService, SOCKET_EVENT_REVIEW_ADDED } from "../../services/socket.service.js"
import { loadUserGroups, loadGroup } from '../../store/groups.actions'
import { setGroups, loadUser } from '../../store/user.actions'
import { AddGroup } from './addGroup.jsx'
import { Group } from './group.jsx'
import { Groups } from './groups.jsx'
import { userService } from '../../services/user.service.js'
import { UserSetings } from './userSetings.jsx'
import {NewGroup} from './newGroup.jsx'

export function Menu({ setNewGroupModal, newGroupModal, setChat, chatDetails, addNewGroup }) {

    const [menu, setMenu] = useState()
    const groups = useSelector((state) => state.userModule.groups)
    const loggedinUser = useSelector((state) => state.userModule.user)

    useEffect(() => {
        socketService.on(`chat-${loggedinUser._id}`, (member) => {
            userService.saveLocalUser(loggedinUser)
            loadGroups(loggedinUser._id)
        })
        loadGroups(loggedinUser._id)
    }, [])

    useEffect(() => {
        setMenu('groups')
    }, [groups])


    async function loadGroups(userId) {
        try {
            const data = {
                by: 'id',
                memberId: userId
            }
            const user = await loadUser(data)
            setGroups(user)
        } catch (err) {
            console.log('Cannot load user', err)
        }

    }

    function onSetNewGroupModal() {
        setNewGroupModal(!newGroupModal)
    }
    return <section className="menu">
        <div className='groupsHeader'>
            <div className='userActions'>
                <div className='button' onClick={() =>setMenu('user')}>{loggedinUser.nickname}</div>
                {menu === 'groups' && <AddGroup setMenu={setMenu} />}
                {menu !== 'groups' && <div className='back' onClick={() => setMenu('groups')}>x</div>}
            </div>
        </div>
        
        {(menu === 'groups' && groups) && <Groups groups={groups} onSetNewGroupModal={onSetNewGroupModal} setChat={setChat} chatDetails={chatDetails} setMenu={setMenu} />}
        {(menu === 'user' && loggedinUser) && <UserSetings setMenu={setMenu} />}
        {(menu === 'newGroup') && <NewGroup addGroup={addNewGroup} setMenu={setMenu} />}

    </section>

}