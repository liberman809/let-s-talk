import { useSelector } from 'react-redux'


export function GroupHeader({setSetingsOpen, setingsOpen}) {
    const chat = useSelector((state) => state.groupModule.group)

    return <section className={`${setingsOpen && 'narrow'} groupHeader`} onClick={() => setSetingsOpen(!setingsOpen)}>
        <div className='group-title' >{chat.title}</div>
    </section>
}