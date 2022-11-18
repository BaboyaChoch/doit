package com.baboya.tasks.controller;

import com.baboya.tasks.entity.User;
import com.baboya.tasks.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(value = "/users")
public class UserController {

  @Autowired
  UserService userService;

  @RequestMapping(method = RequestMethod.GET, value ="/ping")
  public String healthCheck (){
    return userService.pingUserService();
  }

  @RequestMapping(method = RequestMethod.GET, value ="/getUser/userId=id")
  public Optional<User> getUser (@PathVariable String id) {
    return userService.getUser(id);
  }

  @RequestMapping(method = RequestMethod.POST, value ="/addUser")
  public User addUser(@RequestBody User user) {
    return userService.addUser(user);
  }
}
