const config = {
  tasks: {
    't1': {
      taskId: 't1',
      taskContent: 'this is the first task in my dnd app',
      taskLastUpdatedOn: '11/07/2022 17:12:12',
      taskStatus: 'in_progress',
      userId: "9773bc40-0d4b-4bdb-8af8-c0e7df6f"
    },
    't2': {
      taskId: 't2',
      taskContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do  tempor' +
        ' incididunt ut labore et dolore magna aliqua. Id donec ultrices tincidunt arcu.',
      taskLastUpdatedOn: '11/07/2022 17:123:32',
      taskStatus: 'to_do',
      userId: "9773bc40-0d4b-4bdb-8af8-c0e7df6f"
    },
    't3': {
      taskId: 't3',
      taskContent: 'her loss is fire',
      taskLastUpdatedOn: '11/05/2022 21:52:17',
      taskStatus: 'to_do',
      userId: "9773bc40-0d4b-4bdb-8af8-c0e7df6f"
    }
  },
  boards: {
    'to_do': {
      'board_id': 'to_do',
      'board_title': 'To Do',
      'board_tasks': ['t2', 't3']
    },
    'in_progress': {
      'board_id': 'in_progress',
      'board_title': 'In Progress',
      'board_tasks': ['t1']
    },
    'done': {
      'board_id': 'done',
      'board_title': 'Done',
      'board_tasks': []
    }
  },
  boardOrder: ['to_do', 'in_progress', 'done'],
  DEFAULT_TEST_USER: {
    "userId": "9773bc40-0d4b-4bdb-8af8-c0e7df6f",
    "username": "imfirstlol",
    "email": null,
    "firstName": null,
    "lastName": null
  }
}

export default config