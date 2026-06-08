package com.example.pfc_navi.controller;

import com.example.pfc_navi.dto.RecommendationItemDto;
import com.example.pfc_navi.entity.User;
import com.example.pfc_navi.repository.UserRepository;
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
    private final UserRepository userRepository;

    public RecommendationController(RecommendationService recommendationService,
                                    UserRepository userRepository) {
        this.recommendationService = recommendationService;
        this.userRepository = userRepository;
    }

    @GetMapping("/recommendations")
    public ResponseEntity<?> getRecommendations(
            @RequestParam String date,
            @RequestParam(defaultValue = "5") int limit,
            Principal principal) {

        User user = userRepository.findByLoginId(principal.getName())
                .orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"));

        LocalDate localDate = LocalDate.parse(date);
        List<RecommendationItemDto> result =
                recommendationService.getRecommendations(user.getUserId(), localDate, limit);

        return ResponseEntity.ok(result);
    }
}