package com.baboya.tasks.config;


import com.baboya.tasks.utils.AppUtils;
import com.baboya.tasks.utils.AppUtils.TaskStatusOptions;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class SpringConfiguration {

  @Bean
  @Qualifier(QualifierKeys.TASK_STATUS_OPTIONS_QUALIFIER_KEY)
  List<String> getTaskStatusOptions() {
    return Arrays.asList(
        TaskStatusOptions.TO_DO,
        TaskStatusOptions.IN_PROGRESS,
        TaskStatusOptions.DONE
    );
  }

  public static class QualifierKeys {
    final public static String TASK_STATUS_OPTIONS_QUALIFIER_KEY = "taskStatusOptions";
  }
}
