package com.example.pfc_navi.dto;

import java.util.List;

public class SetRegisterRequest {
    private String name;
    private List<SetRegisterItemRequest> items;

    public SetRegisterRequest() {}

    public String getName() { return name; }
    public List<SetRegisterItemRequest> getItems() { return items; }

    public void setName(String name) { this.name = name; }
    public void setItems(List<SetRegisterItemRequest> items) { this.items = items; }
}
