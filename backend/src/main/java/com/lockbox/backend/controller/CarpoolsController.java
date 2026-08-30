package com.lockbox.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lockbox.backend.service.CarpoolsService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.lockbox.backend.model.Carpools;

@RestController
@RequestMapping("/carpools")
public class CarpoolsController {

  private final CarpoolsService carpoolsService;

  public CarpoolsController(CarpoolsService carpoolsService) {
    this.carpoolsService = carpoolsService;
  }

  // Get all carpools
  @GetMapping
  public ResponseEntity<Iterable<Carpools>> getAllCarpools() {
    return ResponseEntity.ok(carpoolsService.findAllCarpools());
  }

  // Get carpool by ID
  @GetMapping("/{id}")
  public ResponseEntity<Carpools> getCarpoolById(@PathVariable Long id) {

    Carpools carpool = carpoolsService.findCarpoolById(id);

    if (carpool == null) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(carpool);
  }

  // Create carpool
  @PostMapping
  public ResponseEntity<Carpools> addCarpool(
      @RequestBody Carpools carpool) {

    Carpools newCarpool = carpoolsService.addCarpool(carpool);

    return ResponseEntity.ok(newCarpool);
  }

  // Join carpool
  @PostMapping("/{id}/join")
  public ResponseEntity<Carpools> joinCarpool(
      @PathVariable Long id) {

    Carpools carpool = carpoolsService.joinCarpool(id, null);

    if (carpool == null) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(carpool);
  }

  // Delete carpool
  @DeleteMapping("/{id}")
  public ResponseEntity<Carpools> deleteCarpool(
      @PathVariable Long id) {

    Carpools carpool = carpoolsService.deleteCarpool(id, null);

    if (carpool == null) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(carpool);
  }
}