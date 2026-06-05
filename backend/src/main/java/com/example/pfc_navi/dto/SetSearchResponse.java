package com.example.pfc_navi.dto;

import java.util.List;

public class SetSearchResponse {

    private Integer id;
    private String name;
    private Integer totalPro;
    private Integer totalFat;
    private Integer totalCar;
    private Integer totalCal;
    private List<SetSearchItemResponse> items;

    public SetSearchResponse() {
    }

    public SetSearchResponse(
            Integer id,
            String name,
            Integer totalPro,
            Integer totalFat,
            Integer totalCar,
            Integer totalCal,
            List<SetSearchItemResponse> items
    ) {
        this.id = id;
        this.name = name;
        this.totalPro = totalPro;
        this.totalFat = totalFat;
        this.totalCar = totalCar;
        this.totalCal = totalCal;
        this.items = items;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Integer getTotalPro() {
        return totalPro;
    }

    public Integer getTotalFat() {
        return totalFat;
    }

    public Integer getTotalCar() {
        return totalCar;
    }

    public Integer getTotalCal() {
        return totalCal;
    }

    public List<SetSearchItemResponse> getItems() {
        return items;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setTotalPro(Integer totalPro) {
        this.totalPro = totalPro;
    }

    public void setTotalFat(Integer totalFat) {
        this.totalFat = totalFat;
    }

    public void setTotalCar(Integer totalCar) {
        this.totalCar = totalCar;
    }

    public void setTotalCal(Integer totalCal) {
        this.totalCal = totalCal;
    }

    public void setItems(List<SetSearchItemResponse> items) {
        this.items = items;
    }
}
