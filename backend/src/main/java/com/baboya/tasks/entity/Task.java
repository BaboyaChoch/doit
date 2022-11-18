package com.baboya.tasks.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "task")
public class Task {

  @Id
  @GeneratedValue(generator="system-uuid")
  @GenericGenerator(name="system-uuid", strategy = "uuid")
  @Column(name= "task_id", nullable = false)
  private String taskId;

  @Column(name = "task_content", nullable = false, length = 500)
  private String taskContent;

  @Column(name = "task_last_updated_on", nullable = false)
  private LocalDateTime taskLastUpdatedOn;

  @Column(name = "task_status", nullable = false, length = 11)
  private String taskStatus;

  public Task() {}

  public Task(String taskContent,String taskStatus) {
    this.taskContent = taskContent;
    this.taskStatus = taskStatus;
    this.taskLastUpdatedOn = LocalDateTime.now();
  }

  public String getTaskId() {
    return taskId;
  }

  public void setTaskId(String newId){
    this.taskId = newId;
  }

  public String getTaskContent() {
    return this.taskContent;
  }

  public void setTaskContent(String taskContent) {
    this.taskContent = taskContent;
  }

  public String getTaskLastUpdatedOn() {
    return this.taskLastUpdatedOn.toString();
  }

  public void setTaskLastUpdatedOn(LocalDateTime dateCreated) {
    this.taskLastUpdatedOn = dateCreated;
  }

  public String getTaskStatus() {
    return this.taskStatus;
  }

  public void setTaskStatus(String taskStatus) {
    this.taskStatus = taskStatus;
  }

  @Override
  public String toString() {
    return "Task{" +
        "id=" + taskId +
        ", taskContent=" + taskContent +
        ", dataCreated=" + taskLastUpdatedOn.toString() +
        ", taskStatus="  + taskStatus +
        "}";
  }
}
