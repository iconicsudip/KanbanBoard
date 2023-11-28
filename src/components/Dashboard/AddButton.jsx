import React from 'react'
import {GrAdd} from 'react-icons/gr';

export default function AddButton() {
    return (
        <div className="addButton flex items-center w-[100%] p-2 gap-2 my-2 cursor-pointer hover:bg-slate-300">
            <GrAdd />
            <p>New</p>
        </div>
    )
}
