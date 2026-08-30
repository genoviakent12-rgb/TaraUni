package com.lockbox.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import com.lockbox.backend.model.Carpools;
import com.lockbox.backend.model.User;
import java.time.LocalDate;
import java.time.LocalTime;

public interface CarpoolsRepository extends JpaRepository <Carpools, Long> {
  List<Carpools> findByDate(LocalDate date);
  List<Carpools> findByPassengers(Integer passengers);
  List<Carpools> findByMaxPassenger(Integer maxPassenger);
  List<Carpools> findByOrigin(String origin);
  List<Carpools> findByDestination(String destination);
  List<Carpools> findByTime(LocalTime time);
  List<Carpools> findByUser(User user);
}
