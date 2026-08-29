package com.lockbox.backend.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lockbox.backend.service.GeminiService;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*") // tighten this to your app's actual origin in production
public class ChatController {

    public record ChatRequest(String message, String origin, String destination) {}

    private final GeminiService geminiService;

    public ChatController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping
    public Mono<Map<String, String>> chat(@RequestBody ChatRequest request) {
        return geminiService.getChatReply(
                request.message(),
                request.origin(),
                request.destination()
        ).map(reply -> Map.of("reply", reply));
    }
}