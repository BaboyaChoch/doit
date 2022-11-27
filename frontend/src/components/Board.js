import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { Box, Card, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import { COLORS } from "../styles/colors";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  boardActions: {
    borderBottom: "1px solid #fef9f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tasksList: {
    height: "100%",
    minHeight: "100px",
    flexGrow: 1,
  },
  taskItem: {
    backgroundColor: "grey",
    margin: "5px 5px 0px 5px",
  },
});

const BOARD_CONFIG = {
  to_do: {
    color: "#fce5e5",
    titleColor: "#f86565",
  },
  in_progress: {
    color: "#fcfae5",
    titleColor: "#f8de65",
  },
  done: {
    color: "#ebfce5",
    titleColor: "#87f867",
  },
};

export default function Board({ data, tasks }) {
  const classes = useStyles();
  return (
    <Paper
      elevation={4}
      className={classes.root}
      sx={{ backgroundColor: COLORS.BOARD }}
    >
      <Grid container direction="column" sx={{ height: "100%" }}>
        <Grid item container xs={12} direction="column">
          <Droppable droppableId={data.board_id}>
            {(provided, snapshot) => (
              <Box
                className={classes.tasksList}
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{
                  backgroundColor: snapshot.isDraggingOver
                    ? `${BOARD_CONFIG[data.board_id].color}`
                    : "",
                }}
              >
                <Box className={classes.boardActions}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: `${BOARD_CONFIG[data.board_id].titleColor}`,
                      fontWeight: 700,
                      justifySelf: "center",
                    }}
                  >
                    {data.board_title}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: "80vh",
                    overflow: "auto",
                    scrollbarWidth: "none",
                  }}
                >
                  {tasks.map((task, index) => (
                    <Task key={task.taskId} data={task} taskIndex={index} />
                  ))}
                </Box>
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Grid>
      </Grid>
    </Paper>
  );
}
