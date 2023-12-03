import { forwardRef, useContext, useRef, useState } from "react";
import "./TaskForm.css";
//Material UI Components
import Calendar from "./Calendar";
import TextField from "@mui/material/TextField";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { NotificationContext } from "./ViewPage";
import Notification from "./Notification";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
const TaskForm = forwardRef(({ reRendertasks }, ref) => {
  const notification = useContext(NotificationContext);

  const [tasknameInput, HourInput, minutesInput, descriptionInput, pathInput] =
    [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const sendData = async () => {
    const task = {
      title: tasknameInput.current.value,
      dueDate: date,
      time: HourInput.current.value + ":" + minutesInput.current.value,
      description: descriptionInput.current.value,
      path:
        pathInput.current.value == ""
          ? "/"
          : pathInput.current.value.replace("C:\\fakepath\\", "uploads/"),
    };
    try {
      const { data } = await axios.post(
        "https://organizemate.vercel.app/api/tasks/add",
        task
      );
      if (data.success === true) {
        notification((currentValue) => {
          if (currentValue) {
            return [
              ...currentValue,
              <Notification msg={data.msg} type="success" />,
            ];
          }
          return [<Notification msg={data.msg} type="success" />];
        });
        reRendertasks((re) => (re === true ? false : true));
        const img = document.querySelector('input[type="file"]').files[0];
        if (img) {
          const { data } = await axios.post(
            "https://organizemate.vercel.app/api/tasks/upload",
            {
              image: img,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          notification((currentValue) => {
            if (currentValue) {
              return [
                ...currentValue,
                <Notification msg={data} type="success" />,
              ];
            }
            return [<Notification msg={data} type="success" />];
          });
        }
        tasknameInput.current.value = "";
        tasknameInput.current.value = "";
        HourInput.current.value = "";
        minutesInput.current.value = "";
        descriptionInput.current.value = "";
        pathInput.current.value = "";

        ref.current.style.display = "none";
      } else {
        data.msg.forEach((msg, i) => {
          notification((currentValue) => {
            if (currentValue === undefined) {
              return [<Notification key={i} type={"error"} msg={msg} />];
            }
            return [
              ...currentValue,
              <Notification key={i} type={"error"} msg={msg} />,
            ];
          });
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  const [date, setDate] = useState("dd-mm-yyyy");
  return (
    <div
      id="form_container"
      ref={ref}
      onClick={(e) => {
        if (
          e.target.id === ref.current.id ||
          e.target.id === "close_form" ||
          e.target.classList[1] === "fa-xmark"
        )
          ref.current.style.display = "none";
      }}
    >
      <div id="form_holder">
        <div id="close_form">
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div id="infos_form_container">
          <div id="calendar_form_container">
            <Calendar dateState={setDate} />
          </div>
          <div id="inputs_form_container">
            <div className="input_con">
              <Typography
                style={{
                  fontFamily: "Hedvig Letter Serif",
                  fontSize: "20px",
                  position: "relative",
                  top: "-10px",
                }}
                sx={{ color: "#C8A2C8" }}
              >
                Task name
              </Typography>
              <TextField
                type="text"
                placeholder="Task Name"
                id="task_name_input"
                sx={{ height: "-10px" }}
                inputRef={tasknameInput}
              />{" "}
            </div>

            <div className="date_picker">
              <div
                id="date_displayer"
                style={{ position: "relative", top: "25px" }}
              >
                {date}{" "}
                <div id="calendar_icon_con">
                  <CalendarMonthIcon />{" "}
                </div>
              </div>
              <div
                id="time_input"
                style={{ position: "relative", top: "25px" }}
              >
                <input type="number" placeholder="H" ref={HourInput} /> :{" "}
                <input type="number" placeholder="M" ref={minutesInput} />
                <div id="clock_icon_con">
                  <AccessTimeIcon />{" "}
                </div>
              </div>
            </div>
            <div className="input_con">
              <Typography
                style={{ fontFamily: "Hedvig Letter Serif", fontSize: "20px" }}
                sx={{ color: "#C8A2C8", position: "relative", top: "38px" }}>
                Description
              </Typography>
              <TextField
                type="text"
                id="desc_con"
                style={{outline: "none",
                  backgroundColor: "white",
                  border: "0",
                  color: "black",
                  boxShadow: "0 0 2px white",
                  borderRadius: "10px",
                  position:"relative",
                  top:"50px"}}
                inputRef={descriptionInput}
              />{" "}
            </div>

            <div className="upload_send_container">
              <input
                type="file"
                multiple
                accept="image/*"
                id="file"
                ref={pathInput}
              />
              <Button
                id="upload"
                onClick={sendData}
                style={{ fontFamily: "Hedvig Letter Serif", fontSize: "15px" }}
                sx={{
                  height: "40px",
                  display: "flex",
                  position: "relative",
                  left: "160px",
                  top: "70px",
                }}
              >
                Create Task{" "}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default TaskForm;
