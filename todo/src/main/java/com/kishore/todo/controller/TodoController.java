package com.kishore.todo.controller;

import com.kishore.todo.model.Todo;
import com.kishore.todo.repository.TodoRepository;
import org.springframework.http.ResponseEntity;
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

    // GET all todos
    @GetMapping
    public List<Todo> getAll() {
        return repo.findAll();
    }

    // CREATE todo
    @PostMapping
    public Todo create(@RequestBody Todo todo) {
        return repo.save(todo);
    }

    // DELETE todo (SAFE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {

        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
