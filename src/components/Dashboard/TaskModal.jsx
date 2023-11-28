import React, { useEffect, useState } from 'react'
import Assignees from './Assignees'
import Selector from './Selector'
import TextField from '@mui/material/TextField';
import {IoMdAlert} from 'react-icons/io';
import {RiTaskFill,RiPriceTagFill} from 'react-icons/ri'
import RichEditorDesc from './RichEditorDesc';
import { EditorState } from "draft-js";
import {FiArrowUp,FiArrowDown} from 'react-icons/fi';
import Button from '@mui/material/Button';

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
export default function TaskModal({newTask,closeIssueModal}) {
    const [selected, setSelected] = useState(issues[0]);
    const [priorityselected, setPrioritySelected] = useState(priorities[0]);
    const [reporterselected, setReporterSelected] = useState(reporters[0]);
    const [currentassignees,setCurrentAssignees] = useState([])
    const [summary,setSummary] = useState("");
    const [desc,setDesc] = useState(EditorState.createEmpty());
    const [addData,setAddData] = useState({
        issueType:new Object,
        summary:"",
        desc:"",
        reporter:new Object,
        assignees:[],
        priority:new Object
    })
    const setShortSummary = (e)=>{
        setSummary(e.target.value);
    }
    useEffect(()=>{
        setAddData({
            ...addData,
            summary:summary,
            issueType:selected,
            desc:desc,
            reporter:reporterselected,
            assignees:currentassignees,
            priority:priorityselected
        })
    },[summary,selected,desc,priorityselected,reporterselected,currentassignees])
    return (
        <div className='flex flex-col items-end gap-8'>
            <div className="content">
                <label className="block text-sm font-medium leading-6 text-gray-900">Issue Type</label>
                {/* Issue Type */}
                <Selector selected={selected} setSelected={setSelected} issues={issues}/>
                <hr className='my-4'/>
                <label className="block text-sm font-medium leading-6 text-gray-900">Short Summary</label>
                {/* Short Summary */}
                <div>
                    <TextField
                        hiddenLabel
                        id="fullWidth"
                        variant="outlined"
                        size="small"
                        value={summary}
                        onChange={setShortSummary}
                    />
                </div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                {/* Description with rich text */}
                <RichEditorDesc desc={desc} setDesc={setDesc}/>
                <hr className='my-4'/>
                {/* Reporter - Only one */}
                <label className="block text-sm font-medium leading-6 text-gray-900">Reporter</label>
                <Selector selected={reporterselected} setSelected={setReporterSelected} issues={reporters}/>
                {/* Assignee - More than one */}
                <label className="block text-sm font-medium leading-6 text-gray-900">Assignees</label>
                <Assignees setCurrentAssignees={setCurrentAssignees} assignees={assignees}/>
                <hr className='my-4'/>
                {/* Priority */}
                <label className="block text-sm font-medium leading-6 text-gray-900">Priority</label>
                <Selector selected={priorityselected} setSelected={setPrioritySelected} issues={priorities}/>
            </div>
            <div className="buttons pb-12">
                <Button onClick={()=>{newTask("toDo",addData);closeIssueModal();}} variant="contained" size="small">Create Issue</Button>
            </div>
        </div>
    )
}
