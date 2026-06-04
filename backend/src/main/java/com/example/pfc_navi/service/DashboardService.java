package com.example.pfc_navi.service;

import com.example.pfc_navi.dto.DashboardResponse;
import com.example.pfc_navi.entity.MealRecord;
import com.example.pfc_navi.entity.User;
import com.example.pfc_navi.repository.MealRecordRepository;
import com.example.pfc_navi.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final MealRecordRepository mealRecordRepository;

    public DashboardService(UserRepository userRepository,
                            MealRecordRepository mealRecordRepository) {
        this.userRepository = userRepository;
        this.mealRecordRepository = mealRecordRepository;
    }

    public DashboardResponse getDashboard(Integer userId, LocalDate date) {

        // ユーザー情報取得
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"));

        // 目標PFC計算
        int targetCal = user.getTargetCal();
        int pfcCourse = user.getPfcCourse();
        double weight = user.getWeight().doubleValue();

        double pCoef = (pfcCourse == 2) ? 1.6 : 2.0;
        double fRatio = (pfcCourse == 1) ? 0.20 : 0.25;

        int targetPro = (int)(weight * pCoef);
        int targetFat = (int)(targetCal * fRatio / 9);
        int targetCar = (int)((targetCal - targetPro * 4 - targetFat * 9) / 4.0);

        // 摂取PFC集計
        List<MealRecord> records = mealRecordRepository.findByUserIdAndRecordDate(userId, date);
        int actualPro = records.stream().mapToInt(MealRecord::getTotalPro).sum();
        int actualFat = records.stream().mapToInt(MealRecord::getTotalFat).sum();
        int actualCar = records.stream().mapToInt(MealRecord::getTotalCar).sum();
        int actualCal = records.stream().mapToInt(MealRecord::getTotalCal).sum();

        // 差分
        int diffPro = targetPro - actualPro;
        int diffFat = targetFat - actualFat;
        int diffCar = targetCar - actualCar;
        int diffCal = targetCal - actualCal;

        // 達成率（カロリーベース）
        int achievementRate = targetCal > 0 ? (int)((double) actualCal / targetCal * 100) : 0;

        // レスポンス組み立て
        DashboardResponse response = new DashboardResponse();
        response.setTargetCal(targetCal);
        response.setTargetPro(targetPro);
        response.setTargetFat(targetFat);
        response.setTargetCar(targetCar);
        response.setActualCal(actualCal);
        response.setActualPro(actualPro);
        response.setActualFat(actualFat);
        response.setActualCar(actualCar);
        response.setDiffCal(diffCal);
        response.setDiffPro(diffPro);
        response.setDiffFat(diffFat);
        response.setDiffCar(diffCar);
        response.setAchievementRate(achievementRate);

        return response;
    }
}