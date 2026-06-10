package com.example.pfc_navi.controller;

import com.example.pfc_navi.dto.RecommendationItemDto;
import com.example.pfc_navi.service.RecommendationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping("/recommendations")
    public ResponseEntity<?> getRecommendations(
            @RequestParam String date,
            @RequestParam(defaultValue = "5") int limit,
            Principal principal) {

        Integer userId = Integer.parseInt(principal.getName());
        LocalDate localDate = LocalDate.parse(date);
        List<RecommendationItemDto> result =
                recommendationService.getRecommendations(userId, localDate, limit);
        return ResponseEntity.ok(result);
    }
}