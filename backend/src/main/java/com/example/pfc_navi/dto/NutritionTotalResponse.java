package com.example.pfc_navi.dto;

public class NutritionTotalResponse {
    private Integer cal;
    private Integer pro;
    private Integer fat;
    private Integer car;

    public NutritionTotalResponse() {}

    public NutritionTotalResponse(Integer cal, Integer pro, Integer fat, Integer car) {
        this.cal = cal;
        this.pro = pro;
        this.fat = fat;
        this.car = car;
    }

    public Integer getCal() { return cal; }
    public void setCal(Integer cal) { this.cal = cal; }
    public Integer getPro() { return pro; }
    public void setPro(Integer pro) { this.pro = pro; }
    public Integer getFat() { return fat; }
    public void setFat(Integer fat) { this.fat = fat; }
    public Integer getCar() { return car; }
    public void setCar(Integer car) { this.car = car; }
}
