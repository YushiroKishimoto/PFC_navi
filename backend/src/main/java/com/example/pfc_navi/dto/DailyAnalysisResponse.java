package com.example.pfc_navi.dto;

import java.time.LocalDate;

public class DailyAnalysisResponse {

    private LocalDate date;
    private Integer totalCal;
    private Integer totalPro;
    private Integer totalFat;
    private Integer totalCar;

    public DailyAnalysisResponse() {
    }

    public DailyAnalysisResponse(
            LocalDate date,
            Integer totalCal,
            Integer totalPro,
            Integer totalFat,
            Integer totalCar
    ) {
        this.date = date;
        this.totalCal = totalCal;
        this.totalPro = totalPro;
        this.totalFat = totalFat;
        this.totalCar = totalCar;
    }

    public LocalDate getDate() {
        return date;
    }

    public Integer getTotalCal() {
        return totalCal;
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

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setTotalCal(Integer totalCal) {
        this.totalCal = totalCal;
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
}