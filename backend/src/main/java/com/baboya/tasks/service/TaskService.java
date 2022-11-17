package com.baboya.tasks.service;

import com.baboya.tasks.entity.Task;
import com.baboya.tasks.utils.AppUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class TaskService {

  private List<Task> tasksList = new ArrayList<>(Arrays.asList(
      new Task(1, "Create task api now!!!", LocalDateTime.now().toString(), AppUtils.Status.IN_PROGRESS),
      new Task(2, "Populate tasks db maybe later :3", LocalDateTime.now().toString(), AppUtils.Status.TO_DO)
  ));

  public String pingTaskService() {
    return "healthy";
  }

  public List<Task> getAllTasks() {
    return tasksList;
  }

  public Task getTask(int id) {
    return tasksList.get(id);
  }

  public void updateTask(int id, Task newTask) {
    for (int i = 0; i < tasksList.size(); i++) {
      if (tasksList.get(i).getTaskId() == id) {
        tasksList.set(i, newTask);
        break;
      }
    }
  }

  public Task updateTask(int id) {
    Task task = tasksList.get(id);
    return task;
  }

  public int addTask(Task task) {
    tasksList.add(task);
    return task.getTaskId();
  }

  public boolean deleteTask(int id) {
    return tasksList.removeIf(task -> task.getTaskId() == id);
  }
}
