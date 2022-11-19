package com.baboya.tasks.service;

import com.baboya.tasks.GenericApiResponse;
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

  public GenericApiResponse addUser(User user) {
    User newUser = new User(
        user.getUsername(),
        user.getEmail(),
        user.getFirstName(),
        user.getLastName()
    );
    userRepository.save(newUser);
    return new GenericApiResponse(newUser);
  }

  public GenericApiResponse getUser(String id) {
    return new GenericApiResponse(userRepository.findById(id));
  }
}
