import { Admin } from './admin.jsx'
import { useSelector } from 'react-redux'

export function Admins() {

    const admins = useSelector((state) => state.groupModule.groupAdmins)


    return <section className='admins'>
        {
            admins.map((admin) =>{
                return admin.nicName
            })
        }
    </section>
}