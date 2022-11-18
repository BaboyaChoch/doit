package com.baboya.tasks.service;

import com.baboya.tasks.entity.User;
import com.baboya.tasks.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
  @Autowired
  UserRepository userRepository;

  public String pingUserService() {
    return  "healthy";
  }

  public User addUser(User user) {
    User newUser = new User(
        user.getUsername(),
        user.getEmail(),
        user.getFirstName(),
        user.getLastName()
    );
    userRepository.save(newUser);
    return newUser;
  }

  public Optional<User> getUser(String id) {
    return userRepository.findById(id);
  }
}
