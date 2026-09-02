package com.lockbox.backend.service;

import java.time.Duration;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;

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

    public Mono<String> getChatReply(
            String userMessage,
            String origin,
            String destination) {

        String prompt = String.format(
                """
                        You are a helpful transportation assistant.

                        The user is traveling from %s to %s in the UAE.

                        User question:
                        %s
                        """,
                origin,
                destination,
                userMessage);

        System.out.println("=== Gemini Request ===");
        System.out.println("Prompt: " + prompt);

        Map<String, Object> body = Map.of(
                "contents", List.of(
                        Map.of(
                                "role", "user",
                                "parts", List.of(
                                        Map.of("text", prompt)))));

        return webClient
                .post()
                .uri(apiUrl)
                .header("x-goog-api-key", apiKey)
                .header("Content-Type", "application/json")
                .bodyValue(body)
                .retrieve()

                .onStatus(
                        status -> status.value() == 503,
                        response -> response.bodyToMono(String.class)
                                .flatMap(errorBody -> {

                                    System.err.println("=== Gemini 503 ===");
                                    System.err.println(errorBody);

                                    return Mono.error(
                                            new GeminiTemporaryException(
                                                    "Gemini is temporarily unavailable"));
                                }))

                .onStatus(
                        status -> status.isError(),
                        response -> response.bodyToMono(String.class)
                                .flatMap(errorBody -> {

                                    System.err.println("=== Gemini HTTP ERROR ===");
                                    System.err.println("Status: " + response.statusCode());
                                    System.err.println("Body: " + errorBody);

                                    return Mono.error(
                                            new RuntimeException(
                                                    "Gemini API error: "
                                                            + response.statusCode()
                                                            + " - "
                                                            + errorBody));
                                }))

                .bodyToMono(Map.class)

                .timeout(Duration.ofSeconds(30))

                .retryWhen(
                        Retry.backoff(3, Duration.ofSeconds(2))
                                .maxBackoff(Duration.ofSeconds(10))
                                .filter(error -> error instanceof GeminiTemporaryException))

                .doOnNext(response -> {
                    System.out.println(
                            "=== Gemini Raw Response ===");
                    System.out.println(response);
                })

                .doOnError(error -> {
                    System.err.println(
                            "=== Gemini ERROR ===");
                    error.printStackTrace();
                })

                .map(this::extractReply);
    }

    @SuppressWarnings("unchecked")
    private String extractReply(Map response) {

        try {

            List<Map> candidates = (List<Map>) response.get("candidates");

            Map content = (Map) candidates.get(0).get("content");

            List<Map> parts = (List<Map>) content.get("parts");

            return (String) parts.get(0).get("text");

        } catch (Exception e) {

            System.err.println(
                    "=== Failed to extract Gemini response ===");

            e.printStackTrace();

            return "Sorry, I couldn't process that.";
        }
    }
}