package com.lockbox.backend.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@Service
public class GeminiService {

    private final WebClient webClient;

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    public GeminiService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public Mono<String> getChatReply(String userMessage, String origin, String destination) {
        String prompt = String.format(
            "You are a helpful transportation assistant. Context: traveling from %s to %s.\n\nUser: %s in the country UAE.",
            origin, destination, userMessage
        );

        System.out.println("=== Gemini Request ===");
        System.out.println("Prompt: " + prompt);

        Map<String, Object> body = Map.of(
            "contents", List.of(
                Map.of("role", "user", "parts", List.of(Map.of("text", prompt)))
            )
        );

        return webClient.post()
            .uri(apiUrl)
            .header("x-goog-api-key", apiKey)
            .bodyValue(body)
            .retrieve()
            .bodyToMono(Map.class)
            .doOnNext(response -> System.out.println("=== Gemini Raw Response ===\n" + response))
            .doOnError(error -> System.err.println("=== Gemini API Error ===\n" + error.getMessage()))
            .map(this::extractReply);
    }

    @SuppressWarnings("unchecked")
    private String extractReply(Map response) {
        try {
            var candidates = (List<Map>) response.get("candidates");
            var content = (Map) candidates.get(0).get("content");
            var parts = (List<Map>) content.get("parts");
            return (String) parts.get(0).get("text");
        } catch (Exception e) {
            return "Sorry, I couldn't process that.";
        }
    }
}