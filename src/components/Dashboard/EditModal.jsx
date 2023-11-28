import React, { useEffect,useState } from 'react'
import Selector from './Selector'
import {IoMdAlert} from 'react-icons/io';
import {RiTaskFill,RiPriceTagFill} from 'react-icons/ri'
import RichEditorDesc from './RichEditorDesc';
import { EditorState,convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';
import {FiArrowUp,FiArrowDown} from 'react-icons/fi';
import {MdDelete} from 'react-icons/md';
import {RxCrossCircled} from 'react-icons/rx';
import {MdOutlineModeEditOutline,MdOutlineEditOff} from 'react-icons/md';
import TextareaAutosize from '@mui/base/TextareaAutosize';

const issues = [
    {
        id:1,
        icon:<RiTaskFill className="w-[100%] h-[100%]" color="#709fff"/>,
        name:"Task"
    },
    {
        id:2,
        icon:<IoMdAlert className="w-[100%] h-[100%]" color="orangered"/>,
        name:"Bug"
    },
    {
        id:3,
        icon:<RiPriceTagFill className="w-[100%] h-[100%]" color="#3dbb02"/>,
        name:"Story"
    }
]
const priorities = [
    {
        id:1,
        icon:<FiArrowUp className="w-[100%] h-[100%]" color="red"/>,
        name:"Highest"
    },
    {
        id:2,
        icon:<FiArrowUp className="w-[100%] h-[100%]" color="orangered"/>,
        name:"High"
    },
    {
        id:3,
        icon:<FiArrowUp className="w-[100%] h-[100%]" color="orange"/>,
        name:"Medium"
    },
    {
        id:4,
        icon:<FiArrowDown className="w-[100%] h-[100%]" color="green"/>,
        name:"Low"
    },
    {
        id:5,
        icon:<FiArrowDown className="w-[100%] h-[100%]" color="limegreen"/>,
        name:"Lowest"
    }
]
const reporters = [
    {
        id: 1,
        name: 'Wade Cooper',
        avatar:
            'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 2,
        name: 'Arlene Mccoy',
        avatar:
            'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 3,
        name: 'Devon Webb',
        avatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
    },
    {
        id: 4,
        name: 'Hellen Schmidt',
        avatar:
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    }
]
const assignees = [
    {
        id: 1,
        name: 'Wade Cooper',
        avatar:
            'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 2,
        name: 'Arlene Mccoy',
        avatar:
            'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        id: 3,
        name: 'Devon Webb',
        avatar:
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
    },
    {
        id: 4,
        name: 'Hellen Schmidt',
        avatar:
            'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    }
]
export default function EditModal({columnId,item,editTask,deleteTask,closeIssueModal}) {
    const [edit,setEdit] = useState(false);
    const [selected, setSelected] = useState(item.issueType);
    const [priorityselected, setPrioritySelected] = useState(priorities[0]);
    const [reporterselected, setReporterSelected] = useState(reporters[0]);
    const [currentassignees,setCurrentAssignees] = useState([])
    const [summary,setSummary] = useState(item.summary);
    const [desc,setDesc] = useState(item.desc);
    function createMarkup(html) {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    useEffect(()=>{
        editTask(columnId,item)
    },[])
    return (
        <div className='w-[100%]'>
            <div className="flex pt-[21px] px-[11px] justify-between items-center">
                <div className="issueType">
                    {edit?<Selector selected={selected} setSelected={setSelected} issues={issues}/>:
                        <div className='flex items-center h-[2.1rem] gap-2'>
                            <div className='w-[1.5rem]'>{selected.icon}</div>
                            <span>{selected.name}</span>
                        </div>
                    }
                </div>
                <div className="modalOptions flex gap-4">
                    {edit?<div className='flex h-min items-center p-[0.4rem] w-[100%] gap-2 cursor-pointer' onClick={()=>setEdit(false)}>
                        <MdOutlineEditOff color='gray' size='24'/>
                    </div>:<div className='flex h-min items-center p-[0.4rem] w-[100%] gap-2 cursor-pointer' onClick={()=>setEdit(true)}>
                        <MdOutlineModeEditOutline color='gray' size='24'/>
                    </div>}
                    <div className='flex h-min items-center p-[0.4rem] w-[100%] gap-2 cursor-pointer' onClick={()=>deleteTask(item.id,columnId)}>
                        <MdDelete color='red' size='24'/>
                    </div>
                    <div className='flex h-min items-center p-[0.4rem] w-[100%] gap-2 cursor-pointer' onClick={closeIssueModal}>
                        <RxCrossCircled color='gray' size='24'/>
                    </div>
                </div>
            </div>
            <div className="flex pt-[21px] px-[11px] flex-col">
                <div className="content_body">
                    {edit?
                        <TextareaAutosize className='font-[600] text-[1.5rem] resize-none w-[100%] focus-visible:outline-none focus-visible:bg-neutral-100 p-[7px]' placeholder="Short summary" spellcheck="false" value={summary} onChange={(e)=>setSummary(e.target.value)}/>
                    :
                        <p className='font-[600] text-[1.5rem]'>{summary}</p>
                    }
                    <hr className='my-2'/>
                    <label className="block text-md font-medium leading-6 text-gray-900">Description</label>
                    {edit?
                        <RichEditorDesc desc={desc} setDesc={setDesc}/>
                    :
                        <div style={{wordBreak:'break-all'}} className='py-[20px]' dangerouslySetInnerHTML={createMarkup(draftToHtml(convertToRaw(desc.getCurrentContent())))}>
                        </div>
                    }
                </div>
                <div className='content_options'></div>
            </div>
        </div>
    )
}
