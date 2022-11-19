import Paper from "@mui/material/Paper";
import {makeStyles} from "@mui/styles";
import {Box, Card, Grid, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import * as React from "react";
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
    borderBottom: '1px solid lightgrey',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    border: '1px solid red'
  },
  tasksList: {
    height: '100%',
    minHeight: '100px',
    flexGrow: 1
  },
  taskItem: {
    backgroundColor: 'grey',
    margin: '5px 5px 0px 5px'
  }
})


const BOARD_CONFIG = {
  'to_do': {
    color: '#fce5e5'
  },
  'in_progress': {
    color: '#fcfae5'
  },
  'done': {
    color: '#ebfce5'
  }
}
export default function Board({data, tasks}) {

  const classes = useStyles()
  return (
    <Paper elevation={4} className={classes.root} sx={{backgroundColor: 'white'}}>
      <Grid container direction='column' sx={{height: '100%'}}>
        <Grid item container xs={12} className={classes.tasks} direction='column'>
          <Droppable droppableId={data.board_id}>
            {(provided, snapshot) => (
              <Box
                className={classes.tasksList}
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{backgroundColor: snapshot.isDraggingOver ? `${BOARD_CONFIG[data.board_id].color}` : ''}}
              >
                <Box
                  className={classes.boardActions}
                >
                  <Typography
                    variant='h6'
                    sx={{color: '#696969', marginLeft: .5, border: '1px solid blue'}}
                  >{data.board_title}
                  </Typography>
                  <AddIcon
                    sx={{border: '1px solid green'}}
                    onClick={() => console.log(`ADD HAS BEEN CLICKED FOR ${data.board_title}!!`)}
                  />
                </Box>
                {tasks.map((task, index) => (
                  <Task
                    key={task.taskId}
                    data={task}
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