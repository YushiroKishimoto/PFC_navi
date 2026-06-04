package com.example.pfc_navi.dto;

public class CustomItemResponse {

    private Integer id;
    private String name;
    private Integer amount;
    private Integer pro;
    private Integer fat;
    private Integer car;
    private Integer cal;

    public CustomItemResponse() {
    }

    public CustomItemResponse(
            Integer id,
            String name,
            Integer amount,
            Integer pro,
            Integer fat,
            Integer car,
            Integer cal
    ) {
        this.id = id;
        this.name = name;
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