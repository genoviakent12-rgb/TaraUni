package com.lockbox.backend.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lockbox.backend.model.User;
import com.lockbox.backend.service.UserService;

import java.util.Optional;

import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/users")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/{id}")
  public ResponseEntity<User> getUserById(@PathVariable Long id) {
      Optional<User> user = Optional.ofNullable(userService.findUserById(id)); 
      return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
  }

  @PostMapping
  public User addUser(@RequestBody User user) { 
    return userService.addUser(user); 
  }

  @PutMapping("/{id}")
  public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) { 
    User existingUser = userService.findUserById(id); 
    if ( existingUser != null) {
      // Update the existing user with the new data
      existingUser.setFirstName(user.getFirstName());
      existingUser.setLastName(user.getLastName());
      existingUser.setEmail(user.getEmail());
      userService.addUser(existingUser);
      return ResponseEntity.ok(existingUser);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<User> deleteUserById(@PathVariable Long id) {
      User user = userService.findUserById(id);
      if (user != null) {
          userService.deleteUser(id);
          return ResponseEntity.ok(user);
      } else {
          return ResponseEntity.notFound().build();
      }
  }
}