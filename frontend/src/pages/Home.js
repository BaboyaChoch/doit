import * as React from 'react';
import { useEffect, useState } from "react";
import {Grid, useTheme, Box, Typography} from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { NavBar } from "../components/NavBar";
import { Colors } from "../styles/colors";
import Board from "../components/Board";


const useStyles = makeStyles({
  root: {
  },
  appBar: {
    backgroundColor: Colors.WHITE,
  },
  content: {
    height:'92.8vh',
    backgroundColor: '#FAF9F6'
  },
  main: {

  },
  todoContainer:{
    height: '98%',
  },
  inProgressContainer:{
    height: '98%',
  },
  doneContainer:{
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

  return (
    <Box>
      <Grid container direction='column'>
        <Grid>
          <NavBar></NavBar>
        </Grid>
        <Grid item container className={classes.content}>
          <Grid item xs={3} />
          <Grid item container xs={6} sx={{marginTop: 0}} spacing={2}>
            <Grid item container xs={4} className={classes.todoContainer}>
              <Board type='to_do' />
            </Grid>
            <Grid item container xs={4} className={classes.inProgressContainer}>
              <Board type='in_progress' />
            </Grid>
            <Grid item container xs={4} className={classes.doneContainer}>
              <Board type='done' />
            </Grid>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </Grid>
    </Box>
  );
}