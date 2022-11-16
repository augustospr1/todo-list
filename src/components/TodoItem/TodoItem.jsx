import React, { useState, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Paper } from "@mui/material";
import EditTodoDialog from "../EditTodoDialog";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import { formatDate } from "../../utils/date";
import Grid from '@mui/material/Grid';
import './style.css';


export function TodoItem({ todo, deleteTodo, editTodo }) {
  const [openDialog, setOpenDialog] = React.useState(false);

  const dialogHandler = () => {
    setOpenDialog(!openDialog);
  };

  const [startDate, setStartDate] = useState(new Date()); // useState para a data
  const getData = formatDate(startDate); // Para filtrar a informação que eu busquei do seletor de data
  const [getDataApi, setDataApi] = useState([]); // useState para o fetch
  const [hour, setHour] = useState(); // useState para o botão de horas
  
  const url = 'https://date.nager.at/api/v3/publicholidays/2022/BR';
  useEffect(() => {
    fetch(url)
    .then((response) => response.json())
    .then((json) => setDataApi(json));
  }, []);
 
  const comparaData = getDataApi.find((atual) => atual.date === getData);

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
        <Grid container>
          <div style={{ padding: "0em 1em 0.5em" }} className="dateSelector">
            <div>
              <p style={{ margin: "0em 0em 0.5em" }}>Dia para fazer:</p>
              <DatePicker style={{ border: "none", margin: "0em" }}
              selected={startDate} 
              onChange={(date) => setStartDate(date)} 
              dateFormat="dd/MM/yyyy" />
            </div>
            <div>
              <p style={{ margin: "0.3em 0em" }}>{comparaData ? 'Feriado ' + comparaData?.localName : 'Dia normal'}!</p>
            </div>
          </div>
          <div style={{ padding: "0em 1em" }} className="hourSelector">
            <p style={{ margin: "0em 0em 0.5em" }}>Hora para começar:</p>
            <TimePicker onChange={setHour} value={hour} amPmAriaLabel format="hh:mm" clearAriaLabel="Clear value"/>
          </div>
        </Grid>

      </Paper>
    </>
  );
}