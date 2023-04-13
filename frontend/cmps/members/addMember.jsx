import { loadUser, updateUser } from '../../store/user.actions'
import { loadUserGroups, loadGroup, updateGroup, updateMembers } from '../../store/groups.actions'
import { socketService } from "../../services/socket.service.js"
import { useEffect, useState } from 'react'


export function AddMember({ chat }) {


    async function onSubmit(ev) {
        ev.preventDefault()
        let memberNum = ev.target.memberNum.value
        const data = {
            by: 'num',
            memberNum
        }
        const member = await loadUser(data)
        ev.target.memberNum.value = ""
        try {
            if (chat.removedMembers.includes(member._id)) {
                member.groups = member.groups.filter((group) => group !== chat._id)
                chat.removedMembers = chat.removedMembers.filter((removedMember) => removedMember !== member._id)
                chat.members.push(member._id)
                member.groups.push(chat._id)

                updateUser(member)
                updateMembers(chat)               
            }else if(!chat.removedMembers.includes(member._id)){
                member.groups.push(chat._id)
                chat.members.push(member._id)
                updateUser(member)
                updateMembers(chat) 
            }

            // socketService.emit('chat-new-member',member)
        } catch (err) {
            console.log('Cannot load user', err)
        }
    }



    return <section className="addMember">
        <form onSubmit={(ev) => onSubmit(ev)}>
            <input type={"txt"} className="memberNum" name="memberNum" placeholder="member phone number" ></input>
            <input type="submit" value="Add member" />
        </form>
    </section>
}