import * as React from 'react';
import {useEffect, useState} from "react";
import {Grid, Box, Typography} from "@mui/material";
import {makeStyles, styled} from "@mui/styles";
import {NavBar} from "../components/NavBar";
import {Colors} from "../styles/colors";
import Board from "../components/Board";
import config from "../lib/config";
import {DragDropContext} from "react-beautiful-dnd";


const useStyles = makeStyles({
  root: {},
  appBar: {
    backgroundColor: Colors.WHITE,
  },
  content: {
    height: '92.8vh',
    backgroundColor: '#FAF9F6'
  },
  main: {},
  board: {
    height: '98%',
  },
  todoContainer: {
    height: '98%',
  },
  inProgressContainer: {
    height: '98%',
  },
  doneContainer: {
    height: '98%',
  }
})

const Label = ({children}) => {
  return <Typography style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    width: '100%'
  }}>
    {children}
  </Typography>
}

export default function Home() {

  const classes = useStyles()
  const CONFIG = config;

  const [inProgressTasks, setInProgressTasks] = useState([])
  const [toDoTasks, setToDoTasks] = useState([])
  const [doneTasks, setDoneTasks] = useState([])

  const getBoardTasksByBoardId = (boardId) => {
    if (boardId === 'in_progress')
      return inProgressTasks
    if (boardId === 'to_do')
      return toDoTasks
    if (boardId === 'done')
      return doneTasks
  }

  const updateTaskStatus = (taskId, newStatus) => {
    console.log("GET", CONFIG.tasks[taskId])
    CONFIG.tasks[taskId].taskStatus = newStatus
    console.log("POST", CONFIG.tasks[taskId])
  }
  const updateTaskListState = (boardId, newOrder) => {
    const newData = newOrder.map(taskId => CONFIG.tasks[taskId])
    CONFIG.boards[boardId].board_tasks = newOrder

    if (boardId === 'in_progress')
      setInProgressTasks(newData)
    else if (boardId === 'to_do')
      setToDoTasks(newData)
    else if (boardId === 'done')
      setDoneTasks(newData)
  }

  const updateTaskLists = (sourceListId, destinationListId, startIndex, endIndex) => {
    if (sourceListId === destinationListId) {
      const sourceList = Array.from(CONFIG.boards[sourceListId].board_tasks);
      const [removedTaskId] = sourceList.splice(startIndex, 1);
      sourceList.splice(endIndex, 0, removedTaskId);

      updateTaskListState(sourceListId, sourceList)
    } else {
      const sourceList = Array.from(CONFIG.boards[sourceListId].board_tasks);
      const destinationList = Array.from(CONFIG.boards[destinationListId].board_tasks);

      const [removedTaskId] = sourceList.splice(startIndex, 1);
      destinationList.splice(endIndex, 0, removedTaskId);

      updateTaskStatus(removedTaskId, destinationListId)
      updateTaskListState(sourceListId, sourceList)
      updateTaskListState(destinationListId, destinationList)
    }
  };

  const handleOnDragEnd = (data) => {
    console.log("ON_DRAG_DATA", data)
    if (!data.destination) {
      return
    }

    let newTaskOrder = updateTaskLists(
      data.source.droppableId,
      data.destination.droppableId,
      data.source.index,
      data.destination.index)

    // CONFIG.boards['to_do'].board_tasks = newTaskOrder
    // let newTasks = newTaskOrder.map(taskId => CONFIG.tasks[taskId])
    //
    // setToDoTasks(newTasks);
  }

  useEffect(() => {
    setInProgressTasks(CONFIG.boards['in_progress'].board_tasks.map(taskId => CONFIG.tasks[taskId]))
    setToDoTasks(CONFIG.boards['to_do'].board_tasks.map(taskId => CONFIG.tasks[taskId]))
    setDoneTasks(CONFIG.boards['done'].board_tasks.map(taskId => CONFIG.tasks[taskId]))
  }, [])

  return (
    <Box>
      <Grid container direction='column'>
        <Grid>
          <NavBar></NavBar>
        </Grid>
        <Grid item container className={classes.content}>
          <Grid item xs={3}/>
          <Grid item container xs={6} sx={{marginTop: 0}} spacing={2}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              {
                CONFIG.boardOrder.map((boardId, index) => (
                  <Grid key={index} item container xs={4} className={classes.todoContainer}>
                    <Board
                      key={boardId}
                      data={CONFIG.boards[boardId]}
                      tasks={getBoardTasksByBoardId(boardId)}
                    />
                  </Grid>
                ))
              }
            </DragDropContext>
          </Grid>
          <Grid item xs={3}/>
        </Grid>
      </Grid>
    </Box>
  );
}