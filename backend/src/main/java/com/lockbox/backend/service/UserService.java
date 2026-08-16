package com.lockbox.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.lockbox.backend.model.User;
import com.lockbox.backend.repository.UserRepository;

@Service
public class UserService {
  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  //FIND ALL USERS USING ID
  public Iterable<User> findAll() {
    return userRepository.findAll(); 
  }

  public User findUserById(Long id) {
    return userRepository.findById(id).orElse(null);
  }

  public User getName(Long id) {
    return userRepository.findById(id).orElse(null);
  }

  public List<User> findUserByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  public User addUser(User user) { 
    return userRepository.save(user);
  }

  public User deleteUser(Long id) { 
    Optional<User> optionalUser = userRepository.findById(id);

    if(!optionalUser.isPresent()) {
      return null;
    }

    User user = optionalUser.get();
    userRepository.delete(user);
    return user;
  }
}