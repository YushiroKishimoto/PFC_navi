package com.example.pfc_navi.dto;

public class CustomItemUpdateRequest {

    private String name;
    private Integer amount;
    private Integer pro;
    private Integer fat;
    private Integer car;
    private Integer cal;

    public CustomItemUpdateRequest() {
    }

    public String getName() {
        return name;
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

    public void setName(String name) {
        this.name = name;
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