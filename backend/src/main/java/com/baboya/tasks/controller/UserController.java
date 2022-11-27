package com.baboya.tasks.controller;

import com.baboya.tasks.GenericApiResponse;
import com.baboya.tasks.entity.Task;
import com.baboya.tasks.entity.User;
import com.baboya.tasks.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "/users")
public class UserController {

  @Autowired
  UserService userService;

  @RequestMapping(value ="/ping")
  public String healthCheck (){
    return userService.pingUserService();
  }

  @RequestMapping(method = RequestMethod.GET, value ="/getUser/userId={id}")
  public GenericApiResponse getUser (@PathVariable String id) {
    return userService.getUser(id);
  }

  @RequestMapping(method = RequestMethod.POST, value ="/addUser")
  public GenericApiResponse addUser(@RequestBody User user) {
    return userService.addUser(user);
  }

  @RequestMapping(method=RequestMethod.PUT, value = "/updateUser/userId={id}")
  public GenericApiResponse updateTask(@PathVariable String id, @RequestBody User user) {
    return userService.updateUser(id, user);
  }
}
