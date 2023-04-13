

export function AddGroup({setMenu}){

    return <div className="addGroup" onClick={() => setMenu('newGroup')}>
        add new group
    </div>
}