package com.example.pfc_navi.dto;

import java.time.LocalDate;
import java.util.List;

public class MealRecordListResponse {
    private LocalDate recordDate;
    private List<MealRecordMealResponse> meals;
    private NutritionTotalResponse dailyTotal;

    public MealRecordListResponse() {}

    public MealRecordListResponse(LocalDate recordDate, List<MealRecordMealResponse> meals, NutritionTotalResponse dailyTotal) {
        this.recordDate = recordDate;
        this.meals = meals;
        this.dailyTotal = dailyTotal;
    }

    public LocalDate getRecordDate() { return recordDate; }
    public void setRecordDate(LocalDate recordDate) { this.recordDate = recordDate; }
    public List<MealRecordMealResponse> getMeals() { return meals; }
    public void setMeals(List<MealRecordMealResponse> meals) { this.meals = meals; }
    public NutritionTotalResponse getDailyTotal() { return dailyTotal; }
    public void setDailyTotal(NutritionTotalResponse dailyTotal) { this.dailyTotal = dailyTotal; }
}
