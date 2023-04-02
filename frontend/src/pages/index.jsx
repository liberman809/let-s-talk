import { useSelector } from 'react-redux'
import { addMessage } from '../store/message.actions'



import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { messageService } from '../services/message.service'

import { Modal } from '../cmps/modals/modal.jsx'
import { Main } from '../cmps/main.jsx'
import { Home} from '../cmps/home.jsx'

export function Index() {

    const loggedinUser = useSelector((state) => state.userModule.user)


    function newmsg(msg) {
        addMessage(msg)
    }

    return <section className='index'>
        {!loggedinUser && <Home />}
        {loggedinUser && <Main newmsg={newmsg} />}

    </section>
}