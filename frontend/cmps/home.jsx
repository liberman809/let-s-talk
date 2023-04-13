import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { LogIn } from './modals/logIn.jsx'
import { SignUp } from './modals/signUp.jsx'
import { signup, updateUser, login } from '../store/user.actions'
import { addMessage } from '../store/message.actions'

export function Home() {

    const loggedinUser = useSelector((state) => state.userModule.user)

    const [signUpForm, setSignUpForm] = useState(false)

    function signUp(newUser) {
        signup(newUser)
    }

    function onLogIn(user) {
        login(user)
    }





    return <section className='home'>

        {(!signUpForm && !loggedinUser) && <LogIn signUpForm={signUpForm} setSignUpForm={setSignUpForm} onLogIn={onLogIn} />}
        {(signUpForm && !loggedinUser) && <SignUp signUpForm={signUpForm} setSignUpForm={setSignUpForm} signUp={signUp} />}

        <div className='homeContant'>
            <div className='mainContant'>
                <div className='contant'>Let's talk</div>
                <div className='contant'>Free chat groups for everyone</div>
            </div>
            <div className='madeBy'>made by Aviv Liberman</div>
        </div>


    </section>
}