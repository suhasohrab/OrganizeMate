import "./ViewPage.css"
import Dashboard from "./Dashboard";
import TaskForm from "./TaskForm";
import { createContext, useEffect, useRef, useState } from "react";
//Material UI Icons
import { Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

export const NotificationContext = createContext();
export default function Main({view, index}){
    const [notification,setNotification] = useState();
    const taskForm = useRef(null);
    const [listView,setlistView] = useState(view);
    const [reRendertasks,setreRendertasks] = useState(false);
    const [dashboard,setDashbaord] = useState(<Dashboard key={index} index={index}/>);
    const toggleForm = ()=>{        
        taskForm.current.style.display = "flex";
    }
    useEffect(()=>{
        setlistView(current=>[current]);
    },[reRendertasks]);
    useEffect(()=>{
        setlistView(view);
        setDashbaord([<Dashboard key={index} index={index}/>]);
    },[view]);
    return(
        <NotificationContext.Provider value={setNotification}>
        <div id="Main">
        {dashboard}
        <div className="main_container">
        <IconButton id="add_task" onClick={toggleForm} style={{ height: '40px' }}>
      <AddIcon /> </IconButton>

        {listView}
        <TaskForm ref={taskForm} reRendertasks={setreRendertasks}/>
        </div>
        <div className="notif_container">
        <div>
            {notification}     
        </div>
        </div>
        </div>
        </NotificationContext.Provider>
    )
}
