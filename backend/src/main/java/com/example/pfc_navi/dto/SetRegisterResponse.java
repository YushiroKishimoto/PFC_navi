package com.example.pfc_navi.dto;

public class SetRegisterResponse {
    private Integer setId;
    private String name;
    private Integer totalCal;
    private Integer totalPro;
    private Integer totalFat;
    private Integer totalCar;

    public SetRegisterResponse() {}

    public SetRegisterResponse(Integer setId, String name, Integer totalCal, Integer totalPro, Integer totalFat, Integer totalCar) {
        this.setId = setId;
        this.name = name;
        this.totalCal = totalCal;
        this.totalPro = totalPro;
        this.totalFat = totalFat;
        this.totalCar = totalCar;
    }

    public Integer getSetId() { return setId; }
    public String getName() { return name; }
    public Integer getTotalCal() { return totalCal; }
    public Integer getTotalPro() { return totalPro; }
    public Integer getTotalFat() { return totalFat; }
    public Integer getTotalCar() { return totalCar; }

    public void setSetId(Integer setId) { this.setId = setId; }
    public void setName(String name) { this.name = name; }
    public void setTotalCal(Integer totalCal) { this.totalCal = totalCal; }
    public void setTotalPro(Integer totalPro) { this.totalPro = totalPro; }
    public void setTotalFat(Integer totalFat) { this.totalFat = totalFat; }
    public void setTotalCar(Integer totalCar) { this.totalCar = totalCar; }
}
