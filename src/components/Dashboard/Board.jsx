import React from 'react'
import { DragDropContext,Droppable} from "@hello-pangea/dnd";
import DragBoard from './DragBoard';
import { v4 as uuidv4 } from 'uuid';
import AddButton from './AddButton';

export default function Board({columns,setColumns,newTask,editTask,deleteTask}) {
    const setBoard = (result)=>{
        const source = result.source;
        const destination = result.destination;
        if(source.droppableId!==destination.droppableId){
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]:{
                    ...sourceColumn,
                    items:sourceItems
                },
                [destination.droppableId]:{
                    ...destColumn,
                    items:destItems
                }
            })
        }else{
            const column = columns[source.droppableId];
            const copiedItems = [...column.items]
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]:{
                    ...column,
                    items:copiedItems
                }
            })
        }
    }
    
    return (
        <div className="flex flex-row gap-8 w-min m-auto py-16 pl-[100px] pr-[15px]">
            <DragDropContext onDragEnd={setBoard} >
                {Object.entries(columns).map(([columnId,column],index)=>{
                    return(
                        <div className='flex flex-col gap-2 items-center w-[300px] h-min' key={columnId}>
                            <div className='flex justify-between w-[100%] items-center px-4 py-2' style={{background:column.color}}>
                                <h4 className='font-bold'>{column.name}</h4>
                                <p className='font-bold'>{column.items.length}</p>
                            </div>
                            <Droppable droppableId={columnId} key={columnId}>
                                {(provided, snapshot) =>(
                                    <div
                                        className='w-[100%]'
                                        ref={provided.innerRef}
                                        style={{ 
                                            background: snapshot.isDraggingOver ? column.taskColor : column.color,
                                            minHeight:'50px'
                                        }}
                                        {...provided.droppableProps}
                                    >
                                        {column.items.map((item,ind)=>{
                                            return <DragBoard taskColor={column.taskColor} item={item} index={ind} key={ind} editTask={editTask} deleteTask={deleteTask} columnId={columnId}/>
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    )
                })}
            
            </DragDropContext>
        </div>
    )
}
