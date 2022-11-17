package com.baboya.tasks.config;


import com.baboya.tasks.service.TaskService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfiguration {

  public static class QualifierKeys {
    final public static String TASK_SERVICE_KEY = "taskService";
  }
}
