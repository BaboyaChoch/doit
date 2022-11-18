package com.baboya.tasks.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "user")
public class User {

  @Id
  @GeneratedValue(generator="system-uuid")
  @GenericGenerator(name="system-uuid", strategy = "uuid")
  @Column(name= "user_id", nullable = false)
  private String userId;

  @Column(name = "username", nullable = false, length = 500)
  private String username;

  @Column(name = "email", nullable = false, length = 500)
  private String email;

  @Column(name = "first_name", nullable = false, length = 500)
  private String firstName;

  @Column(name = "last_name", nullable = false, length = 500)
  private String lastName;

  public User() {}

  public User(String username, String email, String firstName, String lastName) {
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public String getUserId() {
    return userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  @Override
  public String toString() {
    return "User{" +
        "userId=" + userId +
        ", username=" + username +
        ", email=" + email +
        ", firstName="  + firstName +
        ", lastName="  + lastName +
        "}";
  }
}
