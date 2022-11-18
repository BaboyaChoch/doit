package com.baboya.tasks.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.baboya.tasks.config.SpringConfiguration.QualifierKeys;
import com.baboya.tasks.entity.Task;
import com.baboya.tasks.repository.TaskRepository;

@Service
public class TaskService {

  @Autowired
  private TaskRepository taskRepository;

  @Autowired
  @Qualifier(QualifierKeys.TASK_STATUS_OPTIONS_QUALIFIER_KEY)
  private List<String> taskStatusOptions;

  private static final String BAD_STATUS_VALUE_PASSED = "UPDATE FAILURE: taskStatus must be one of 'to_do', 'in_progress', or 'done'";

  public String pingTaskService() {
    return "healthy";
  }

  public Iterable<Task> getAllTasks() {
    return taskRepository.findAll();
  }

  public Optional<Task> getTask(String id) {
    return taskRepository.findById(id);
  }

  public Task updateTask(String id, Task newTask) {
    Optional<Task> currentTask = getTask(id);
    System.out.println("ATTEMPTING TO UPDATE: " + currentTask.get()
        + " NEW_TASK CONTENT IS: " + newTask.getTaskContent()
        + " NEW_TASK STATUS IS: " + newTask.getTaskStatus()
    );
    if (!currentTask.isEmpty()) {
      Task updatedTask = currentTask.get();

      if (taskStatusOptions.contains(newTask.getTaskStatus())) {
        updatedTask.setTaskContent(newTask.getTaskContent());
        updatedTask.setTaskStatus(newTask.getTaskStatus());
        updatedTask.setTaskLastUpdatedOn(LocalDateTime.now());
        taskRepository.save(updatedTask);

        return updatedTask;
      }
    }
    return null;
  }

  public String addTask(Task task) {
    Task newTask = new Task(task.getTaskContent(), task.getTaskStatus());
    taskRepository.save(newTask);
    return newTask.getTaskId();
  }

  public boolean deleteTask(String id) {
    if (taskRepository.existsById(id)) {
      taskRepository.deleteById(id);
      return true;
    }
    return false;
  }
}
