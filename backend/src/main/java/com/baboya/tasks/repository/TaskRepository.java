package com.baboya.tasks.repository;

import com.baboya.tasks.entity.Task;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task, String> {

}
