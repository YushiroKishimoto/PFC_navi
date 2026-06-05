package com.example.pfc_navi.controller;

import com.example.pfc_navi.dto.ApiResponse;
import com.example.pfc_navi.dto.SetRegisterRequest;
import com.example.pfc_navi.dto.SetUpdateRequest;
import com.example.pfc_navi.service.SetService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/sets")
public class SetController {
    private final SetService setService;

    public SetController(SetService setService) {
        this.setService = setService;
    }

    @PostMapping("/register")
    public ApiResponse<?> registerSet(@RequestBody SetRegisterRequest request) {
        try {
            return ApiResponse.success("セットを登録しました。", setService.registerSet(request));
        } catch (IllegalArgumentException e) {
            return ApiResponse.validationError(e.getMessage(), Map.of());
        }
    }

    @GetMapping("/search")
    public ApiResponse<?> searchSets(
            @RequestParam String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return ApiResponse.validationError(
                    "検索キーワードを入力してください。",
                    Map.of("sets", java.util.List.of()));
        }

        return ApiResponse.success(
                "セット検索完了",
                Map.of("sets", setService.searchSets(keyword)));
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getSetDetail(@PathVariable Integer id) {
        try {
            return ApiResponse.success(
                    "セット詳細取得成功",
                    setService.getSetDetail(id));
        } catch (IllegalArgumentException e) {
            return ApiResponse.validationError(e.getMessage(), Map.of());
        }
    }

    @PutMapping("/{id}")
    public ApiResponse<?> updateSet(
            @PathVariable Integer id,
            @RequestBody SetUpdateRequest request) {
        try {
            return ApiResponse.success(
                    "セットを更新しました。",
                    setService.updateSet(id, request));
        } catch (IllegalArgumentException e) {
            return ApiResponse.validationError(e.getMessage(), Map.of());
        }
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteSet(@PathVariable Integer id) {
        try {
            setService.deleteSet(id);

            return ApiResponse.success(
                    "セットを削除しました。",
                    Map.of());
        } catch (IllegalArgumentException e) {
            return ApiResponse.validationError(e.getMessage(), Map.of());
        }
    }
}
