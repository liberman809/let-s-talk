import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { socketService} from "../../services/socket.service.js"

import { loadMessagesByTarget } from '../../store/message.actions'
import { Chatmessages } from './chatmessages.jsx'
import { NewMsg } from './newMsg.jsx'
import { Message } from '../chat/message.jsx'
import { loadGroupMessages } from '../../store/message.actions'



export function Chat({ setingsOpen, setSetingsOpen, newmsg }) {

    const chat = useSelector((state) => state.groupModule.group)
    const loggedinUser = useSelector((state) => state.userModule.user)
    const messages = useSelector((state) => state.messageModule.messages)

    const [groupMessage, setGroupMessage] = useState('')

   
    useEffect(() => {
        socketService.on(`group ${chat._id}`, (message) => {
            loadMessagesByTarget(chat._id)
            groupLastMessage(chat._id)
            // socketService.off(`group ${chat._id}`)
        })

        loadMessagesByTarget(chat._id)
    }, [chat._id])

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

    console.log('messages', messages)
    return <section className={` ${setingsOpen && 'narrow'} messages`} onClick={() => setSetingsOpen(false)}>
        {
            messages.map((message) => {
                console.log(message)
                return <Message key={message._id} message={message} setingsOpen={setingsOpen} />
            })
        }





        {/* {!chat.members.includes(loggedinUser._id) && 'אינך חבר בקבוצה זו'} */}


    </section>
}