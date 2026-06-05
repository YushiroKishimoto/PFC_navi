package com.example.pfc_navi.dto;

import java.util.List;

public class SetUpdateRequest {

    private String name;
    private List<SetUpdateItemRequest> items;

    public SetUpdateRequest() {
    }

    public String getName() {
        return name;
    }

    public List<SetUpdateItemRequest> getItems() {
        return items;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setItems(List<SetUpdateItemRequest> items) {
        this.items = items;
    }
}