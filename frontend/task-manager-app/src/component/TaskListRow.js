import "./TaskListRow.css";
import { useRef,useEffect,useContext } from "react";
import { NotificationContext } from "./ViewPage";
import Notification from "./Notification";
import axios from "axios";
import { TasksContext } from "./ListView";
//Material UI Components:
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';


export default function TaskListRow({completed,title,dueDate,_id,time,description,path}){
    const notification = useContext(NotificationContext);
    const updateTask = useContext(TasksContext);
    const checkDIV = useRef(null);
    const dragStarted = (e)=>{
        e.target.classList = "item_row dragging closed";
    }
    const dragEnded = (e)=>{
        e.target.classList = "item_row closed";
             if(e.target.id)
                 checkDIV.current.click();
        
    }
    const removeTask = async ()=>{
        const {data} = await axios.delete(`https://organizemate.vercel.app/api/tasks/${_id}`);
        if(data.success){
            notification(currentValue=>{
                if(currentValue){
                    return [...currentValue,<Notification  msg={data.msg} type="success"/>];
                }
                    return [<Notification  msg={data.msg} type="success"/>]; 
            });
            
            updateTask(currVal=>{
                return !currVal
            })
        }

    };
    const changeTaskData = async (e)=>{
        if(e){
            e.preventDefault();                        
        }
        const {data} = await axios.put(`https://organizemate.vercel.app/api/tasks/${_id}`,
        {
            completed : !completed
        });
        if(data.success){
            notification(currentValue=>{
                if(currentValue){
                    return [...currentValue,<Notification  msg={data.msg} type="success"/>];
                }
                    return [<Notification  msg={data.msg} type="success"/>]; 
            });
            
            updateTask(currVal=>{
                return !currVal
            })
        }
        }
        useEffect(()=>{
            if(completed)
            checkDIV.current.classList = "checking checked";
            else
            checkDIV.current.classList = "checking";
        },[]);
    return(
        <TableRow className="item_row closed" draggable="true" onDragStart={dragStarted} onDragEnd={dragEnded} >
            <TableCell>
                <i className="fa-solid fa-chevron-down"  onClick={e=>{
                    if(e.target.parentElement.parentElement.classList.value == "item_row" && e.target.parentElement.parentElement.classList.value != "item_row dragging"){
                        e.target.parentElement.parentElement.classList = "item_row closed";   
                    }
                    else{
                        e.target.parentElement.parentElement.classList = "item_row";
                    }
                     } }></i>
                    <div className="task_row_header">
                        <div className="" ref={checkDIV} onClick ={changeTaskData}>
                        <i className="fa-solid fa-check row"></i>
                        </div>
                        <div  className="task_row_title" style={{ fontFamily: 'Hedvig Letter Serif' , fontSize:"20px"}}>
                            <span style={{
                                textDecorationLine:completed?"line-through":""
                            }}>
                            {title}
                            <i className="fa-solid fa-calendar-xmark" onClick={removeTask}  style={{position:"absolute",bottom:"10px",right:"10px",transition:"0.23s",cursor:"pointer"}}></i>
                            </span>
                            <br></br>
                            <div style={{marginLeft:"10px"}}>
                                <CalendarMonthIcon style={{marginRight:"10px"}} />
                                {dueDate}
                            </div>
                            <div style={{marginLeft:"10px"}}>
                                <AccessTimeIcon style={{marginRight:"10px"}}/>
                                {time}
                            </div>
                            <div style={{marginLeft:"10px"}}>
                                <DescriptionIcon style={{marginRight:"10px"}}/>
                                {description == ""?"u didn't enter any description":description}
                            </div>
                            <div style={{marginLeft:"10px",position:"relative"}}>
                            
                           
                            </div>
                        </div>
                    </div>
            </TableCell>
        </TableRow>
        
    )
}