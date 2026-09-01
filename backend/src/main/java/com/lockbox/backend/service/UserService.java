package com.lockbox.backend.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.lockbox.backend.model.User;
import com.lockbox.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {
  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;

  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
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

  public Optional<User> findUserByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  public User addUser(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            return null;
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User authenticate(String email, String rawPassword) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            return null;
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            return null;
        }

        return user;
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

  public User updatePassword(Long id, String password) {
    Optional<User> optionalUser = userRepository.findById(id);

    if (!optionalUser.isPresent()) {
      return null;
    }

    User user = optionalUser.get();
    user.setPassword(password);
    return userRepository.save(user);
  }
}