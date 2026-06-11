package com.example.pfc_navi.service;

import com.example.pfc_navi.dto.DailyAnalysisResponse;
import com.example.pfc_navi.dto.WeeklyAnalysisResponse;
import com.example.pfc_navi.entity.MealRecord;
import com.example.pfc_navi.entity.User;
import com.example.pfc_navi.repository.MealRecordRepository;
import com.example.pfc_navi.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class AnalysisService {

    private final MealRecordRepository mealRecordRepository;
    private final UserRepository userRepository;

    public AnalysisService(
            MealRecordRepository mealRecordRepository,
            UserRepository userRepository) {
        this.mealRecordRepository = mealRecordRepository;
        this.userRepository = userRepository;
    }

    public WeeklyAnalysisResponse getWeeklyAnalysis(LocalDate endDate, Integer userId) {
        if (endDate == null) {
            throw new IllegalArgumentException("endDateは必須です。");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("ユーザーが見つかりません"));

        LocalDate startDate = endDate.minusDays(6);

        List<MealRecord> records = mealRecordRepository.findByUserIdAndRecordDateBetween(
                userId,
                startDate,
                endDate);

        List<DailyAnalysisResponse> days = new ArrayList<>();

        int weeklyTotalCal = 0;
        int recordDays = 0;

        for (int i = 0; i < 7; i++) {
            LocalDate targetDate = startDate.plusDays(i);

            int totalCal = 0;
            int totalPro = 0;
            int totalFat = 0;
            int totalCar = 0;

            for (MealRecord record : records) {
                if (targetDate.equals(record.getRecordDate())) {
                    totalCal += safe(record.getTotalCal());
                    totalPro += safe(record.getTotalPro());
                    totalFat += safe(record.getTotalFat());
                    totalCar += safe(record.getTotalCar());
                }
            }

            if (totalCal > 0) {
                recordDays++;
            }

            weeklyTotalCal += totalCal;

            days.add(new DailyAnalysisResponse(
                    targetDate,
                    totalCal,
                    totalPro,
                    totalFat,
                    totalCar));
        }

        int averageCal = Math.round(weeklyTotalCal / 7.0f);

        int targetCal = safe(user.getTargetCal());
        int weeklyTargetCal = targetCal * 7;

        int achievementRate = 0;
        if (weeklyTargetCal > 0) {
            achievementRate = Math.round((weeklyTotalCal * 100.0f) / weeklyTargetCal);
        }

        return new WeeklyAnalysisResponse(
                startDate,
                endDate,
                recordDays,
                achievementRate,
                averageCal,
                days,
                targetCal);
    }

    private int safe(Integer value) {
        return value == null ? 0 : value;
    }
}