import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'

export function AppHeader({ setModal, modal }) {

    const loggedinUser = useSelector((state) => state.userModule.user)

    function onLogInSignUp() {
        setModal('b')
    }

    return <section className='header'>

        <div className='leftHeader'>
            <div className='brend'>aviv</div>
            {/* <div className='logInSignUp'>
                <div className='logIn' onClick={() => onLogInSignUp()}>logIn/signUp</div>
            </div> */}
        </div>

        {modal}

        <div className='rightHeader'>
            {loggedinUser&&<div className='lognInUser'>{loggedinUser.nickname}</div>}
            <div className='language'>language</div>
        </div>
    </section>
}