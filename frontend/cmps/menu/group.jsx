import { loadUserGroups, loadGroup } from '../../store/groups.actions'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadGroupMessages } from '../../store/message.actions'
import { socketService, SOCKET_EVENT_REVIEW_ADDED } from "../../services/socket.service.js"


export function Group({ groupId }) {

    (() => {
        socketService.on(SOCKET_EVENT_REVIEW_ADDED, (message) => {
            console.log('GOT from socket at group', message)
            groupLastMessage(groupId)

        })
    })()


    const messages = useSelector((state) => state.messageModule.messages)


    const [groupMessage, setGroupMessage] = useState('')
    // const chat = useSelector((state) => state.groupModule.group)
    const [chat, setChat] = useState(null)

    useEffect(() => {
        setGroup(groupId)
        groupLastMessage(groupId)
    }, [])

    useEffect(() => {
        groupLastMessage(groupId)
    }, [messages])

    async function setGroup(groupId) {
        try {
            const group = await loadGroup(groupId)
            setChat(group)
        } catch (err) {
            console.log('ReviewActions: err in addReview', err)
            throw err
        }
    }

    async function groupLastMessage(groupId) {
        try {
            let lastMessage = ''
            const group = await loadGroupMessages(groupId)
            if (group.length > 0) {
                lastMessage = group.slice(-1)[0].msg
            } else {
                lastMessage = 'not have a messages'
            }
            setGroupMessage(lastMessage)
        } catch (err) {
            console.log('ReviewActions: err in addReview', err)
            throw err
        }
    }

    if (chat) {
        return <section className="group" onClick={() => setGroup(chat._id)}>
            <div className='groupTitle'>{chat.title}</div>
            <div className='groupMessage'>{groupMessage}</div>
        </section>
    }

}