package com.baboya.tasks.repository;

import com.baboya.tasks.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {
}
