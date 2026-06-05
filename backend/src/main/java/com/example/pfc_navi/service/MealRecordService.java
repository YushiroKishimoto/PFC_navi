package com.example.pfc_navi.service;

import com.example.pfc_navi.dto.*;
import com.example.pfc_navi.entity.CustomFood;
import com.example.pfc_navi.entity.DefaultFood;
import com.example.pfc_navi.entity.MealRecord;
import com.example.pfc_navi.entity.MealRecordItem;
import com.example.pfc_navi.entity.MealSet;
import com.example.pfc_navi.entity.User;
import com.example.pfc_navi.repository.CustomFoodRepository;
import com.example.pfc_navi.repository.DefaultFoodRepository;
import com.example.pfc_navi.repository.MealRecordItemRepository;
import com.example.pfc_navi.repository.MealRecordRepository;
import com.example.pfc_navi.repository.MealSetRepository;
import com.example.pfc_navi.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class MealRecordService {

    private final MealRecordRepository mealRecordRepository;
    private final MealRecordItemRepository mealRecordItemRepository;
    private final DefaultFoodRepository defaultFoodRepository;
    private final CustomFoodRepository customFoodRepository;
    private final UserRepository userRepository;
    private final MealSetRepository mealSetRepository;

    public MealRecordService(
            MealRecordRepository mealRecordRepository,
            MealRecordItemRepository mealRecordItemRepository,
            DefaultFoodRepository defaultFoodRepository,
            CustomFoodRepository customFoodRepository,
            UserRepository userRepository,
            MealSetRepository mealSetRepository) {
        this.mealRecordRepository = mealRecordRepository;
        this.mealRecordItemRepository = mealRecordItemRepository;
        this.defaultFoodRepository = defaultFoodRepository;
        this.customFoodRepository = customFoodRepository;
        this.userRepository = userRepository;
        this.mealSetRepository = mealSetRepository;
    }

    @Transactional
    public MealRecordCreateResponse createMealRecord(MealRecordRequest request, Integer userId) {
        validateRequest(request);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("ユーザーが見つかりません"));

        MealRecord mealRecord = new MealRecord();
        mealRecord.setUserId(userId);
        mealRecord.setLoginId(user.getLoginId());
        mealRecord.setRecordDate(request.getRecordDate());
        mealRecord.setMealType(request.getMealType());

        mealRecord.setTotalCal(0);
        mealRecord.setTotalPro(0);
        mealRecord.setTotalFat(0);
        mealRecord.setTotalCar(0);

        MealRecord savedMealRecord = mealRecordRepository.save(mealRecord);

        int mealCal = 0;
        int mealPro = 0;
        int mealFat = 0;
        int mealCar = 0;

        for (MealRecordItemRequest itemRequest : request.getItems()) {
            MealRecordItem calculatedItem = createCalculatedMealRecordItem(
                    savedMealRecord.getId(),
                    itemRequest);

            mealRecordItemRepository.save(calculatedItem);

            mealCal += calculatedItem.getCal();
            mealPro += calculatedItem.getPro();
            mealFat += calculatedItem.getFat();
            mealCar += calculatedItem.getCar();
        }

        savedMealRecord.setTotalCal(mealCal);
        savedMealRecord.setTotalPro(mealPro);
        savedMealRecord.setTotalFat(mealFat);
        savedMealRecord.setTotalCar(mealCar);

        mealRecordRepository.save(savedMealRecord);

        NutritionTotalResponse dailyTotal = calculateDailyTotal(userId, request.getRecordDate());

        return new MealRecordCreateResponse(
                savedMealRecord.getId(),
                savedMealRecord.getMealType(),
                dailyTotal);
    }

    public MealRecordListResponse getMealRecordsByDate(LocalDate date, Integer userId) {
        if (date == null) {
            throw new IllegalArgumentException("dateは必須です。");
        }

        List<MealRecord> records = mealRecordRepository.findByUserIdAndRecordDate(userId, date);

        List<MealRecordMealResponse> meals = new ArrayList<>();

        int dailyCal = 0;
        int dailyPro = 0;
        int dailyFat = 0;
        int dailyCar = 0;

        for (MealRecord record : records) {
            List<MealRecordItem> recordItems = mealRecordItemRepository.findByMealRecordId(record.getId());

            List<MealRecordItemResponse> itemResponses = new ArrayList<>();

            int mealCal = 0;
            int mealPro = 0;
            int mealFat = 0;
            int mealCar = 0;

            for (MealRecordItem item : recordItems) {
                itemResponses.add(new MealRecordItemResponse(
                        item.getId(),
                        item.getItemId(),
                        resolveItemName(item),
                        item.getAmount(),
                        item.getCal(),
                        item.getPro(),
                        item.getFat(),
                        item.getCar()));

                mealCal += item.getCal();
                mealPro += item.getPro();
                mealFat += item.getFat();
                mealCar += item.getCar();
            }

            dailyCal += mealCal;
            dailyPro += mealPro;
            dailyFat += mealFat;
            dailyCar += mealCar;

            meals.add(new MealRecordMealResponse(
                    record.getId(),
                    record.getMealType(),
                    itemResponses,
                    new NutritionTotalResponse(mealCal, mealPro, mealFat, mealCar)));
        }

        return new MealRecordListResponse(
                date,
                meals,
                new NutritionTotalResponse(dailyCal, dailyPro, dailyFat, dailyCar));
    }

    private NutritionTotalResponse calculateDailyTotal(Integer userId, LocalDate date) {
        List<MealRecord> records = mealRecordRepository.findByUserIdAndRecordDate(userId, date);

        int totalCal = 0;
        int totalPro = 0;
        int totalFat = 0;
        int totalCar = 0;

        for (MealRecord record : records) {
            List<MealRecordItem> items = mealRecordItemRepository.findByMealRecordId(record.getId());

            for (MealRecordItem item : items) {
                totalCal += item.getCal();
                totalPro += item.getPro();
                totalFat += item.getFat();
                totalCar += item.getCar();
            }
        }

        return new NutritionTotalResponse(totalCal, totalPro, totalFat, totalCar);
    }

    @Transactional
    public NutritionTotalResponse deleteMealRecord(Integer mealRecordId, Integer userId) {
        if (mealRecordId == null) {
            throw new IllegalArgumentException("mealRecordIdは必須です。");
        }

        MealRecord mealRecord = mealRecordRepository.findById(mealRecordId)
                .orElseThrow(() -> new IllegalArgumentException("対象の食事記録が存在しません。"));

        LocalDate recordDate = mealRecord.getRecordDate();

        mealRecordItemRepository.deleteByMealRecordId(mealRecordId);

        mealRecordRepository.delete(mealRecord);

        return calculateDailyTotal(userId, recordDate);
    }

    private MealRecordItem createCalculatedMealRecordItem(
            Integer mealRecordId,
            MealRecordItemRequest itemRequest) {
        if ("default".equals(itemRequest.getSource())) {
            DefaultFood food = defaultFoodRepository.findById(itemRequest.getItemId())
                    .orElseThrow(() -> new IllegalArgumentException("default_foodsに対象データが存在しません。"));

            return buildMealRecordItem(
                    mealRecordId,
                    "default",
                    food.getId(),
                    itemRequest.getAmount(),
                    food.getAmount(),
                    food.getCal(),
                    food.getPro(),
                    food.getFat(),
                    food.getCar());
        }

        if ("custom".equals(itemRequest.getSource())) {
            CustomFood food = customFoodRepository.findById(itemRequest.getItemId())
                    .orElseThrow(() -> new IllegalArgumentException("custom_foodsに対象データが存在しません。"));

            return buildMealRecordItem(
                    mealRecordId,
                    "custom",
                    food.getId(),
                    itemRequest.getAmount(),
                    food.getAmount(),
                    food.getCal(),
                    food.getPro(),
                    food.getFat(),
                    food.getCar());
        }

        if ("set".equals(itemRequest.getSource())) {
            MealSet mealSet = mealSetRepository.findById(itemRequest.getItemId())
                    .orElseThrow(() -> new IllegalArgumentException("meal_setsに対象データが存在しません。"));

            return buildMealRecordItem(
                    mealRecordId,
                    "set",
                    mealSet.getId(),
                    itemRequest.getAmount(),
                    1,
                    mealSet.getTotalCal(),
                    mealSet.getTotalPro(),
                    mealSet.getTotalFat(),
                    mealSet.getTotalCar());
        }

        throw new IllegalArgumentException("sourceは default / custom / set のいずれかを指定してください。");
    }

    private MealRecordItem buildMealRecordItem(
            Integer mealRecordId,
            String itemType,
            Integer itemId,
            Integer eatenAmount,
            Integer baseAmount,
            Integer baseCal,
            Integer basePro,
            Integer baseFat,
            Integer baseCar) {
        if (baseAmount == null || baseAmount <= 0) {
            throw new IllegalArgumentException("食品の基準量が不正です。");
        }

        double rate = eatenAmount.doubleValue() / baseAmount.doubleValue();

        MealRecordItem item = new MealRecordItem();
        item.setMealRecordId(mealRecordId);
        item.setItemType(itemType);
        item.setItemId(itemId);
        item.setAmount(eatenAmount);
        item.setCal((int) Math.round(baseCal * rate));
        item.setPro((int) Math.round(basePro * rate));
        item.setFat((int) Math.round(baseFat * rate));
        item.setCar((int) Math.round(baseCar * rate));

        return item;
    }

    private String resolveItemName(MealRecordItem item) {
        if ("default".equals(item.getItemType())) {
            return defaultFoodRepository.findById(item.getItemId())
                    .map(DefaultFood::getName)
                    .orElse("不明な食品");
        }

        if ("custom".equals(item.getItemType())) {
            return customFoodRepository.findById(item.getItemId())
                    .map(CustomFood::getName)
                    .orElse("不明な食品");
        }

        if ("set".equals(item.getItemType())) {
            return mealSetRepository.findById(item.getItemId())
                    .map(MealSet::getName)
                    .orElse("不明なセット");
        }

        return "不明な食品";
    }

    private void validateRequest(MealRecordRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("リクエストが空です。");
        }

        if (request.getRecordDate() == null) {
            throw new IllegalArgumentException("recordDateは必須です。");
        }

        if (request.getMealType() == null || request.getMealType().isBlank()) {
            throw new IllegalArgumentException("mealTypeは必須です。");
        }

        if (!request.getMealType().equals("breakfast")
                && !request.getMealType().equals("lunch")
                && !request.getMealType().equals("dinner")) {
            throw new IllegalArgumentException("mealTypeは breakfast / lunch / dinner のいずれかを指定してください。");
        }

        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new IllegalArgumentException("itemsは1件以上必要です。");
        }

        for (MealRecordItemRequest item : request.getItems()) {
            if (item.getSource() == null || item.getSource().isBlank()) {
                throw new IllegalArgumentException("items[].sourceは必須です。");
            }

            if (!item.getSource().equals("default")
                    && !item.getSource().equals("custom")
                    && !item.getSource().equals("set")) {
                throw new IllegalArgumentException("items[].sourceは default / custom / set のいずれかを指定してください。");
            }

            if (item.getItemId() == null) {
                throw new IllegalArgumentException("items[].itemIdは必須です。");
            }

            if (item.getAmount() == null || item.getAmount() <= 0) {
                throw new IllegalArgumentException("items[].amountは1以上で指定してください。");
            }
        }
    }
}