import Paper from "@mui/material/Paper";
import {makeStyles} from "@mui/styles";
import {Box, Card, Grid, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import * as React from "react";
import {Colors} from "../styles/colors";
const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    width: '100%',

  },
  boardActions:{
    borderBottom: '1px solid grey',
    display:'flex',
    justifyContent:'center',
    alignItems: 'center',
    width:'100%'
  },
  tasks :{
  },
  taskItem: {
    backgroundColor:'grey',
    margin:'5px 5px 0px 5px'
  }
})

const BOARD_CONFIG = {
  'to_do' : {
    title: 'To do'
  },
  'in_progress':{
    title: 'In Progress'
  },
  'done': {
    title: 'Done'
  }
}
export default function Board({ type }) {

  const classes = useStyles()
  return (
    <Paper elevation={4} className={classes.root} sx={{backgroundColor: 'white'}}>
      <Grid container direction='column' sx={{height:'100%'}}>
        <Grid item container xs={.75} className={classes.boardActions}>
          <Typography variant='h6'>{`${BOARD_CONFIG[type].title}`}</Typography>
        </Grid>
        <Grid item container xs={11.25} className={classes.tasks} ></Grid>
      </Grid>
    </Paper>
  )
}