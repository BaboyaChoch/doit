async function getAllTasks(userId) {
  return fetch(`http://localhost:5000/tasks/getAllTasks/userId=${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    });
}

function updateTask(taskId, newTaskData) {
  return fetch(`http://localhost:5000/tasks/updateTask/taskId=${taskId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTaskData), // body data type must match "Content-Type"
  })
    .then((response) => response.json())
    .then((responseData) => {
      return responseData.data;
    });
}

async function getTask(taskId, userId) {
  return fetch(
    `http://localhost:5000/tasks/getTask/userId=${userId}/taskId=${taskId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    });
}

function addTask(task) {
  return fetch(`http://localhost:5000/tasks/addTask`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task), // body data type must match "Content-Type"
  })
    .then((response) => response.json())
    .then((responseData) => {
      return responseData.data;
    });
}

function deleteTask(taskId, userId) {
  return fetch(
    `http://localhost:5000/tasks/deleteTask/userId=${userId}/taskId=${taskId}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((responseData) => {
      return responseData.data;
    });
}

function getUser(userId) {
  return fetch(`http://localhost:5000/users/getUser/userId=${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((responseData) => {
      return responseData.data;
    })
    .catch((e) => console.log("Error Retrieving User Info: ", e));
}

function updateUser(userId, newUserInfo) {
  return fetch(`http://localhost:5000/users/updateUser/userId=${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserInfo), // body data type must match "Content-Type"
  })
    .then((response) => response.json())
    .then((responseData) => {
      return responseData.data;
    });
}

module.exports = {
  getAllTasks,
  updateTask,
  getTask,
  addTask,
  deleteTask,
  getUser,
  updateUser,
};
