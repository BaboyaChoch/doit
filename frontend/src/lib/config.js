const config = {
  tasks: {
    't1': {
      task_id: 't1',
      task_content: 'this is the first task in my dnd app',
      task_date_created: '11/07/2022 17:12:12',
      task_status: 'in_progress'
    },
    't2': {
      task_id: 't2',
      task_content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do  tempor incididunt ut labore et dolore magna aliqua. Id donec ultrices tincidunt arcu.',
      task_date_created: '11/07/2022 17:123:32',
      task_status: 'to_do'
    },
    't3': {
      task_id: 't3',
      task_content: 'her loss is fire',
      task_date_created: '11/05/2022 21:52:17',
      task_status: 'to_do'
    }
  },
  boards: {
    'to_do': {
      'board_id': 'to_do',
      'board_title': 'To Do',
    }
  },
  boardOrder: ['to_do']
}

export default config