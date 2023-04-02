import { loadUser } from '../../store/user.actions'
import { useEffect, useState } from 'react'


export function Admin({ adminId }) {

    const [admin, setAdmin] = useState(null)
    console.log(adminId)
    useEffect(() => {
        adminById(adminId)
    }, [])

    async function adminById(memberId) {
        try {
            console.log('a')
            const data = {
                by: 'id',
                memberId
            }
            const admin = await loadUser(data)
            setAdmin(admin)
        } catch (err) {
            console.log('Cannot load user', err)
        }
    }


    return <section className="admin">
        {admin}
    </section>
}


