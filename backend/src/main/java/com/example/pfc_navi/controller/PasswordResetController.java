package com.example.pfc_navi.controller;

import com.example.pfc_navi.dto.PasswordResetRequest;
import com.example.pfc_navi.service.PasswordResetService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/password-reset")
public class PasswordResetController {

    private final PasswordResetService passwordResetService;

    public PasswordResetController(PasswordResetService passwordResetService) {
        this.passwordResetService = passwordResetService;
    }

    @PostMapping
    public ResponseEntity<?> resetPassword(@RequestBody @Valid PasswordResetRequest request) {
        try {
            passwordResetService.resetPassword(
                    request.getLoginId(),
                    request.getSecurityAnswer(),
                    request.getNewPassword());
            return ResponseEntity.ok(Map.of("message", "パスワードを再設定しました"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}