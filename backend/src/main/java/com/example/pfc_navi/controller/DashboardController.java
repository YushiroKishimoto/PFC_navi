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

    //開発中のログイン認証のために仮でuserID_1を保持する
    private Integer getUserId(Principal principal) {
        if (principal == null) {
            // 開発用の仮ユーザーID
            return 1;
        }

        return Integer.parseInt(principal.getName());
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
        //結合時にファイルここを追加し、上記のこめんとあうとを削除する
            //Integer userId = Integer.parseInt(principal.getName());

        Integer userId = getUserId(principal);

        DashboardResponse response = dashboardService.getDashboard(userId, date);
        return ResponseEntity.ok(response);
    }
}