package com.example.pfc_navi.dto;

public class MealRecordItemResponse {

    private Integer id;
    private Integer itemId;
    private String name;
    private Integer amount;
    private Integer cal;
    private Integer pro;
    private Integer fat;
    private Integer car;

    public MealRecordItemResponse() {
    }

    public MealRecordItemResponse(
            Integer id,
            Integer itemId,
            String name,
            Integer amount,
            Integer cal,
            Integer pro,
            Integer fat,
            Integer car
    ) {
        this.id = id;
        this.itemId = itemId;
        this.name = name;
        this.amount = amount;
        this.cal = cal;
        this.pro = pro;
        this.fat = fat;
        this.car = car;
    }

    public Integer getId() {
        return id;
    }

    public Integer getItemId() {
        return itemId;
    }

    public String getName() {
        return name;
    }

    public Integer getAmount() {
        return amount;
    }

    public Integer getCal() {
        return cal;
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

    public void setId(Integer id) {
        this.id = id;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public void setCal(Integer cal) {
        this.cal = cal;
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
}