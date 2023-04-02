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
        <div className='homeTitle'>Let's talke</div>
        <div className='homeContant'>
            Free chat groups for everyone
            <div className='madeBy'>made by Aviv Liberman</div>
        </div>

        {(!signUpForm && !loggedinUser) && <LogIn signUpForm={signUpForm} setSignUpForm={setSignUpForm} onLogIn={onLogIn} />}
        {(signUpForm && !loggedinUser) && <SignUp signUpForm={signUpForm} setSignUpForm={setSignUpForm} signUp={signUp} />}
    </section>
}