package com.example.pfc_navi.controller;

import com.example.pfc_navi.dto.ApiResponse;
import com.example.pfc_navi.dto.MealRecordRequest;
import com.example.pfc_navi.service.MealRecordService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/meal-records")
public class MealRecordController {
    private final MealRecordService mealRecordService;

    public MealRecordController(MealRecordService mealRecordService) {
        this.mealRecordService = mealRecordService;
    }

    @PostMapping
    public ApiResponse<?> createMealRecord(
            @RequestBody MealRecordRequest request,
            Principal principal) {
        try {
            Integer userId = Integer.parseInt(principal.getName());
            return ApiResponse.success("食事記録を保存しました。", mealRecordService.createMealRecord(request, userId));
        } catch (IllegalArgumentException e) {
            return ApiResponse.validationError(e.getMessage(), Map.of());
        }
    }

    @GetMapping
    public ApiResponse<?> getMealRecords(
            @RequestParam LocalDate date,
            Principal principal) {
        try {
            Integer userId = Integer.parseInt(principal.getName());
            return ApiResponse.success("取得成功", mealRecordService.getMealRecordsByDate(date, userId));
        } catch (IllegalArgumentException e) {
            return ApiResponse.validationError(e.getMessage(), Map.of());
        }
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteMealRecord(
            @PathVariable Integer id,
            Principal principal) {
        try {
            Integer userId = Integer.parseInt(principal.getName());
            return ApiResponse.success(
                    "食事記録を削除しました。",
                    mealRecordService.deleteMealRecord(id, userId));
        } catch (IllegalArgumentException e) {
            return ApiResponse.validationError(e.getMessage(), Map.of());
        }
    }
}