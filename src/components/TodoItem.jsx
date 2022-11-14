import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import { Paper } from "@mui/material";
import EditTodoDialog from "./EditTodoDialog";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';


export default function TodoItem({ todo, deleteTodo, editTodo }) {
  const [openDialog, setOpenDialog] = React.useState(false);

  const dialogHandler = () => {
    setOpenDialog(!openDialog);
  };

  const [startDate, setStartDate] = useState(new Date());
  const getData = startDate.toISOString().substring(0,10);

  const [hour, setHour] = useState();

  const url = 'https://date.nager.at/api/v3/publicholidays/2022/BR';

    fetch(url).then(
      (response) => {
        return response.json()
      }).then((date) => {
        console.log( date.map( ({date, localName}) => ({date, localName}) ) );
      })

    console.log(`'` + getData + `'`);

  return (
    <>
      <EditTodoDialog editTodo={editTodo} open={openDialog} dialogHandler={dialogHandler} todo={todo} />
      <Paper style={{ padding: "0.5em 0em" }}>
        <ListItem
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)}>
              <DeleteIcon />
            </IconButton>
          }
          disablePadding
        >
          <ListItemButton role={undefined} dense>
            <ListItemIcon>
              <Checkbox edge="start" tabIndex={-1} disableRipple />
            </ListItemIcon>
            <ListItemText primary={todo.text} onClick={() => setOpenDialog(true)} />
          </ListItemButton>
        </ListItem>
          <div style={{ padding: "0em 1em 0.5em" }} className="dateSelector">
            <p style={{margin: "0em 0em 0.5em"}}>Dia e hora para fazer:</p>
            <DatePicker style={{border: "none"}}
            selected={startDate} 
            onChange={(date) => setStartDate(date)} 
            dateFormat="dd/MM/yyyy" />

            {getData === 1 ? (
              <div>
                <p>feriado</p>
              </div>
            ) : <p>Dia normal</p>}
            
          </div>
          <div style={{ padding: "0em 1em" }} className="hourSelector">
            <TimePicker onChange={setHour} value={hour} format="h:m" clearAriaLabel="Clear value"/>
          </div>
      </Paper>
    </>
  );
}