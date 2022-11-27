import * as React from "react";
import { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Container,
  TextField,
  Dialog,
  Card,
  CardHeader,
  CardContent,
  Stack,
  CardActions,
  Button,
} from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { NavBar } from "../components/NavBar";
import { COLORS } from "../styles/colors";
import Board from "../components/Board";
import config from "../lib/config";
import { DragDropContext } from "react-beautiful-dnd";
import {
  addTask,
  getAllTasks,
  updateTask,
  getUser,
  updateUser,
} from "../lib/TasksApi";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

const useStyles = makeStyles({
  root: {},
  appBar: {},
  content: {
    height: "fit-content",
  },
  main: {},
  board: {
    height: "98%",
  },
  todoContainer: {
    height: "98%",
  },
  inProgressContainer: {
    height: "98%",
  },
  doneContainer: {
    height: "98%",
  },
});

const TASK_STATUS = {
  IN_PROGRESS: "in_progress",
  TO_DO: "to_do",
  DONE: "done",
};

export default function Home() {
  const classes = useStyles();
  const CONFIG = config;

  const [userTasksList, setUserTasksList] = useState(null);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [toDoTasks, setToDoTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [newTaskContent, setNewTaskContent] = useState(null);
  const [openUserInfo, setOpenUserInfo] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [showEditUserInfo, setShowEditUserInfo] = useState(false);

  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const getBoardTasksByBoardId = (boardId) => {
    if (boardId === TASK_STATUS.IN_PROGRESS) return inProgressTasks;
    if (boardId === TASK_STATUS.TO_DO) return toDoTasks;
    if (boardId === TASK_STATUS.DONE) return doneTasks;
  };

  const updateTaskStatus = (oldTask, newStatus) => {
    updateTask(oldTask.taskId, {
      taskContent: oldTask.taskContent,
      taskStatus: newStatus,
      userId: CONFIG.DEFAULT_TEST_USER.userId,
    });
  };

  const updateTaskListState = (boardId, updatedListState) => {
    if (boardId === TASK_STATUS.IN_PROGRESS)
      setInProgressTasks(updatedListState);
    else if (boardId === TASK_STATUS.TO_DO) setToDoTasks(updatedListState);
    else if (boardId === TASK_STATUS.DONE) setDoneTasks(updatedListState);
  };

  const getTasksforBoard = (boardId) => {
    if (boardId === TASK_STATUS.IN_PROGRESS) return inProgressTasks.slice();
    else if (boardId === TASK_STATUS.TO_DO) return toDoTasks.slice();
    else if (boardId === TASK_STATUS.DONE) return doneTasks.slice();
  };

  const updateTaskLists = (
    sourceListId,
    destinationListId,
    startIndex,
    endIndex
  ) => {
    // if the listIds are the same we are reordering within the same board
    if (sourceListId === destinationListId) {
      const sourceList = getTasksforBoard(sourceListId);
      const tempSourceList = sourceList.slice();
      const [removedTask] = sourceList.splice(startIndex, 1);

      sourceList.splice(endIndex, 0, removedTask);

      updateTaskListState(sourceListId, sourceList);
    } else {
      const sourceList = getTasksforBoard(sourceListId);
      const destinationList = getTasksforBoard(destinationListId);
      const tempSourceList = sourceList.slice();

      const [removedTask] = sourceList.splice(startIndex, 1);

      destinationList.splice(endIndex, 0, removedTask);

      // sourceListId and destinationListId match directly 1 to 1 to a task status value (in_progress, to_do, done)
      updateTaskStatus(removedTask, destinationListId);
      updateTaskListState(sourceListId, sourceList);
      updateTaskListState(destinationListId, destinationList);
    }
  };

  const handleOnDragEnd = (data) => {
    if (!data.destination) {
      return;
    }

    updateTaskLists(
      data.source.droppableId,
      data.destination.droppableId,
      data.source.index,
      data.destination.index
    );

    // CONFIG.boards['to_do'].board_tasks = newTaskOrder
    // let newTasks = newTaskOrder.map(taskId => CONFIG.tasks[taskId])
    //
    // setToDoTasks(newTasks);
  };

  const handleAddTask = (content, status) => {
    addTask({
      taskContent: content,
      taskStatus: status,
      userId: CONFIG.DEFAULT_TEST_USER.userId,
    }).then((response) => {
      if (response === "SUCCESS") {
        window.location.reload(true);
      }
    });
  };

  const handleAddNewTaskOnChange = (event) => {
    setNewTaskContent(event.target.value);
  };

  const handleOnNewTaskFieldEnter = (event) => {
    if (event.key == "Enter") {
      handleAddTask(newTaskContent, TASK_STATUS.TO_DO);
    }
  };

  const handleUpdateUserInfo = () => {
    updateUser(CONFIG.DEFAULT_TEST_USER.userId, {
      username:
        updatedUserInfo.username.length >= 1
          ? updatedUserInfo.username
          : userInfo.username,
      email:
        updatedUserInfo.email.length >= 1
          ? updatedUserInfo.email
          : userInfo.email,
      firstName:
        updatedUserInfo.firstName.length >= 1
          ? updatedUserInfo.firstName
          : userInfo.firstName,
      lastName:
        updatedUserInfo.lastName.length >= 1
          ? updatedUserInfo.lastName
          : userInfo.lastName,
    }).then((response) => {
      if (response === "SUCCESS") window.location.reload(true);
    });
  };

  // retrieve tasks and populate board
  useEffect(() => {
    const toDoTasks = [];
    const inProgressTasks = [];
    const doneTasks = [];

    getAllTasks(config.DEFAULT_TEST_USER.userId).then((response) => {
      for (const task of response.data) {
        if (task.taskStatus === TASK_STATUS.TO_DO) toDoTasks.push(task);
        else if (task.taskStatus === TASK_STATUS.IN_PROGRESS)
          inProgressTasks.push(task);
        else if (task.taskStatus === TASK_STATUS.DONE) doneTasks.push(task);
      }

      setToDoTasks(toDoTasks);
      setInProgressTasks(inProgressTasks);
      setDoneTasks(doneTasks);
    });
  }, []);

  // retriever user info
  useEffect(() => {
    getUser(CONFIG.DEFAULT_TEST_USER.userId).then((userData) => {
      setUserInfo(userData);
    });
  }, []);

  return (
    <>
      <Box>
        <Grid container direction="column">
          <Grid>
            <NavBar
              openUserProfile={openUserInfo}
              setOpenProfile={setOpenUserInfo}
              username={userInfo ? userInfo.username : "DEFAULT"}
            />
          </Grid>
          <Container maxWidth={"md"} className={classes.content}>
            <Grid container direction="column">
              <Grid item sx={{ mt: 1, mb: 1 }}>
                <Box
                  boxShadow={2}
                  sx={{ width: "100%", height: "fit-content" }}
                >
                  <TextField
                    id="outlined-basic"
                    label="Add New Task"
                    variant="filled"
                    maxRows={1}
                    sx={{
                      width: "100%",
                      backgroundColor: COLORS.BOARD,
                      borderRadius: 1,
                      input: { color: COLORS.TEXT },
                      label: { color: COLORS.TEXT, fontWeight: 600 },
                    }}
                    size="small"
                    value={newTaskContent}
                    onChange={handleAddNewTaskOnChange}
                    onKeyPress={handleOnNewTaskFieldEnter}
                  />
                </Box>
              </Grid>
              <Grid item container sx={{}} spacing={2}>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  {/*to do board*/}
                  <Grid item container xs={4} className={classes.todoContainer}>
                    <Board
                      data={CONFIG.boards[TASK_STATUS.TO_DO]}
                      tasks={toDoTasks}
                    />
                  </Grid>

                  {/*in progress board*/}
                  <Grid item container xs={4} className={classes.todoContainer}>
                    <Board
                      data={CONFIG.boards[TASK_STATUS.IN_PROGRESS]}
                      tasks={inProgressTasks}
                    />
                  </Grid>

                  {/*done board*/}
                  <Grid item container xs={4} className={classes.todoContainer}>
                    <Board
                      data={CONFIG.boards[TASK_STATUS.DONE]}
                      tasks={doneTasks}
                    />
                  </Grid>
                </DragDropContext>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Box>
      <Dialog open={openUserInfo} onClose={() => setOpenUserInfo(false)}>
        {userInfo ? (
          showEditUserInfo ? (
            <Card>
              <CardHeader title="Editing User Info" />
              <CardContent>
                <Stack spacing={1}>
                  <Stack direction="row">
                    <Typography sx={{ mr: 2, fontWeight: 700 }}>
                      Username:{" "}
                    </Typography>
                    <TextField
                      size="small"
                      defaultValue={userInfo.username}
                      onChange={(event) => {
                        setUpdatedUserInfo({
                          ...updatedUserInfo,
                          username: event.target.value,
                        });
                      }}
                    />
                  </Stack>
                  <Stack direction="row">
                    <Typography sx={{ mr: 6.3, fontWeight: 700 }}>
                      Email:{" "}
                    </Typography>
                    <TextField
                      size="small"
                      defaultValue={userInfo.email}
                      type="email"
                      error={
                        updatedUserInfo
                          ? !updatedUserInfo.email.includes("@") &&
                            (!updatedUserInfo.email.includes(".com") ||
                              !updatedUserInfo.email.includes(".org") ||
                              !updatedUserInfo.email.includes(".edu") ||
                              !updatedUserInfo.email.includes(".gov"))
                          : true
                      }
                      onChange={(event) => {
                        setUpdatedUserInfo({
                          ...updatedUserInfo,
                          email: event.target.value,
                        });
                      }}
                    />
                  </Stack>
                  <Stack direction="row">
                    <Typography sx={{ mr: 2, fontWeight: 700 }}>
                      Firstname:{" "}
                    </Typography>
                    <TextField
                      size="small"
                      defaultValue={userInfo.firstName}
                      onChange={(event) => {
                        setUpdatedUserInfo({
                          ...updatedUserInfo,
                          firstName: event.target.value,
                        });
                      }}
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{ mr: 2, fontWeight: 700 }}>
                      Lastname:{" "}
                    </Typography>
                    <TextField
                      size="small"
                      defaultValue={userInfo.lastName}
                      onChange={(event) => {
                        setUpdatedUserInfo({
                          ...updatedUserInfo,
                          lastName: event.target.value,
                        });
                      }}
                    />
                  </Stack>
                </Stack>
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <Box>
                  <Button
                    color="error"
                    onClick={() => setShowEditUserInfo(false)}
                  >
                    Cancel
                  </Button>
                  <Button color="success" onClick={handleUpdateUserInfo}>
                    Submit
                  </Button>
                </Box>
              </CardActions>
            </Card>
          ) : (
            <Card>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: COLORS.BLUE }}>
                    {userInfo.username[0]}
                  </Avatar>
                }
                title={userInfo.username}
                subheader={userInfo.email}
                sx={{ fontWeight: 700 }}
                action={
                  <IconButton aria-label="settings">
                    <EditIcon
                      color="info"
                      onClick={() => setShowEditUserInfo(true)}
                    />
                  </IconButton>
                }
              />
              <CardContent>
                <Stack direction="row">
                  <Typography sx={{ mr: 2, fontWeight: 700 }}>
                    Firstname:{" "}
                  </Typography>
                  <Typography>{userInfo.firstName}</Typography>
                </Stack>
                <Stack direction="row">
                  <Typography sx={{ mr: 2, fontWeight: 700 }}>
                    Lastname:{" "}
                  </Typography>
                  <Typography>{userInfo.lastName}</Typography>
                </Stack>
              </CardContent>
            </Card>
          )
        ) : (
          <Typography color="error">NO USER INFO</Typography>
        )}
      </Dialog>
    </>
  );
}
