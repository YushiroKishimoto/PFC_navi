package com.example.pfc_navi.dto;

public class CustomItemCreateResponse {

    private Integer customItemId;

    public CustomItemCreateResponse() {
    }

    public CustomItemCreateResponse(Integer customItemId) {
        this.customItemId = customItemId;
    }

    public Integer getCustomItemId() {
        return customItemId;
    }

    public void setCustomItemId(Integer customItemId) {
        this.customItemId = customItemId;
    }
}