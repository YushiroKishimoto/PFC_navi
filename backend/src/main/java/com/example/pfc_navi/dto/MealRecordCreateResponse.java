package com.example.pfc_navi.dto;

public class MealRecordCreateResponse {
    private Integer mealRecordId;
    private String mealType;
    private NutritionTotalResponse dailyTotal;

    public MealRecordCreateResponse() {}

    public MealRecordCreateResponse(Integer mealRecordId, String mealType, NutritionTotalResponse dailyTotal) {
        this.mealRecordId = mealRecordId;
        this.mealType = mealType;
        this.dailyTotal = dailyTotal;
    }

    public Integer getMealRecordId() { return mealRecordId; }
    public void setMealRecordId(Integer mealRecordId) { this.mealRecordId = mealRecordId; }
    public String getMealType() { return mealType; }
    public void setMealType(String mealType) { this.mealType = mealType; }
    public NutritionTotalResponse getDailyTotal() { return dailyTotal; }
    public void setDailyTotal(NutritionTotalResponse dailyTotal) { this.dailyTotal = dailyTotal; }
}
