package com.baboya.tasks.controller;

import com.baboya.tasks.entity.Task;
import com.baboya.tasks.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
  public List<Task> getAllTasks() {
    return taskService.getAllTasks();
  }

  @RequestMapping(value = "/getTask/taskId={id}")
  public Task getTask(@PathVariable int id){
    return taskService.getTask(id);
  }

  @RequestMapping(method=RequestMethod.POST, value = "/addTask")
  public int addTask(@RequestBody Task task) {
    return taskService.addTask(task);
  }

  @RequestMapping(method=RequestMethod.PUT, value = "/updateTask/taskId={id}")
  public void updateTask(@PathVariable int id, @RequestBody Task task) {
    taskService.updateTask(id, task);
  }

  @RequestMapping(method=RequestMethod.DELETE, value = "/deleteTask/taskId={id}")
  public boolean deleteTask(@PathVariable int id) {
    return taskService.deleteTask(id);
  }
}