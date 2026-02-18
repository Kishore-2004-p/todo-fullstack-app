package com.kishore.todo.controller;

import com.kishore.todo.model.Todo;
import com.kishore.todo.repository.TodoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    private final TodoRepository repo;

    public TodoController(TodoRepository repo) {
        this.repo = repo;
    }

    // GET ALL
    @GetMapping
    public List<Todo> getAll() {
        return repo.findAll();
    }

    // CREATE
    @PostMapping
    public Todo create(@RequestBody Todo todo) {
        return repo.save(todo);
    }

    // UPDATE  ⭐ IMPORTANT
    @PutMapping("/{id}")
    public Todo update(@PathVariable Long id, @RequestBody Todo updatedTodo) {
        return repo.findById(id)
                .map(todo -> {
                    todo.setTitle(updatedTodo.getTitle());
                    todo.setDescription(updatedTodo.getDescription());
                    todo.setCompleted(updatedTodo.isCompleted());
                    return repo.save(todo);
                })
                .orElseThrow(() -> new RuntimeException("Todo not found"));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
