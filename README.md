# TaraUni

A full-stack student transportation platform that enables university students to create, discover, and join carpools while finding convenient transportation routes around campus.

TaraUni connects students by providing an easy way to organize shared rides, search for transportation options, and plan journeys using location-based services. The application combines a React Native mobile interface with a Spring Boot REST API backend and PostgreSQL database to deliver a scalable full-stack experience.

---

# Overview

Finding reliable and convenient transportation to university can often be difficult due to limited public transportation options, scheduling conflicts, long walking distances, and unexpected delays.

TaraUni aims to address these challenges by providing a centralized platform where students can:

- Create and manage carpools
- Discover available carpools
- Join carpools created by other students
- Search for locations using Google Maps and Places services
- Calculate routes and travel distances
- View transportation options based on their current location
- Receive AI-powered transportation assistance
- Manage their transportation preferences and journeys

---

# Application Screenshots - Documentation

https://docs.google.com/document/d/1hWY4cykujLEIEq4gKx8ZRyDWc7g4vQOC3u3OvMgOL5o/edit?usp=sharing

---

# Key Features

## Carpool Management

TaraUni allows students to organize shared transportation by providing:

- Create carpools with custom details
- Specify origin and destination
- Set travel date and time
- Set the number of available passenger spaces
- Set a price per passenger
- View available carpools
- Join existing carpools
- Manage created carpools
- Delete created carpools

---

## Transportation & Route Planning

Integrated with Google Maps and location-based services to provide:

- Current location detection
- Destination search
- Route calculation
- Walking distance information
- Travel distance
- Estimated travel time
- Map-based route visualization
- Transportation planning

The transportation system is designed to help students determine convenient routes and make better decisions when travelling to and from university.

---

## AI-Powered Transportation Assistant

TaraUni integrates an AI-powered chatbot to provide users with a more intuitive way to search for transportation information.

The AI assistant can help users:

- Search for transportation options conversationally
- Ask questions about their journey
- Receive transportation-related recommendations
- Interact with the application using natural language

The AI functionality is integrated with the backend through an AI API service.

---

## Location Services

TaraUni uses location-based services to improve the transportation experience.

Features include:

- Detecting the user's current location
- Selecting pickup locations
- Selecting destinations
- Searching for places
- Displaying locations on a map
- Calculating routes between locations

---

## Mobile Application

Built with React Native and Expo, providing:

- Cross-platform mobile experience
- Responsive user interface
- Modern navigation
- Reusable components
- Location-aware functionality
- Interactive maps
- API integration
- Context-based state management

---

# System Architecture

TaraUni follows a client-server architecture:

```text
                  ┌─────────────────────┐
                  │    React Native     │
                  │      Mobile App     │
                  │       + Expo        │
                  └──────────┬──────────┘
                             │
                             │ REST API
                             │
                  ┌──────────▼──────────┐
                  │    Spring Boot      │
                  │       Backend       │
                  │     REST API        │
                  └──────────┬──────────┘
                             │
                             │ JPA / Hibernate
                             │
                  ┌──────────▼──────────┐
                  │     PostgreSQL      │
                  │      Database       │
                  └─────────────────────┘|

External Services used: 
                  ┌─────────────────────┐
                  │    React Native     │
                  │      Mobile App     │
                  └──────────┬──────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
       Google Maps      Google Places     Spring Boot
           API               API              API
                                              │
                                              ▼
                                      PostgreSQL Database
                                              │
                                              ▼
                                      AI / Gemini API
