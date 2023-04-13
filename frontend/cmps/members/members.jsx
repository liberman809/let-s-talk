import { Member } from './member.jsx'
import { AddMember } from './addMember.jsx'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'


export function Members({ imAdmin }) {

    const members = useSelector((state) => state.groupModule.members)

    
    const chat = useSelector((state) => state.groupModule.group)

    return <section className="members">

        {chat.privetGroup && <AddMember chat={chat} />}
        {(!chat.privetGroup && imAdmin) && <AddMember chat={chat} />}

        <div className="membersTitle">Group members</div>
        <div className='membersList'>
            {
                members.map((member) => {
                    return <Member key={member} memberId={member} imAdmin={imAdmin} chat={chat} />
                })
            }
        </div>

    </section>
}