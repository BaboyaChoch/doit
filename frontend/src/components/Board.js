import Paper from "@mui/material/Paper";
import {makeStyles} from "@mui/styles";
import {Box, Card, Grid, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import * as React from "react";
import {Colors} from "../styles/colors";
import config from "../lib/config";
import Task from "./Task";
import {Droppable} from "react-beautiful-dnd";

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',

  },
  boardActions: {
    borderBottom: '1px solid grey',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  tasks :{
    border: '1px solid red'
  },
  taskItem: {
    backgroundColor:'grey',
    margin:'5px 5px 0px 5px'
  }
})

export default function Board({title, tasks, boardId}) {
  console.log(tasks)
  const classes = useStyles()
  return (
    <Paper elevation={4} className={classes.root} sx={{backgroundColor: 'white'}}>
      <Grid container direction='column' sx={{height: '100%'}}>
        <Grid item container xs={.75} className={classes.boardActions}>
          <Typography variant='h6'>{title}</Typography>
        </Grid>
        <Grid item container xs={11.25} className={classes.tasks} direction='column'>
          <Droppable droppableId={boardId}>
            {provided => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task, index) => (
                  <Task
                    key={task[1].task_id}
                    taskId={task[1].task_id}
                    content={task[1].task_content}
                    taskIndex={index}
                  />))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Grid>
      </Grid>
    </Paper>
  )
}