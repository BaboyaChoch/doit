package com.baboya.tasks.controller;

import com.baboya.tasks.entity.Task;
import com.baboya.tasks.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(value = "/tasks")
public class TaskController {
  @Autowired
  private TaskService taskService;

  @RequestMapping(value ="/ping")
  public String healthCheck (){
    return taskService.pingTaskService();
  }

  @RequestMapping(value = "/getAllTasks")
  public Iterable<Task> getAllTasks() {
    return taskService.getAllTasks();
  }

  @RequestMapping(value = "/getTask/taskId={id}")
  public Optional<Task> getTask(@PathVariable String id){
    return taskService.getTask(id);
  }

  @RequestMapping(method=RequestMethod.POST, value = "/addTask")
  public String addTask(@RequestBody Task task) {
    return taskService.addTask(task);
  }

  @RequestMapping(method=RequestMethod.PUT, value = "/updateTask/taskId={id}")
  public Task updateTask(@PathVariable String id, @RequestBody Task task) {
    return taskService.updateTask(id, task);
  }

  @RequestMapping(method=RequestMethod.DELETE, value = "/deleteTask/taskId={id}")
  public boolean deleteTask(@PathVariable String id) {
    return taskService.deleteTask(id);
  }
}