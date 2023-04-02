import { useEffect, useState } from 'react'

export function SignUp({signUpForm,setSignUpForm,signUp}) {

    function onChangeModal(){
        let stat = !signUpForm
        setSignUpForm(stat)
    }

    function onSubmit(ev){
        ev.preventDefault()
        const phoneNum = ev.target.phone.value
        const password = ev.target.password.value
        const nickname = ev.target.nickname.value

        const newUser = {
            phoneNum,
            nickname,
            groups : [],
            password
        }

        signUp(newUser)
    }

    return <section className="logInSignUp">

        <form onSubmit={(ev) => onSubmit(ev)}>
            <input type="tel" id="phone" name="phone" placeholder="phone number" pattern="[0-9]{3}-[0-9]{7}"></input>
            <input type="txt" name="nickname" placeholder="nickname" />
            <input type="password" name="password" placeholder="password"></input>
            <input type="submit" value="Submit" />
        </form>
        <div className="signUpInv">
            or <span className="singBtn" onClick={() => onChangeModal()}>signIn</span>
        </div>

    </section>
}