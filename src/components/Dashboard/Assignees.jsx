import React from 'react'
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function Assignees({setCurrentAssignees,assignees}) {
    const getAssinees = (e, newValue) => {
        setCurrentAssignees(newValue);
    }
    return (
        <Autocomplete
        className='multipleSelect'
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            size="small"
            options={assignees}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
            <TextField {...params}/>
            )}
            onChange={getAssinees}
        />
    )
}
