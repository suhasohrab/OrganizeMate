import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
//Material UI Component
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskListRow from "./TaskListRow";

export const TasksContext = createContext();

export function dragAndDrop(doms) {
  // Your existing dragAndDrop function remains the same, assuming it works well with Material UI components.
}
const ListView = () => {
  const theme = useTheme();
  const [updateTasks, setUpdateTasks] = useState(false);
  const [uncompletedTasks, setUncompletedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const getTasks = async () => {
    try {
      const { data } = await axios.get("https://organizemate.vercel.app/api/tasks");
      if (data.success === true && data.data.length > 0) {
        const uncompleted = data.data
          .filter((e) => e.completed === false)
          .map((e, i) => {
            return <TaskListRow key={i} {...e} />;
          });
        setUncompletedTasks(uncompleted.length > 0 ? uncompleted : [<TableRow><TableCell><Typography variant="4"  style={{ fontFamily: 'Hedvig Letter Serif' }}>List is empty</Typography></TableCell></TableRow>]);

        const completed = data.data
          .filter((e) => e.completed === true)
          .map((e, i) => {
            return <TaskListRow key={i} {...e} />;
          });
        setCompletedTasks(completed.length > 0 ? completed : [<TableRow><TableCell><Typography variant="4" style={{ fontFamily: 'Hedvig Letter Serif' }}>List is empty</Typography></TableCell></TableRow>]);
      } else {
        setUncompletedTasks([<TableRow><TableCell><Typography variant="4"  style={{ fontFamily: 'Hedvig Letter Serif' }}>List is empty</Typography></TableCell></TableRow>]);
        setCompletedTasks([<TableRow><TableCell><Typography variant="4"  style={{ fontFamily: 'Hedvig Letter Serif' }}>List is empty</Typography></TableCell></TableRow>]);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    dragAndDrop(document.querySelectorAll("table tbody"));
  }, []);

  useEffect(() => {
    getTasks();
  }, [updateTasks]);

  return (
    <TasksContext.Provider value={setUpdateTasks}>
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="uncompleted_tasks_table">
          {(provided, snapshot) => (
            <TableContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
              component={Paper}
              elevation={0}
              style={{ marginBottom: theme.spacing(2), backgroundColor: "transparent" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h4" style={{fontFamily: 'Hedvig Letter Serif',
        backgroundColor: 'red',
        borderRadius: '8px', // You can adjust the border-radius as needed
        padding: '10px', width:"100px"}}>To Do</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{uncompletedTasks}</TableBody>
              </Table>
            </TableContainer>
          )}
        </Droppable>

        <Droppable droppableId="completed_tasks_table">
          {(provided, snapshot) => (
            <TableContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
              component={Paper}
              elevation={0}
              style={{ marginBottom: theme.spacing(2), backgroundColor: "transparent" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                    <Typography variant="h4"  style={{ fontFamily: 'Hedvig Letter Serif',
        backgroundColor: 'green',
        borderRadius: '8px', // You can adjust the border-radius as needed
        padding: '10px', width:"150px"}}>Completed</Typography>      
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{completedTasks}</TableBody>
              </Table>
            </TableContainer>
          )}
        </Droppable>
      </DragDropContext>
    </TasksContext.Provider>
  );
};

export default ListView;
