package com.baboya.tasks.entity;

import javax.persistence.*;

@Entity(name = "directory")
public class Directory {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @Column(name = "directory_entry_id", nullable = false)
  private Long id;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "task_id", referencedColumnName = "task_id")
  private Task task;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "user_id", referencedColumnName = "user_id")
  private User user;

  public Directory() {}

  public Directory(User user, Task task) {
    this.task = task;
    this.user = user;
  }

  @Override
  public String toString() {
    return "Directory{" +
        "taskId=" + task.getTaskId() +
        ", userId=" + user.getUserId() +
        "}";
  }
}

