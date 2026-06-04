package com.example.pfc_navi.dto;

public class DashboardResponse {

    // 目標
    private Integer targetCal;
    private Integer targetPro;
    private Integer targetFat;
    private Integer targetCar;

    // 摂取
    private Integer actualCal;
    private Integer actualPro;
    private Integer actualFat;
    private Integer actualCar;

    // 差分（目標 - 摂取）
    private Integer diffCal;
    private Integer diffPro;
    private Integer diffFat;
    private Integer diffCar;

    // 達成率（%）
    private Integer achievementRate;

    // コンストラクタ・getter・setter
    public DashboardResponse() {}

    public Integer getTargetCal() {
        return targetCal;
    }

    public void setTargetCal(Integer targetCal) {
        this.targetCal = targetCal;
    }

    public Integer getTargetPro() {
        return targetPro;
    }

    public void setTargetPro(Integer targetPro) {
        this.targetPro = targetPro;
    }

    public Integer getTargetFat() {
        return targetFat;
    }

    public void setTargetFat(Integer targetFat) {
        this.targetFat = targetFat;
    }

    public Integer getTargetCar() {
        return targetCar;
    }

    public void setTargetCar(Integer targetCar) {
        this.targetCar = targetCar;
    }

    public Integer getActualCal() {
        return actualCal;
    }

    public void setActualCal(Integer actualCal) {
        this.actualCal = actualCal;
    }

    public Integer getActualPro() {
        return actualPro;
    }

    public void setActualPro(Integer actualPro) {
        this.actualPro = actualPro;
    }

    public Integer getActualFat() {
        return actualFat;
    }

    public void setActualFat(Integer actualFat) {
        this.actualFat = actualFat;
    }

    public Integer getActualCar() {
        return actualCar;
    }

    public void setActualCar(Integer actualCar) {
        this.actualCar = actualCar;
    }

    public Integer getDiffCal() {
        return diffCal;
    }

    public void setDiffCal(Integer diffCal) {
        this.diffCal = diffCal;
    }

    public Integer getDiffPro() {
        return diffPro;
    }

    public void setDiffPro(Integer diffPro) {
        this.diffPro = diffPro;
    }

    public Integer getDiffFat() {
        return diffFat;
    }

    public void setDiffFat(Integer diffFat) {
        this.diffFat = diffFat;
    }

    public Integer getDiffCar() {
        return diffCar;
    }

    public void setDiffCar(Integer diffCar) {
        this.diffCar = diffCar;
    }

    public Integer getAchievementRate() {
        return achievementRate;
    }

    public void setAchievementRate(Integer achievementRate) {
        this.achievementRate = achievementRate;
    }

    
}