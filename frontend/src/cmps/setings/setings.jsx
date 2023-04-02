import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Admins } from './admins.jsx'
import { loadUserGroups, loadGroup, updateGroup } from '../../store/groups.actions'
import { updateUser, saveLocalUser, loadUser } from '../../store/user.actions'
import { GroupSetings } from './groupSetings.jsx'
import { Members } from '../members/members.jsx'


export function Setings({setSetingsOpen}) {


    const chat = useSelector((state) => state.groupModule.group)
    const loggedinUser = useSelector((state) => state.userModule.user)


    useEffect(() => {
        amIAdmin()
    }, [])

    const [imAdmin, setImAdmin] = useState(false)

    function amIAdmin() {
        if (chat.admin.includes(loggedinUser._id)) {
            setImAdmin(true)
        }
    }

    async function leaveGroup() {
        const data = {
            by: 'id',
            memberId: loggedinUser._id
        }
        const member = await loadUser(data)
        chat.members = chat.members.filter((member) => member !== loggedinUser._id)
        member.groups = member.groups.filter((group) => group !== chat._id)
        updateGroup(chat)
        updateUser(member)
        console.log('loggedinUser.groups', loggedinUser.groups)

    }



    return <section className="setings">

        <div className="setings-header">
            <div className="setings-title">{chat.title}</div>
            {/* <Admins /> */}
            <div className='back' onClick={() => setSetingsOpen(false)}>x</div>
            
        </div>


        {imAdmin && <GroupSetings chat={chat} />}


        <div className='groupsActions'>
            <div className='leaveGroup' onClick={() => leaveGroup()}>leave group</div>
        </div>
        

        <Members imAdmin={imAdmin} chat={chat} />
        


    </section>
} 