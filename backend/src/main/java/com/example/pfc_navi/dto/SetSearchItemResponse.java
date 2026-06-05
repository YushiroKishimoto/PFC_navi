package com.example.pfc_navi.dto;

public class SetSearchItemResponse {

    private Integer id;
    private String name;
    private String itemType;
    private Integer itemId;
    private Integer amount;
    private Integer pro;
    private Integer fat;
    private Integer car;
    private Integer cal;

    public SetSearchItemResponse() {
    }

    public SetSearchItemResponse(
            Integer id,
            String name,
            String itemType,
            Integer itemId,
            Integer amount,
            Integer pro,
            Integer fat,
            Integer car,
            Integer cal
    ) {
        this.id = id;
        this.name = name;
        this.itemType = itemType;
        this.itemId = itemId;
        this.amount = amount;
        this.pro = pro;
        this.fat = fat;
        this.car = car;
        this.cal = cal;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getItemType() {
        return itemType;
    }

    public Integer getItemId() {
        return itemId;
    }

    public Integer getAmount() {
        return amount;
    }

    public Integer getPro() {
        return pro;
    }

    public Integer getFat() {
        return fat;
    }

    public Integer getCar() {
        return car;
    }

    public Integer getCal() {
        return cal;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public void setPro(Integer pro) {
        this.pro = pro;
    }

    public void setFat(Integer fat) {
        this.fat = fat;
    }

    public void setCar(Integer car) {
        this.car = car;
    }

    public void setCal(Integer cal) {
        this.cal = cal;
    }
}