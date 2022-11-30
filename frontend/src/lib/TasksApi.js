const API_ENDPOINT_URL =
  "http://doitwebappapi-env.eba-pmqdmhyu.us-east-2.elasticbeanstalk.com";
function getAllTasks(userId) {
  return fetch(`${API_ENDPOINT_URL}/tasks/getAllTasks/userId=${userId}`, {
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
  return fetch(`${API_ENDPOINT_URL}/tasks/updateTask/taskId=${taskId}`, {
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
    `${API_ENDPOINT_URL}/tasks/getTask/userId=${userId}/taskId=${taskId}`,
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
  return fetch(`${API_ENDPOINT_URL}/tasks/addTask`, {
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
    `${API_ENDPOINT_URL}/tasks/deleteTask/userId=${userId}/taskId=${taskId}`,
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
  return fetch(`${API_ENDPOINT_URL}/users/getUser/userId=${userId}`, {
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
  return fetch(`${API_ENDPOINT_URL}/users/updateUser/userId=${userId}`, {
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

const TaskAPI = {
  getAllTasks: (userId) => getAllTasks(userId),
  updateTask: (taskId, newTaskData) => updateTask(taskId, newTaskData),
  getTask: (taskId, userId) => getTask(taskId, userId),
  addTask: (task) => addTask(task),
  deleteTask: (taskId, userId) => deleteTask(taskId, userId),
  getUser: (userId) => getUser(userId),
  updateUser: (userId, newUserInfo) => updateUser(userId, newUserInfo),
};

export default TaskAPI;
