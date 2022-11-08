import Paper from "@mui/material/Paper";
import {makeStyles} from "@mui/styles";
import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import * as React from "react";
import {Colors} from "../styles/colors";
import config from "../lib/config";
import {Draggable} from "react-beautiful-dnd";

const useStyles = makeStyles({
  root: {
    border: '1px solid lightgrey',
  },
  content: {}
})

export default function Task({taskId, content, taskIndex}) {
  console.log(taskId, taskIndex)
  const classes = useStyles()
  return (
    <Draggable draggableId={taskId} index={taskIndex}>
      {provided => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={classes.root}
        >
          <CardContent className={classes.content}>
            <Typography sx={{fontSize: 15}}>
              {content}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Draggable>
  )
}