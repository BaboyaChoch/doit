package com.baboya.tasks.entity;

import com.baboya.tasks.utils.AppUtils.Status;

/*
*
* CREATE TABLE task(
    task_id varchar(200),
    task_content varchar(500),
    date_created datetime,
    task_status varchar(11),
    primary key (task_id)
);
* */

public class Task {
  private int taskId;
  private String taskContent;
  private String dateCreated;
  private String taskStatus;

  public Task(int taskId, String taskContent, String dateCreated, String taskStatus) {
    this.taskId = taskId;
    this.taskContent = taskContent;
    this.dateCreated = dateCreated;
    this.taskStatus = taskStatus;
  }

  public int getTaskId() {
    return this.taskId;
  }


  public void setTaskId(int taskId) {
    this.taskId = taskId;
  }

  public String getTaskContent() {
    return this.taskContent;
  }

  public void setTaskContent(String taskContent) {
    this.taskContent = taskContent;
  }

  public String getDateCreated() {
    return this.dateCreated;
  }

  public void setDateCreated(String dateCreated) {
    this.dateCreated = dateCreated;
  }

  public String getTaskStatus() {
    return this.taskStatus;
  }

  public void setTaskStatus(String taskStatus) {
    this.taskStatus = taskStatus;
  }
}
