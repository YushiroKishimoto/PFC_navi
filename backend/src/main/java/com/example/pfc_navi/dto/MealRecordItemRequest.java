package com.example.pfc_navi.dto;

public class MealRecordItemRequest {
    private String source;
    private Integer itemId;
    private Integer amount;

    public MealRecordItemRequest() {}

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
    public Integer getItemId() { return itemId; }
    public void setItemId(Integer itemId) { this.itemId = itemId; }
    public Integer getAmount() { return amount; }
    public void setAmount(Integer amount) { this.amount = amount; }
}
