package com.baboya.tasks.service;

import com.baboya.tasks.GenericApiResponse;
import com.baboya.tasks.entity.Task;
import com.baboya.tasks.entity.User;
import com.baboya.tasks.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

  public GenericApiResponse updateUser(String id, User user) {
    Optional<User> currentUser = (Optional<User>) getUser(id).getData();

    if (currentUser.isPresent()) {

      User updatedUser = currentUser.get();

      if (!updatedUser.getUsername().equals(user.getUsername()))
        updatedUser.setUsername(user.getUsername());

      if (!updatedUser.getEmail().equals(user.getEmail()))
        updatedUser.setEmail(user.getEmail());

      if (!updatedUser.getFirstName().equals(user.getFirstName()))
        updatedUser.setFirstName(user.getFirstName());

      if (!updatedUser.getLastName().equals(user.getLastName()))
        updatedUser.setLastName(user.getLastName());

      userRepository.save(updatedUser);
      return new GenericApiResponse("SUCCESS");
    }
    return new GenericApiResponse(null);
  }
}
