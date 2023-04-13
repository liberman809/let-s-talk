import { useEffect, useState } from 'react'
import { loadUserGroups, loadGroup, updateGroup } from '../../store/groups.actions'


export function GroupSetings({ chat }) {

    const [privateMessages, setPrivateMessages] = useState(false)
    const [privateGroup, setPrivateGroup] = useState(false)

    useEffect(() => {
        groupSetings()
    }, [])

    function groupSetings() {
        setPrivateMessages(chat.privetMasege)
        setPrivateGroup(chat.privetGroup)
        console.log(privateGroup)
    }



    function onGroupType() {
        setPrivateGroup(!privateGroup)
        chat.privetGroup = !privateGroup
        updateGroup(chat)

    }

    function onMasegeType() {
        setPrivateMessages(!privateMessages)
        chat.privetMasege = !privateMessages
        updateGroup(chat)
    }

    return <section className="groupSetings">
        <div className="groupType">
            {privateGroup && <div className='groupSetingsBtn' onClick={() => onGroupType()}>made group ppublick</div>}
            {!privateGroup && <div className='groupSetingsBtn' onClick={() => onGroupType()}>made group privet</div>}
            {privateGroup && <div className='privetGroupexplain' >In a private group only an admin can add a new person</div>}
            {!privateGroup && <div className='privetGroupexplain' >In a public group anyone can invite a new person </div>}
        </div>
        <div className='masegeType'>
            {privateMessages && <div className='groupSetingsBtn' onClick={() => onMasegeType()}>make maseges publick</div>}
            {!privateMessages && <div className='groupSetingsBtn' onClick={() => onMasegeType()}>make maseges privet</div>}
        </div>
    </section>
}