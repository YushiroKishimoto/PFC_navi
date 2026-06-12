package com.example.pfc_navi.dto;

import java.time.LocalDate;
import java.util.List;

public class WeeklyAnalysisResponse {

    private LocalDate startDate;
    private LocalDate endDate;

    private Integer recordDays;
    private Integer achievementRate;
    private Integer averageCal;

    private List<DailyAnalysisResponse> days;

    private Integer targetCal;

    public WeeklyAnalysisResponse() {
    }

    public WeeklyAnalysisResponse(
            LocalDate startDate,
            LocalDate endDate,
            Integer recordDays,
            Integer achievementRate,
            Integer averageCal,
            List<DailyAnalysisResponse> days,
            Integer targetCal) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.recordDays = recordDays;
        this.achievementRate = achievementRate;
        this.averageCal = averageCal;
        this.days = days;
        this.targetCal = targetCal;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public Integer getRecordDays() {
        return recordDays;
    }

    public Integer getAchievementRate() {
        return achievementRate;
    }

    public Integer getAverageCal() {
        return averageCal;
    }

    public List<DailyAnalysisResponse> getDays() {
        return days;
    }

    public Integer getTargetCal() {
        return targetCal;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public void setRecordDays(Integer recordDays) {
        this.recordDays = recordDays;
    }

    public void setAchievementRate(Integer achievementRate) {
        this.achievementRate = achievementRate;
    }

    public void setAverageCal(Integer averageCal) {
        this.averageCal = averageCal;
    }

    public void setDays(List<DailyAnalysisResponse> days) {
        this.days = days;
    }

    public void setTargetCal(Integer targetCal) {
        this.targetCal = targetCal;
    }
}