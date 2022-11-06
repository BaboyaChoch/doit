import * as React from 'react';
import { useEffect, useState } from "react";
import { Grid, useTheme, Box, Typography, Paper } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { Colors } from "../styles/colors"
const useStyles = makeStyles({
  root: {
  },
  content: {
    height: '100vh'
  },
  main: {
    backgroundColor: Colors.WHITE,
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

export default function Registration() {

  const classes = useStyles()

  return (
    <Box>
      <Grid container direction='column'>
        <Grid item xs={2} sx={{backgroundColor: 'grey'}}/>
        <Grid item container className={classes.content}>
          <Grid item xs={2} sx={{backgroundColor: 'black'}}/>
          <Grid item container xs={8}>
            <Label>MAIN</Label>
          </Grid>
          <Grid item xs={2} sx={{backgroundColor: 'black'}}/>
        </Grid>
        <Grid item xs={2} sx={{backgroundColor: 'grey'}}/>
      </Grid>
    </Box>
  );
}