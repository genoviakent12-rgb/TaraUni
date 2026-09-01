package com.lockbox.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.lockbox.backend.model.User;
import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findById(Long id);
  List<User> findByFirstName(String firstName);
  List<User> findByLastName(String lastName);
  Optional<User> findByEmail(String email);
}
