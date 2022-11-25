async function getAllTasks(userId) {
  return fetch(`http://localhost:5000/tasks/getAllTasks/userId=${userId}`,{
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }})
    .then(response => response.json())
    .then((responseData) => {
      console.log(responseData.data)
      return responseData
    });
}

function updateTask (taskId, newTaskData) {
  fetch(`http://localhost:5000/tasks/updateTask/taskId=${taskId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTaskData) // body data type must match "Content-Type"
  })
    .then(response => response.json())
    .then(responseData => console.log(responseData))
}

async function getTask(taskId, userId) {

    return fetch(`http://localhost:5000/tasks/getTask/userId=${userId}/taskId=${taskId}`,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }})
      .then(response => response.json())
      .then((responseData) => {
        console.log(responseData.data)
        return responseData
      });

}
module.exports =  {
  getAllTasks,
  updateTask,
  getTask
}