package com.example.pfc_navi.service;

import com.example.pfc_navi.dto.DailyAnalysisResponse;
import com.example.pfc_navi.dto.AnalysisResponse;
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

    public AnalysisResponse getWeeklyAnalysis(LocalDate endDate, Integer userId) {
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

        int TotalCal = 0;
        int recordDays = 0;
        int dailyAchievementTotal = 0;

        int targetCal = safe(user.getTargetCal());

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

                if (targetCal > 0) {
                    int dailyAchievement =
                            Math.round((totalCal * 100.0f) / targetCal);

                    // 1日ごとの達成率は最大100%
                    dailyAchievement = Math.min(dailyAchievement, 100);

                    dailyAchievementTotal += dailyAchievement;
                }
            }

            TotalCal += totalCal;

            days.add(new DailyAnalysisResponse(
                    targetDate,
                    totalCal,
                    totalPro,
                    totalFat,
                    totalCar));
        }

        int averageCal = Math.round(TotalCal / 7.0f);

        int achievementRate = 0;

        if (recordDays > 0) {
            achievementRate =
                    Math.round(dailyAchievementTotal / (float) recordDays);
        }

        return new AnalysisResponse(
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

    public AnalysisResponse getMonthlyAnalysis(String targetMonth, Integer userId) {
        if (targetMonth == null || targetMonth.isBlank()) {
            throw new IllegalArgumentException("targetMonthは必須です。");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("ユーザーが見つかりません"));

        LocalDate startDate = LocalDate.parse(targetMonth + "-01");
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        List<MealRecord> records = mealRecordRepository.findByUserIdAndRecordDateBetween(
                userId,
                startDate,
                endDate);

        List<DailyAnalysisResponse> days = new ArrayList<>();

        int TotalCal = 0;
        int recordDays = 0;
        int dailyAchievementTotal = 0;

        int targetCal = safe(user.getTargetCal());
        

        for (int i = 0; i < startDate.lengthOfMonth(); i++) {
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

                    if (targetCal > 0) {
                        int dailyAchievement =
                                Math.round((totalCal * 100.0f) / targetCal);

                        dailyAchievement = Math.min(dailyAchievement, 100);

                        dailyAchievementTotal += dailyAchievement;
                    }
                }

            TotalCal += totalCal;

            days.add(new DailyAnalysisResponse(
                    targetDate,
                    totalCal,
                    totalPro,
                    totalFat,
                    totalCar));
        }

        int daysInMonth = startDate.lengthOfMonth();
        int averageCal = Math.round(TotalCal / (float) daysInMonth);

        int achievementRate = 0;

        if (recordDays > 0) {
            achievementRate =
                    Math.round(dailyAchievementTotal / (float) recordDays);
        }

        return new AnalysisResponse(
                startDate,
                endDate,
                recordDays,
                achievementRate,
                averageCal,
                days,
                targetCal);
    }
}