package com.example.pfc_navi.dto;

import java.util.List;

public class MealRecordMealResponse {
    private Integer mealRecordId;
    private String mealType;
    private List<MealRecordItemResponse> items;
    private NutritionTotalResponse mealTotal;

    public MealRecordMealResponse() {}

    public MealRecordMealResponse(Integer mealRecordId, String mealType, List<MealRecordItemResponse> items, NutritionTotalResponse mealTotal) {
        this.mealRecordId = mealRecordId;
        this.mealType = mealType;
        this.items = items;
        this.mealTotal = mealTotal;
    }

    public Integer getMealRecordId() { return mealRecordId; }
    public void setMealRecordId(Integer mealRecordId) { this.mealRecordId = mealRecordId; }
    public String getMealType() { return mealType; }
    public void setMealType(String mealType) { this.mealType = mealType; }
    public List<MealRecordItemResponse> getItems() { return items; }
    public void setItems(List<MealRecordItemResponse> items) { this.items = items; }
    public NutritionTotalResponse getMealTotal() { return mealTotal; }
    public void setMealTotal(NutritionTotalResponse mealTotal) { this.mealTotal = mealTotal; }
}
