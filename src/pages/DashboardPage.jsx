import React, { useState } from 'react'
import Board from '../components/Dashboard/Board'
import { v4 as uuidv4 } from 'uuid';
import SideBar from '../components/Dashboard/SideBar';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TaskModal from '../components/Dashboard/TaskModal';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    bottom: '-40%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    display:'flex',
    justifyContent:'center',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    transition:'0.5s',
    overflow:'auto',
};

export default function DashboardPage() {
    const items = [
        {
            id:uuidv4(),
            title:"Title",
            content:"Content"
        },
        {
            id:uuidv4(),
            title:"Title 2",
            content:"Content 2"
        },
        {
            id:uuidv4(),
            title:"Title 3",
            content:"Content 3"
        }
    ]
    const boardData = {
        toDo: {
            name: "To Do",
            color:'ghostwhite',
            taskColor:'#e0e0e0',
            items:[],
        },
        inProgress: {
            name: "In Progress",
            color:'aliceblue',
            taskColor:'#cbeaff',
            items:[],
        },
        done: {
            name: "Done",
            color:'#c6ffc6',
            taskColor:'#4cff81',
            items:[],
        }
    }
    const [columns,setColumns] = useState(boardData);
    const [open, setOpen] = useState(false);
    const openIssueModal = () => setOpen(true);
    const closeIssueModal = () => setOpen(false);

    const newTask = (columnId,addData)=>{
        const newData = {
            id:uuidv4(),
            ...addData
        }
        console.log(newData)
        const columnItems = columns[columnId]
        const copyItems = [...columnItems.items]
        copyItems.push(newData)
        
        setColumns({
            ...columns,
            [columnId]:{
                ...columnItems,
                items:copyItems
            }
        })
    }
    const editTask = (columnId,item)=>{
        console.log(columnId,item)
    }
    const deleteTask = (itemId,columnId)=>{
        const columnItems = columns[columnId];
        const copyItems = [...columnItems.items];
        const afterDelete = copyItems.filter((copyItem)=>{
            return copyItem.id!==itemId
        })
        setColumns({
            ...columns,
            [columnId]:{
                ...columnItems,
                items:afterDelete
            }
        })
    }

    return (
        <div>
            <SideBar newTask={newTask} openIssueModal={openIssueModal}/>
            <Board columns={columns} setColumns={setColumns} editTask={editTask} deleteTask={deleteTask}/>
            <div>
                <Modal
                    open={open}
                    onClose={closeIssueModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    style={{overflow:"auto"}}
                >
                    <Box sx={style}>
                        <TaskModal newTask={newTask} closeIssueModal={closeIssueModal}/>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}
