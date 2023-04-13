import { useSelector } from 'react-redux'
import { updateUser } from '../../store/user.actions'
import { setGroups} from '../../store/user.actions'


export function NewGroup({ addGroup, setMenu }) {

    const loggedinUser = useSelector((state) => state.userModule.user)


    function onSubmit(ev) {
        ev.preventDefault()
        const title = ev.target.title.value
        const description = ev.target.description.value
        let privetGroup = ev.target.groupType.value
        let privetMasege = ev.target.masegeType.value

        if (privetGroup === 'publick') {
            privetGroup = false
        } else {
            privetGroup = false
        }

        if (privetMasege === 'publick') {
            privetMasege = false
        } else {
            privetMasege = false
        }

        const newGroup = {
            title,
            description,
            members: [loggedinUser._id],
            privetGroup,
            privetMasege,
            admin: [loggedinUser._id],
            removedMembers: [],
            founder: loggedinUser._id,
            createdat: Date.now()
        }

        addGroup(newGroup)
        setGroups(loggedinUser)
    }

    return <section className="newGroup">
        <form className='newGroupForm' onSubmit={(ev) => onSubmit(ev)}>
            <input type={"txt"} className="input" name="title" placeholder="group title"></input>
            <textarea className="input" placeholder="group description" name="description"></textarea>
            <div className="input">group Type</div>
            <select name="groupType" className="input">
                <option value="publick">publick</option>
                <option value="privet">privet</option>
            </select>
            <div className="input">masege Type</div>
            <select name="masegeType" className="input">
                <option value="publick">publick</option>
                <option value="privet">privet</option>
            </select>
            <input type="submit" value="Submit" />
        </form>
    </section>
}