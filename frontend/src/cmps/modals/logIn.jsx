import { useEffect, useState } from 'react'

export function LogIn({signUpForm,setSignUpForm,onLogIn}) {

    function onChangeModal(){
        let stat = !signUpForm
        setSignUpForm(stat)
    }

    function onSubmit(ev){
        ev.preventDefault()
        const phoneNum = ev.target.phone.value
        const password = ev.target.password.value

        const user = {
            phoneNum,
            password
        }

        onLogIn(user)
    }

    return <section className="logInSignUp">

        <form className='a' onSubmit={(ev) => onSubmit(ev)}>
            <input type={'tel'} className='input' name="phone" placeholder="phone number" pattern="[0-9]{3}-[0-9]{7}"></input>
            <input type={'password'} className='input' name="password" placeholder="password"></input>
            <input type="submit" value="Submit" />
        </form>
        <div className="signUpInv">
            or <span className="singBtn" onClick={() => onChangeModal()}>signUp</span>
        </div>

    </section>
}