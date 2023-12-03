import "./Dashboard.css";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
//Material UI Icons:
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import OrganizeMate from './OrganizeMate-removebg-preview.png'; 
import { Typography } from "@mui/material";

export default function Dashboard({index}){
    const [list,calendar,smallAside] = [useRef(),useRef(),useRef(),useRef()];
    useEffect(()=>{
        [list,calendar].forEach(e=>e.current.id="");
        smallAside.current.querySelectorAll(`ul .dash_list`).forEach(e=>e.id = "");
        [list,calendar][index-1].current.id = "clicked";
        smallAside.current.querySelectorAll(`ul .dash_list`)[index-1].id = "clicked";
    },[index]);

    window.addEventListener("resize",()=>{
        if ( window.innerWidth > 830){
            if(smallAside){
                if(smallAside.current != undefined  || smallAside.current != null)
                    smallAside.current.style.display = "none";
            }
        }
    });
    const imageSize = {
        width: '120px', // Adjust the width as needed
        height: '120px', // Adjust the height as needed
      };
      const fontStyles = {
        fontFamily: 'Hedvig Letters Serif,sans-serif', // Replace 'Roboto' with the desired Google Font
      };
    return(
        <>
        <aside id="big_screen">
            <div id="logo_container">
            <img src={OrganizeMate} alt="hi" style={{position:"relative", top:"30px",width: '13c0px', // Adjust the width as needed
        height: '120px', }}/>
            </div>
            <ul>
                <Link to={"/ListView"} style={{textDecoration :"none", position:"relative", top:"50px"}}>     
                <li className="dash_list" ref={list}>
                <CheckBoxIcon /> <Typography style={{ fontFamily: 'Hedvig Letter Serif' }}>List</Typography>

                </li>
                </Link>
                <Link to={"/Calendar"} style={{textDecoration :"none", position:"relative", top:"60px"}}>     
                <li className="dash_list" ref={calendar} key={2}>
                <CalendarMonthIcon /><Typography style={{ fontFamily: 'Hedvig Letter Serif' }}>Calendar</Typography>

                </li>
                </Link>
            </ul>
        </aside>
        <aside id="small_screen" ref={smallAside}>
            <div id="logo_container" onClick={()=>smallAside.current.style.display = "none"}>
                <h2>Logo</h2>
            </div>
            <ul>
                          
                <Link to={"/ListView"} style={{textDecoration :"none"}}>     
                <li className="dash_list" >
                <CheckBoxIcon /><Typography style={{ fontFamily: 'Hedvig Letter Serif' }}>List</Typography>
                </li>
                </Link>
                <Link to={"/Calendar"} style={{textDecoration :"none"}}>     
                <li className="dash_list">
                <CalendarMonthIcon /><Typography style={{ fontFamily: 'Hedvig Letter Serif' }}>Calendar</Typography>
                </li>
                </Link>
              
            </ul>
        </aside>
        </>
    
    )
    }