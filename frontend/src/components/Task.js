import { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import config from "../lib/config";
import { COLORS } from "../styles/colors";
import TaskAPI from "../lib/TasksApi";

const useStyles = makeStyles({
  root: {
    margin: 8,
    border: "1px solid #2E2E37",
  },
  content: {
    height: "fit-content",
  },
});

export default function Task({ data, taskIndex }) {
  const classes = useStyles();
  const [areActionsShowable, setAreActionsShowable] = useState(false);
  const [openDeleteConfirmDialog, setDeleteConfirmDialog] = useState(false);
  const [openEditTaskDialog, setOpenEditTaskDialog] = useState(false);
  const [newEditedTaskContent, setNewEditedTaskContent] = useState(null);

  const handleTaskDelete = () => {
    setDeleteConfirmDialog(true);
  };

  const handleTaskEdit = () => {
    setNewEditedTaskContent(data.taskContent);
    setOpenEditTaskDialog(true);
  };

  function TaskActions() {
    return areActionsShowable ? (
      <Box sx={{}}>
        <DeleteOutlinedIcon
          fontSize="15"
          sx={{ m: 1 }}
          onClick={handleTaskDelete}
          color="error"
        />
        <EditOutlinedIcon
          fontSize="15"
          sx={{ m: 1, mr: 2 }}
          onClick={handleTaskEdit}
          color="info"
        />
      </Box>
    ) : (
      ""
    );
  }

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

  const handleDialogConfirm = () => {
    if (openDeleteConfirmDialog) {
      TaskAPI.deleteTask(data.taskId, data.userId).then((response) => {
        if (response) {
          window.location.reload(true);
        }
      });
      return;
    }

    if (openEditTaskDialog) {
      if (newEditedTaskContent && newEditedTaskContent.length >= 1) {
        TaskAPI.updateTask(data.taskId, {
          taskContent: newEditedTaskContent,
          taskStatus: data.taskStatus,
          userId: config.DEFAULT_TEST_USER.userId,
        }).then((response) => {
          if (response === "SUCCESS") {
            window.location.reload(true);
          }
        });
      } else {
        alert("No New Task Content. Please Type Something!!!");
      }
      return;
    }
  };

  const TEXT_COLOR = COLORS.TEXT;
  return (
    <>
      <Draggable key={data.taskId} draggableId={data.taskId} index={taskIndex}>
        {(provided, snapshot) => (
          <Card
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={classes.root}
            onMouseEnter={() => setAreActionsShowable(true)}
            onMouseLeave={() => setAreActionsShowable(false)}
            sx={{
              backgroundColor: snapshot.isDragging ? "#e5fce5" : COLORS.TASK,
            }}
          >
            <CardHeader
              sx={{
                backgroundColor: snapshot.isDragging ? "#e5fce5" : COLORS.TASK,
                p: 0,
              }}
              action={TaskActions()}
            ></CardHeader>
            <CardContent
              className={classes.content}
              sx={{
                backgroundColor: snapshot.isDragging ? "#e5fce5" : COLORS.TASK,
              }}
            >
              <Typography
                sx={{
                  fontSize: 15,
                  wordBreak: "break-word",
                  color: TEXT_COLOR,
                  fontWeight: 500,
                  mb: 2,
                }}
              >
                {data.taskContent}
              </Typography>
              <Typography
                sx={{
                  alignSelf: "flex-end",
                  justifySelf: "end",
                  mb: -3,
                  fontSize: 10,
                  fontWeight: 600,
                  color: BOARD_CONFIG[data.taskStatus].titleColor,
                }}
              >
                {data.taskLastUpdatedOn}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Draggable>

      {/*confirm delete and edit  dialog*/}
      <Dialog
        open={openDeleteConfirmDialog || openEditTaskDialog}
        onClose={() => {
          if (openDeleteConfirmDialog) {
            setDeleteConfirmDialog(false);
            return;
          }

          if (openEditTaskDialog) {
            setNewEditedTaskContent(null);
            setOpenEditTaskDialog(false);
            return;
          }
        }}
        maxWidth={"sm"}
        sx={{ maxWidth: 350, left: "42.2%" }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            fontSize: 15,
            textAlign: "center",
          }}
        >
          {openDeleteConfirmDialog && !openEditTaskDialog
            ? "Are you sure you want to delete the below task?"
            : null}
          {openEditTaskDialog && !openDeleteConfirmDialog
            ? "Editing Task"
            : null}
        </DialogTitle>
        <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {openDeleteConfirmDialog && !openEditTaskDialog ? (
              <Typography
                sx={{
                  fontSize: 12,
                  wordBreak: "break-word",
                  color: "black",
                }}
                textAlign="center"
              >
                {`" ${data.taskContent} "`}
              </Typography>
            ) : null}
            {openEditTaskDialog && !openDeleteConfirmDialog ? (
              <TextareaAutosize
                value={newEditedTaskContent}
                onChange={(event) => {
                  setNewEditedTaskContent(event.target.value);
                }}
                minRows={5}
                sx={{}}
              />
            ) : null}
          </Box>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <CancelIcon
            color={"error"}
            sx={{ m: 0.3 }}
            onClick={() => {
              if (openDeleteConfirmDialog) {
                setDeleteConfirmDialog(false);
                return;
              }

              if (openEditTaskDialog) {
                setOpenEditTaskDialog(false);
                return;
              }
            }}
          />
          <ThumbUpAltIcon
            color={"success"}
            sx={{ m: 0.3 }}
            onClick={handleDialogConfirm}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
