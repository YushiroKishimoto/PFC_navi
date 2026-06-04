package com.example.pfc_navi.controller;

import com.example.pfc_navi.dto.UserRequest;
import com.example.pfc_navi.repository.AccountRepository;
import com.example.pfc_navi.dto.RegisterRequest;
import com.example.pfc_navi.service.UserService;
import com.example.pfc_navi.service.UserInfoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final UserInfoService userInfoService;
    private final AccountRepository accountRepository;

    public UserController(UserService userService, UserInfoService userInfoService, AccountRepository accountRepository) {
        this.userService = userService;
        this.userInfoService = userInfoService;
        this.accountRepository = accountRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest request) {
        try {
            userService.register(request.getLoginId(), request.getPassword());
            return ResponseEntity.ok(Map.of("message", "ユーザー登録が完了しました"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/me")
    public ResponseEntity<?> createUser(@RequestBody @Valid UserRequest request, Principal principal) {
        Integer userId = Integer.parseInt(principal.getName());
        // loginIdはAccountRepositoryから取得
        String loginId = accountRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"))
                .getLoginId();
        try {
            return ResponseEntity.ok(userInfoService.createUser(userId, loginId, request));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUser(Principal principal) {
        Integer userId = Integer.parseInt(principal.getName());
        try {
            return ResponseEntity.ok(userInfoService.getUser(userId));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateUser(@RequestBody @Valid UserRequest request, Principal principal) {
        Integer userId = Integer.parseInt(principal.getName());
        try {
            return ResponseEntity.ok(userInfoService.updateUser(userId, request));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}