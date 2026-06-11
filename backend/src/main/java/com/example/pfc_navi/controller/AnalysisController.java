package com.example.pfc_navi.controller;

import com.example.pfc_navi.dto.ApiResponse;
import com.example.pfc_navi.service.AnalysisService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/analysis")
public class AnalysisController {

    private final AnalysisService analysisService;

    public AnalysisController(AnalysisService analysisService) {
        this.analysisService = analysisService;
    }

    private Integer getUserId(Principal principal) {
        if (principal == null) {
            return 1;
        }

        return Integer.parseInt(principal.getName());
    }

    @GetMapping("/weekly")
    public ApiResponse<?> getWeeklyAnalysis(
            @RequestParam LocalDate endDate,
            Principal principal) {
        try {
            Integer userId = getUserId(principal);

            return ApiResponse.success(
                    "週間分析取得成功",
                    analysisService.getWeeklyAnalysis(endDate, userId));
        } catch (IllegalArgumentException e) {
            return ApiResponse.validationError(e.getMessage(), Map.of());
        }
    }
}