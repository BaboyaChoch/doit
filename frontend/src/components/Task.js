import {makeStyles} from "@mui/styles";
import {
  Card,
  CardContent,
  Typography
} from "@mui/material";
import * as React from "react";
import {Draggable} from "react-beautiful-dnd";

const useStyles = makeStyles({
  root: {
    margin: 8
  },
  content: {
    backgroundColor: "#FCF5E5",
    border: '1px solid lightgrey'
  }
})

export default function Task({data, taskIndex}) {

  const classes = useStyles()
  return (
    <Draggable key={data.task_id} draggableId={data.task_id} index={taskIndex}>
      {(provided, snapshot) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={classes.root}
        >
          <CardContent
            className={classes.content}
            sx={{backgroundColor: snapshot.isDragging ? '#e5fce5' : '#FCF5E5'}}
          >
            <Typography sx={{fontSize: 15}}>
              {data.task_content}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Draggable>
  )
}