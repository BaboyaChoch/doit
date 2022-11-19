package com.baboya.tasks.repository;

import com.baboya.tasks.entity.Task;
import org.springframework.data.repository.CrudRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface TaskRepository extends CrudRepository<Task, String> {
  Iterable<Task> findAllByUserIdEquals(String userId);
  Optional<Task> findTaskByTaskIdAndUserId(String taskId, String userId);
}
