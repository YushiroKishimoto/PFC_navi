package com.example.pfc_navi.controller;

import com.example.pfc_navi.dto.DashboardResponse;
import com.example.pfc_navi.service.DashboardService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;

@RestController
@RequestMapping("/api")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponse> getDashboard(
            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            Principal principal) {

        if (date == null) {
            date = LocalDate.now();
        }

        // ログイン中のユーザーIDを取得
        Integer userId = Integer.parseInt(principal.getName());

        DashboardResponse response = dashboardService.getDashboard(userId, date);
        return ResponseEntity.ok(response);
    }
}