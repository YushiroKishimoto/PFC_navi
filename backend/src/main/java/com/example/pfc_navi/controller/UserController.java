package com.example.pfc_navi.controller;

import com.example.pfc_navi.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        String loginId = body.get("loginId");
        String password = body.get("password");

        try {
            userService.register(loginId, password);
            return ResponseEntity.ok(Map.of("message", "ユーザー登録が完了しました"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}