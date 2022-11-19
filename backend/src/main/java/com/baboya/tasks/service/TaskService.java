package com.baboya.tasks.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.baboya.tasks.GenericApiResponse;
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

  public GenericApiResponse getAllTasks(String userId) {
    return new GenericApiResponse<Iterable<Task>>(taskRepository.findAllByUserIdEquals(userId));
  }

  public GenericApiResponse getTask(String taskId, String userId) {
    return new GenericApiResponse(taskRepository.findTaskByTaskIdAndUserId(taskId, userId));
  }

  public GenericApiResponse updateTask(String id, Task newTask) {

    Optional<Task> currentTask = (Optional<Task>) getTask(id, newTask.getUserId()).getData();
    System.out.println("ATTEMPTING TO UPDATE: " + currentTask.get()
        + " NEW_TASK CONTENT IS: " + newTask.getTaskContent()
        + " NEW_TASK STATUS IS: " + newTask.getTaskStatus()
        + " NEW_TASK USERID IS: " + newTask.getUserId()
    );

    if (currentTask.isPresent()) {
      Task updatedTask = currentTask.get();

      if (taskStatusOptions.contains(newTask.getTaskStatus())
          && newTask.getUserId().equals(updatedTask.getUserId())) {
        updatedTask.setTaskContent(newTask.getTaskContent());
        updatedTask.setTaskStatus(newTask.getTaskStatus());
        updatedTask.setTaskLastUpdatedOn(LocalDateTime.now());
        taskRepository.save(updatedTask);

        return new GenericApiResponse(updatedTask);
      }
    }
    return new GenericApiResponse(null);
  }

  public GenericApiResponse addTask(Task task) {
    Task newTask = new Task(task.getTaskContent(), task.getTaskStatus(), task.getUserId());
    taskRepository.save(newTask);
    return new GenericApiResponse(newTask.getTaskId());
  }

  public GenericApiResponse deleteTask(String taskId, String userId) {
    Optional<Task> taskToDelete = (Optional<Task>) getTask(taskId, userId).getData();
    if (taskToDelete.isPresent()) {
      taskRepository.delete(taskToDelete.get());
      return new GenericApiResponse(true);
    }
    return new GenericApiResponse(false);
  }
}
