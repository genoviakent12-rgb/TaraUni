package com.lockbox.backend.service;

import java.time.LocalDate;
import java.util.List;

import java.util.Optional;
import org.springframework.stereotype.Service;

import com.lockbox.backend.model.Carpools;
import com.lockbox.backend.repository.CarpoolsRepository;

@Service
public class CarpoolsService {

  private final CarpoolsRepository carpoolsRepository; 

  public CarpoolsService ( CarpoolsRepository carpoolsRepository) { 
    this.carpoolsRepository = carpoolsRepository;
  }

  // find all carpools
  public Iterable<Carpools> findAllCarpools() {
    return carpoolsRepository.findAll();
  }

  //find carpool by id
  public Carpools findCarpoolById(Long id) {
    return carpoolsRepository.findById(id).orElse(null);
  }

  // find carpools by date
  public List<Carpools> findCarpoolsByDate(LocalDate date) {
    return carpoolsRepository.findByDate(date);
  }

  // find carpools by passengers
  public List<Carpools> findCarpoolsByPassengers(int passengers) {
    return carpoolsRepository.findByPassengers(passengers);
  }

  // add carpool
  public Carpools addCarpool(Carpools carpool) {
    return carpoolsRepository.save(carpool);
  }

  //join carpool
  public Carpools joinCarpool(Long id, Long userId) {
    Optional<Carpools> optional = carpoolsRepository.findById(id);
    if (optional.isEmpty()) {
      return null;
    }

    Carpools carpool = optional.get();
    if (carpool.getPassengers() >= carpool.getMaxPassenger()) { 
      return null;
    }

    carpool.setPassengers(carpool.getPassengers() + 1);

    if (carpool.getPassengers().equals(carpool.getMaxPassenger())) {
      carpool.setStatus("Full");
    }

    return carpoolsRepository.save(carpool);
  }

  // delete carpool
  public boolean deleteCarpoolBool(Long id, Long userId) {
    Optional<Carpools> optional = carpoolsRepository.findById(id);
    if (optional.isEmpty()) { 
      return false; 
    }
  
    Carpools carpool = optional.get();
    
    if (
      carpool.getUser() == null || 
      !carpool.getUser().getId().equals(userId)
    ) { 
      return false; 
    }

    carpoolsRepository.delete(carpool);
    return true;
  }

  public Carpools deleteCarpool(Long id, Long userId) {
    Optional<Carpools> optional = carpoolsRepository.findById(id);
    if (optional.isEmpty()) {
      return null;
    }

    Carpools carpool = optional.get();

    if (
      carpool.getUser() == null ||
      !carpool.getUser().getId().equals(userId)
    ) {
      return null;
    }

    carpoolsRepository.delete(carpool);
    return carpool;
  }

}
