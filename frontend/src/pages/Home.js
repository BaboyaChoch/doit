import * as React from 'react';
import {useEffect, useState} from "react";
import {Grid, useTheme, Box, Typography} from "@mui/material";
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

  const getBoardTasks = (status) => {
    return Object.entries(CONFIG.tasks).filter(([key, val]) => val.task_status === status)
  }

  const handleOnDragEnd = () => {
    console.log("DRAG HAS ENDEED")
  }

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
                CONFIG.boardOrder.map((boardId) => (
                  <Grid key={boardId} item container xs={4} className={classes.todoContainer}>
                    <Board
                      key={boardId}
                      title={CONFIG.boards[boardId].board_title}
                      tasks={getBoardTasks(boardId)}
                      boardId={boardId}
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