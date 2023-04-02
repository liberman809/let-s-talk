import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadUser } from '../../store/user.actions'

export function Message({ message, setingsOpen }) {

    const loggedinUser = useSelector((state) => state.userModule.user)

    const [user, setUser] = useState([])

    var ts = new Date(message.createdat)
    useEffect(() => {
        userId(message.from)
    }, [])

    async function userId(memberId) {
        try {
            const data = {
                by: 'id',
                memberId
            }
            const user = await loadUser(data)
            setUser(user)
        } catch (err) {
            console.log('Cannot load user', err)
        }
    }

    return <section className={`message ${message.from === loggedinUser._id && 'my'} ${setingsOpen && 'narrow'}`}>
        <div className='msgFrom'>{user.nickname}</div>
        <div className='msgBody'>
            <div className='msg'>{message.msg}</div>
            <div className='msgTime'>{ts.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
    </section>
}