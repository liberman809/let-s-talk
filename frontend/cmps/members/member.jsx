import { useEffect, useState } from 'react'
import { loadUser } from '../../store/user.actions'
import { loadUserGroups, loadGroup, updateGroup, updateMembers, updateAdmins } from '../../store/groups.actions'


export function Member({ memberId, imAdmin, chat }) {


    const [member, setMember] = useState(null)

    useEffect(() => {
        memberById(memberId)
    }, [])


    async function removeFromGroup(memberId) {
        try {
            chat.members = chat.members.filter((member) => member !== memberId)
            chat.removedMembers.push(memberId)

            // updateGroup(chat)
            updateMembers(chat)

        } catch (err) {
            console.log('Cannot load user', err)
        }
    }

    async function addGroupAdmin(memberId) {
        try {
            chat.admin.push(memberId)
            updateAdmins(chat)
        } catch (err) {
            console.log('Cannot load user', err)
        }
    }

    async function memberById(memberId) {
        try {
            const data = {
                by: 'id',
                memberId
            }
            const member = await loadUser(data)
            setMember(member)
        } catch (err) {
            console.log('Cannot load user', err)
        }
    }
    if (member) {
        if (imAdmin) {
            return <div className="member">
                <div className="memberName">{member.nickname}</div>
                <div className="memberAction">
                    <div className="memberBtn" onClick={() => removeFromGroup(member._id)}>remove</div>
                    <div className="memberBtn" onClick={() => addGroupAdmin(member._id)}>Become a admin</div>
                </div>
            </div>
        } else {
            return <div className="member flex-center">
                <div className="memberName">{member.nickname}</div>
            </div>
        }

    }

}