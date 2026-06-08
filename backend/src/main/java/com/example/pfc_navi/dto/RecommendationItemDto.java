package com.example.pfc_navi.dto;

public class RecommendationItemDto {
    private Integer id;
    private String name;
    private Integer totalPro;
    private Integer totalFat;
    private Integer totalCar;
    private Integer totalCal;

    public RecommendationItemDto() {}

    public Integer getId() { return id; }
    public String getName() { return name; }
    public Integer getTotalPro() { return totalPro; }
    public Integer getTotalFat() { return totalFat; }
    public Integer getTotalCar() { return totalCar; }
    public Integer getTotalCal() { return totalCal; }

    public void setId(Integer id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setTotalPro(Integer totalPro) { this.totalPro = totalPro; }
    public void setTotalFat(Integer totalFat) { this.totalFat = totalFat; }
    public void setTotalCar(Integer totalCar) { this.totalCar = totalCar; }
    public void setTotalCal(Integer totalCal) { this.totalCal = totalCal; }
}