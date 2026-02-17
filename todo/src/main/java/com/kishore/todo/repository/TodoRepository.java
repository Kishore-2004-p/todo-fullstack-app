package com.kishore.todo.repository;

import com.kishore.todo.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findByCompleted(boolean completed);

}
