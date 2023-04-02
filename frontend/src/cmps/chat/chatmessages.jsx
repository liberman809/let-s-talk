import { useSelector } from 'react-redux'
import { Message} from './message.jsx'


export function Chatmessages({ messages, setSetingsOpen }) {
    const loggedinUser = useSelector((state) => state.userModule.user)
    const chat = useSelector((state) => state.groupModule.group)

    if(chat != ''){

        return <section className='messages' onClick={() => setSetingsOpen(false)}>
        {
            messages.map((message) => {

                return <Message key={message._id} message={message}/>
            })
        }

        {/* {!chat.members.includes(loggedinUser._id) && 'אינך חבר בקבוצה זו'} */}


    </section>
    }

    
}