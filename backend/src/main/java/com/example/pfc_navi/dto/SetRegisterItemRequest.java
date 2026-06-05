package com.example.pfc_navi.dto;

public class SetRegisterItemRequest {
    private String source;
    private Integer itemId;
    private Integer amount;

    public SetRegisterItemRequest() {}

    public String getSource() { return source; }
    public Integer getItemId() { return itemId; }
    public Integer getAmount() { return amount; }

    public void setSource(String source) { this.source = source; }
    public void setItemId(Integer itemId) { this.itemId = itemId; }
    public void setAmount(Integer amount) { this.amount = amount; }
}
