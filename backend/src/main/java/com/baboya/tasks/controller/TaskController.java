package com.baboya.tasks.controller;

import com.baboya.tasks.GenericApiResponse;
import com.baboya.tasks.entity.Task;
import com.baboya.tasks.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin
@RestController
@RequestMapping(value = "/tasks")
public class TaskController {
  @Autowired
  private TaskService taskService;

  @RequestMapping(method = RequestMethod.GET, value ="/ping")
  public String healthCheck (){
    return taskService.pingTaskService();
  }

  @RequestMapping(method = RequestMethod.GET, value = "/getAllTasks/userId={id}")
  public GenericApiResponse getAllTasks(@PathVariable String id) {
    return taskService.getAllTasks(id);
  }

  @RequestMapping(method = RequestMethod.GET, value = "/getTask/userId={userId}/taskId={taskId}")
  public GenericApiResponse getTask(@PathVariable String userId, @PathVariable String taskId){
    return taskService.getTask(taskId, userId);
  }

  @RequestMapping(method=RequestMethod.POST, value = "/addTask")
  public GenericApiResponse addTask(@RequestBody Task task) {
    return taskService.addTask(task);
  }

  @RequestMapping(method=RequestMethod.PUT, value = "/updateTask/taskId={id}")
  public GenericApiResponse updateTask(@PathVariable String id, @RequestBody Task task) {
    return taskService.updateTask(id, task);
  }

  @RequestMapping
      (method=RequestMethod.DELETE, value = "/deleteTask/userId={userId}/taskId={taskId}")
  public GenericApiResponse deleteTask(@PathVariable String taskId, @PathVariable String userId) {
    return taskService.deleteTask(taskId, userId);
  }
}