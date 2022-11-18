package com.baboya.tasks;

import com.baboya.tasks.entity.Task;
import com.baboya.tasks.repository.TaskRepository;
import com.baboya.tasks.utils.AppUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TasksApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(TasksApiApplication.class, args);
	}
}