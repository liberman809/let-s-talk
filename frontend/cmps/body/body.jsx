import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { socketService} from "../../services/socket.service.js"
import { loadMessagesByTarget } from '../../store/message.actions'

import { GroupHeader } from '../groupHeader.jsx'
import { Chat } from '../chat/chat.jsx'
import { NewMsg } from '../chat/newMsg.jsx'
import { Setings } from '../setings/setings.jsx'


export function Body({ setSetingsOpen, setingsOpen, newmsg }) {
    const chat = useSelector((state) => state.groupModule.group)
    const loggedinUser = useSelector((state) => state.userModule.user)

    useEffect(() => {
        socketService.on(`group ${chat._id}`, (message) => {
            groupSetings()
            loadMessagesByTarget(chat._id)

            // socketService.off(`group ${chat._id}`)
        })
        groupSetings()
    }, [chat._id])

    const [imBlocked, setImBlocked] = useState(false)
    const [privateMessages, setPrivateMessages] = useState(false)
    const [privateGroup, setPrivateGroup] = useState(false)
    const [imAdmin, setImAdmin] = useState(true)
    
    function groupSetings() {
        if (chat.removedMembers.includes(loggedinUser._id)) {
            setImBlocked(true)
        } else if (chat.privetMasege) {
            setPrivateMessages(true)
        } else if (chat.admin.includes(loggedinUser._id)) {
            setImAdmin(true)
            console.log(imAdmin)
        }
    }

    function onSubmit(ev) {
        ev.preventDefault()
        const msg = ev.target.msg.value
        ev.target.msg.value = ''

        const message = {
            msg,
            from: loggedinUser._id,
            to: chat._id,
            createdat: Date.now()
        }

        newmsg(message)
        loadMessagesByTarget(chat._id)
    }


    return <section className="body">
        <GroupHeader setSetingsOpen={setSetingsOpen} setingsOpen={setingsOpen} />
        <Chat setingsOpen={setingsOpen} setSetingsOpen={setSetingsOpen} newmsg={newmsg} chat={chat} />
        {(!imBlocked && !privateMessages) && <NewMsg onSubmit={onSubmit} setSetingsOpen={setSetingsOpen} setingsOpen={setingsOpen} />}
        {(privateMessages && imAdmin) && <NewMsg onSubmit={onSubmit} setSetingsOpen={setSetingsOpen} setingsOpen={setingsOpen} />}
        {setingsOpen && <Setings loggedinUser={loggedinUser} chat={chat} setSetingsOpen={setSetingsOpen} />}

        {/* {imBlocked && 'you are blocked'} */}
    </section>
}