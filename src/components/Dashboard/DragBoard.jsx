import React,{useState} from 'react'
import {Draggable} from "@hello-pangea/dnd";
import {BsThreeDotsVertical} from 'react-icons/bs';
import {MdDelete} from 'react-icons/md'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EditModal from './EditModal';
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
export default function DragBoard({item,index,taskColor,editTask,deleteTask,columnId}) {
    const [open, setOpen] = useState(false);
    const openIssueModal = () => setOpen(true);
    const closeIssueModal = () => setOpen(false);
    const openOptions = (e,itemId)=>{
        e.stopPropagation();
        const optId = document.getElementById(itemId)
        if(optId.style.display==='none'){
            optId.style.display = 'flex'
        }else{
            optId.style.display = 'none'
        }
    }
    const openEditModal = ()=>{
        openIssueModal();
    }
    return (
        <>
            <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}
            >
                {(provided, snapshot) => (
                    <div
                        className='flex flex-col gap-4 justify-between relative w-[95%] mx-auto'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            ...provided.draggableProps.style,
                            padding: 16,
                            margin: "8px auto 8px auto",
                            minHeight: "50px",
                            backgroundColor: "white",
                            cursor:'pointer',
                            boxShadow: snapshot.isDragging ? 'rgb(9 30 66 / 15%) 5px 10px 30px 0px' :'rgb(9 30 66 / 25%) 0px 1px 2px 0px',
                            borderRadius:'3px'
                        }} onClick={openEditModal}>
                            <div className="summary">
                                <p>{item.summary.length<=60?item.summary:item.summary.substring(0,50)+" ..."}</p>
                            </div>
                            <div className="flex justify-between items-center w-[100%]">
                                <div className="flex">
                                    <div className="h-5 w-5 flex-shrink-0 rounded-full">
                                        {item.issueType.icon}
                                    </div>
                                    <div className="h-5 w-5 flex-shrink-0 rounded-full">
                                        {item.priority.icon}
                                    </div>
                                </div>
                                <div className="flex">
                                    {item.assignees.length<=3?
                                        item.assignees.map((assign)=>{
                                            return (
                                                <img src={assign.avatar} alt="" className="dashboard_avatar h-6 w-6 flex-shrink-0 rounded-full ml-[-3px]" />
                                            )
                                        })
                                    :
                                        <>
                                            {item.assignees.slice(0,3).map((assign)=>{
                                                return (
                                                    <img src={assign.avatar} alt="" className="dashboard_avatar h-6 w-6 flex-shrink-0 rounded-full ml-[-3px]" />
                                                )
                                            })}
                                            <div className="dashboard_avatar h-6 w-6 flex items-center justify-center flex-shrink-0 rounded-full ml-[-3px] bg-slate-300 text-[12px] font-bold">+{item.assignees.length - 3}</div>
                                        </>
                                    }
                                </div>
                            </div>
                            
                        {/* <div onClick={(e)=>openOptions(e,item.id)}>
                            <BsThreeDotsVertical className='cursor-pointer' />
                        </div>
                        <div style={{display:'none'}} className='flex p-2 w-[150px] h-min absolute top-10 -right-32 z-10 backdrop-blur bg-opacity-30 bg-slate-200' id={item.id}>
                            <div className='flex h-min items-center p-[0.4rem] w-[100%] gap-2 hover:bg-slate-300' onClick={()=>deleteTask(item.id,columnId)}>
                                <MdDelete color='red'/>
                                <span style={{color:'red'}} className='text-sm'>Delete</span>
                            </div>
                        </div> */}
                    </div>
                )}
            </Draggable>
            <div>
                <Modal
                    open={open}
                    onClose={closeIssueModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    style={{overflow:"auto"}}
                >
                    <Box sx={style}>
                        <EditModal columnId={columnId} item={item} editTask={editTask} deleteTask={deleteTask} closeIssueModal={closeIssueModal}/>
                    </Box>
                </Modal>
            </div>
        </>
    );
}
