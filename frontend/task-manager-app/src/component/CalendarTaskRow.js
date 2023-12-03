import React, { useRef, useState } from "react";
//Material UI Components:
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';

export default function CalendarTaskRow({ completed, title, dueDate, _id, time, description, path }) {
  const task = useRef();
  const [expanded, setExpanded] = useState(false);
  const handleCardClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card 
      ref={task}
      onClick={handleCardClick}
      style={{ backgroundColor: '#F67280', width: '400px' , position:"relative", right:'-30px'}}
    >
      <CardContent>
        <Typography variant="h6" style={{ fontFamily: 'Hedvig Letter Serif' , fontSize:"20px"}}>{title}</Typography>
        {expanded && (
          <>
           <div style={{ display: 'flex', alignItems: 'center' }}>
  <CalendarMonthIcon style={{ marginRight: '10px' }} />
  <Typography style={{ fontFamily: 'Hedvig Letter Serif', fontSize: '20px' }}>
    {dueDate}
  </Typography>
</div>

<div style={{ display: 'flex', alignItems: 'center' }}>
  <AccessTimeIcon style={{ marginRight: '10px' }} />
  <Typography style={{ fontFamily: 'Hedvig Letter Serif', fontSize: '20px' }}>
    {time}
  </Typography>
</div>

<div style={{ display: 'flex', alignItems: 'center' }}>
  <DescriptionIcon style={{ marginRight: '10px' }} />
  <Typography>{description}</Typography>
</div>

          </>
        )}
      </CardContent>
    </Card>
  );
}
