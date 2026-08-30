package com.lockbox.backend.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "carpools")
public class Carpools {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id; 

  private LocalTime time;
  private LocalDate date; 
  private Integer passengers; 
  private Integer maxPassenger;
  private Integer price;
  private String status; 
  private String origin;
  private String destination;
  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;
}
