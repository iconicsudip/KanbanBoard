import React from 'react'
import AddButton from './AddButton'

export default function SideBar({newTask,openIssueModal}) {
    // ()=>newTask("toDo")
    return (
        <div className='fixed top-0 left-0 h-[100%] p-2 bg-[ghostwhite] z-10'>
            <div onClick={openIssueModal}>
                <AddButton />
            </div>
        </div>
    )
}
