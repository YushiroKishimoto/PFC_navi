package com.example.pfc_navi.dto;

import java.time.LocalDate;
import java.util.List;

public class MealRecordRequest {
    private LocalDate recordDate;
    private String mealType;
    private List<MealRecordItemRequest> items;

    public MealRecordRequest() {}

    public LocalDate getRecordDate() { return recordDate; }
    public void setRecordDate(LocalDate recordDate) { this.recordDate = recordDate; }
    public String getMealType() { return mealType; }
    public void setMealType(String mealType) { this.mealType = mealType; }
    public List<MealRecordItemRequest> getItems() { return items; }
    public void setItems(List<MealRecordItemRequest> items) { this.items = items; }
}
