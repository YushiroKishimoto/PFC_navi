package com.example.pfc_navi.controller;

import com.example.pfc_navi.dto.ApiResponse;
import com.example.pfc_navi.dto.SetRegisterRequest;
import com.example.pfc_navi.dto.SetUpdateRequest;
import com.example.pfc_navi.service.SetService;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.Map;

@RestController
@RequestMapping("/api/sets")
public class SetController {
    private final SetService setService;

    public SetController(SetService setService) {
        this.setService = setService;
    }

    @PostMapping("/register")
    public ApiResponse<?> registerSet(@RequestBody SetRegisterRequest request, Authentication authentication) {
        try {
            Integer userId = Integer.parseInt(authentication.getName());
            return ApiResponse.success("セットを登録しました。", setService.registerSet(request, userId));
        } catch (IllegalArgumentException e) {
            return ApiResponse.validationError(e.getMessage(), Map.of());
        }
    }

    @GetMapping("/search")
public ApiResponse<?> searchSets(
        @RequestParam(required = false, defaultValue = "") String keyword,
        Authentication authentication) {
    Integer userId = Integer.parseInt(authentication.getName());

    return ApiResponse.success(
            "セット検索完了",
            Map.of("sets", setService.searchSets(keyword, userId)));
}

    @GetMapping("/{id}")
    public ApiResponse<?> getSetDetail(@PathVariable Integer id, Authentication authentication) {
        try {
            Integer userId = Integer.parseInt(authentication.getName());
            return ApiResponse.success(
                    "セット詳細取得成功",
                    setService.getSetDetail(id, userId));
        } catch (IllegalArgumentException e) {
            return ApiResponse.validationError(e.getMessage(), Map.of());
        }
    }

    @PutMapping("/{id}")
    public ApiResponse<?> updateSet(
            @PathVariable Integer id,
            @RequestBody SetUpdateRequest request,
            Authentication authentication) {
        try {
            Integer userId = Integer.parseInt(authentication.getName());
            return ApiResponse.success(
                    "セットを更新しました。",
                    setService.updateSet(id, request, userId));
        } catch (IllegalArgumentException e) {
            return ApiResponse.validationError(e.getMessage(), Map.of());
        }
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteSet(@PathVariable Integer id, Authentication authentication) {
        try {
            Integer userId = Integer.parseInt(authentication.getName());
            setService.deleteSet(id, userId);

            return ApiResponse.success(
                    "セットを削除しました。",
                    Map.of());
        } catch (IllegalArgumentException e) {
            return ApiResponse.validationError(e.getMessage(), Map.of());
        }
    }
}
