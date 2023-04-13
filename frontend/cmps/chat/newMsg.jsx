import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadMessagesByTarget } from '../../store/message.actions'
import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EMIT_SEND_MSG } from "../../services/socket.service.js"


export function NewMsg({ onSubmit, setSetingsOpen, setingsOpen }) {

    return <section className={` ${setingsOpen && 'narrow'} newMsg`} onClick={() => setSetingsOpen(false)}>
        <form className='newMsgForm' onSubmit={(ev) => onSubmit(ev)}>
            <input type={"txt"} className="msg" name="msg" placeholder="text"></input>
        </form>
    </section>
}