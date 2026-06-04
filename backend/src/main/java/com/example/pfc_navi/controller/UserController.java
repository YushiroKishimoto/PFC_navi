package com.example.pfc_navi.controller;

import com.example.pfc_navi.dto.UserRequest;
import com.example.pfc_navi.dto.RegisterRequest;
import com.example.pfc_navi.service.UserService;
import com.example.pfc_navi.service.UserInfoService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final UserInfoService userInfoService;

    public UserController(UserService userService, UserInfoService userInfoService) {
        this.userService = userService;
        this.userInfoService = userInfoService;
    }

    // ユーザー登録
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest request) {
        try {
            userService.register(request.getLoginId(), request.getPassword());
            return ResponseEntity.ok(Map.of("message", "ユーザー登録が完了しました"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }


    // ユーザー情報初回登録
    @PostMapping("/me")
    public ResponseEntity<?> createUser(@RequestBody @Valid UserRequest request, HttpSession session) {
        Integer userId = (Integer) session.getAttribute("userId");
        String loginId = (String) session.getAttribute("loginId");
        if (userId == null) {
            return ResponseEntity.status(401).body(Map.of("error", "ログインしてください"));
        }
        try {
            return ResponseEntity.ok(userInfoService.createUser(userId, loginId, request));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ユーザー情報取得
    @GetMapping("/me")
    public ResponseEntity<?> getUser(HttpSession session) {
        Integer userId = (Integer) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body(Map.of("error", "ログインしてください"));
        }
        try {
            return ResponseEntity.ok(userInfoService.getUser(userId));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // ユーザー情報更新
    @PutMapping("/me")
    public ResponseEntity<?> updateUser(@RequestBody @Valid UserRequest request, HttpSession session) {
        Integer userId = (Integer) session.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body(Map.of("error", "ログインしてください"));
        }
        try {
            return ResponseEntity.ok(userInfoService.updateUser(userId, request));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}