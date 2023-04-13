import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AddGroup } from './addGroup.jsx'
import { Group } from './group.jsx'
import { UserSetings } from './userSetings.jsx'

export function Groups({ setChat, chatDetails, groups}) {

    const loggedinUser = useSelector((state) => state.userModule.user)



    return <section className="groups">
        
        <div className='groupsList'>
            {(!groups || groups.length === 0) && 'No active calls'}

            {
                groups.map((group) => {

                    return <Group key={group} groupId={group} setChat={setChat} chatDetails={chatDetails} />

                })
            }
        </div>
    </section>
}