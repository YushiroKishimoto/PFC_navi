package com.example.pfc_navi.service;

import com.example.pfc_navi.dto.RecommendationItemDto;
import com.example.pfc_navi.entity.MealRecord;
import com.example.pfc_navi.entity.MealSet;
import com.example.pfc_navi.entity.User;
import com.example.pfc_navi.repository.MealRecordRepository;
import com.example.pfc_navi.repository.MealSetRepository;
import com.example.pfc_navi.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.AbstractMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    private final UserRepository userRepository;
    private final MealRecordRepository mealRecordRepository;
    private final MealSetRepository mealSetRepository;

    public RecommendationService(UserRepository userRepository,
                                 MealRecordRepository mealRecordRepository,
                                 MealSetRepository mealSetRepository) {
        this.userRepository = userRepository;
        this.mealRecordRepository = mealRecordRepository;
        this.mealSetRepository = mealSetRepository;
    }

    public List<RecommendationItemDto> getRecommendations(Integer userId, LocalDate date, int limit) {

        // ユーザー情報取得
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("ユーザーが見つかりません"));

        // 目標PFC計算（DashboardServiceと同ロジック）
        int targetCal = user.getTargetCal();
        int pfcCourse = user.getPfcCourse();
        double weight = user.getWeight().doubleValue();

        double pCoef = (pfcCourse == 2) ? 1.6 : 2.0;
        double fRatio = (pfcCourse == 1) ? 0.20 : 0.25;

        int targetPro = (int)(weight * pCoef);
        int targetFat = (int)(targetCal * fRatio / 9);
        int targetCar = (int)((targetCal - targetPro * 4 - targetFat * 9) / 4.0);

        // 当日摂取PFC集計
        List<MealRecord> records = mealRecordRepository.findByUserIdAndRecordDate(userId, date);
        int actualPro = records.stream().mapToInt(MealRecord::getTotalPro).sum();
        int actualFat = records.stream().mapToInt(MealRecord::getTotalFat).sum();
        int actualCar = records.stream().mapToInt(MealRecord::getTotalCar).sum();

        // 不足PFC（超過分は0として扱う）
        int diffPro = Math.max(0, targetPro - actualPro);
        int diffFat = Math.max(0, targetFat - actualFat);
        int diffCar = Math.max(0, targetCar - actualCar);

        // meal_setsを不足PFCとの距離でスコアリングして上位limit件を返す
        List<MealSet> mealSets = mealSetRepository.findByUserId(userId);

        return mealSets.stream()
                .map(set -> {
                    int distance = Math.abs(set.getTotalPro() - diffPro)
                                 + Math.abs(set.getTotalFat() - diffFat)
                                 + Math.abs(set.getTotalCar() - diffCar);
                    return new AbstractMap.SimpleEntry<>(set, distance);
                })
                .sorted(Map.Entry.comparingByValue())
                .limit(limit)
                .map(entry -> {
                    MealSet set = entry.getKey();
                    RecommendationItemDto dto = new RecommendationItemDto();
                    dto.setId(set.getId());
                    dto.setName(set.getName());
                    dto.setTotalPro(set.getTotalPro());
                    dto.setTotalFat(set.getTotalFat());
                    dto.setTotalCar(set.getTotalCar());
                    dto.setTotalCal(set.getTotalCal());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}