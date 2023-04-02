import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadUser, updateUser } from '../../store/user.actions'


export function UserSetings({ setMenu }) {
    const loggedinUser = useSelector((state) => state.userModule.user)
    
    
    async function onSubmit(ev) {
        ev.preventDefault()
        
        let nickname = ev.target.nickname.value
        // let status = ev.target.status.value
        const password = ev.target.password.value

        if(!nickname){
            nickname = loggedinUser.nickname
        }

        // if(!status){
        //     nickname = loggedinUser.status
        // }

        loggedinUser.nickname = nickname
        // loggedinUser.status = status
        loggedinUser.password = password

        updateUser(loggedinUser)
    }

    return <section className="userSetings">
        

        <div className='mainUserSetings'>
            <form className='setingsForm' onSubmit={(ev) => onSubmit(ev)}>
                <input type="txt" name="nickname" placeholder="new nickname" />
                <input type="txt" name="status" placeholder="new status" />
                <input type="password" name="password" placeholder="new password"></input>

                <input type="submit" value="Submit" />
            </form>
        </div>

    </section>
}
