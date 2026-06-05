package com.example.pfc_navi.service;

import com.example.pfc_navi.dto.SetRegisterItemRequest;
import com.example.pfc_navi.dto.SetRegisterRequest;
import com.example.pfc_navi.dto.SetRegisterResponse;
import com.example.pfc_navi.entity.CustomFood;
import com.example.pfc_navi.entity.DefaultFood;
import com.example.pfc_navi.entity.MealSet;
import com.example.pfc_navi.entity.MealSetItem;
import com.example.pfc_navi.repository.CustomFoodRepository;
import com.example.pfc_navi.repository.DefaultFoodRepository;
import com.example.pfc_navi.repository.MealSetItemRepository;
import com.example.pfc_navi.repository.MealSetRepository;
import com.example.pfc_navi.dto.SetSearchItemResponse;
import com.example.pfc_navi.dto.SetSearchResponse;
import com.example.pfc_navi.dto.SetUpdateItemRequest;
import com.example.pfc_navi.dto.SetUpdateRequest;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class SetService {
    private final MealSetRepository mealSetRepository;
    private final MealSetItemRepository mealSetItemRepository;
    private final DefaultFoodRepository defaultFoodRepository;
    private final CustomFoodRepository customFoodRepository;

    public SetService(
            MealSetRepository mealSetRepository,
            MealSetItemRepository mealSetItemRepository,
            DefaultFoodRepository defaultFoodRepository,
            CustomFoodRepository customFoodRepository) {
        this.mealSetRepository = mealSetRepository;
        this.mealSetItemRepository = mealSetItemRepository;
        this.defaultFoodRepository = defaultFoodRepository;
        this.customFoodRepository = customFoodRepository;
    }

    @Transactional
    public SetRegisterResponse registerSet(SetRegisterRequest request) {
        validateRequest(request);

        // TODO: Cookie認証完成後にログイン中ユーザー情報へ変更
        Integer userId = 1;
        String loginId = "test";

        MealSet mealSet = new MealSet();
        mealSet.setUserId(userId);
        mealSet.setLoginId(loginId);
        mealSet.setName(request.getName());
        mealSet.setTotalCal(0);
        mealSet.setTotalPro(0);
        mealSet.setTotalFat(0);
        mealSet.setTotalCar(0);

        MealSet savedSet = mealSetRepository.save(mealSet);

        int totalCal = 0;
        int totalPro = 0;
        int totalFat = 0;
        int totalCar = 0;

        for (SetRegisterItemRequest itemRequest : request.getItems()) {
            MealSetItem item = createCalculatedSetItem(savedSet.getId(), itemRequest);
            mealSetItemRepository.save(item);

            totalCal += item.getCal();
            totalPro += item.getPro();
            totalFat += item.getFat();
            totalCar += item.getCar();
        }

        savedSet.setTotalCal(totalCal);
        savedSet.setTotalPro(totalPro);
        savedSet.setTotalFat(totalFat);
        savedSet.setTotalCar(totalCar);

        MealSet updatedSet = mealSetRepository.save(savedSet);

        return new SetRegisterResponse(
                updatedSet.getId(),
                updatedSet.getName(),
                updatedSet.getTotalCal(),
                updatedSet.getTotalPro(),
                updatedSet.getTotalFat(),
                updatedSet.getTotalCar());
    }

    public List<SetSearchResponse> searchSets(String keyword) {
        String searchKeyword = keyword == null ? "" : keyword.trim();

        List<MealSet> mealSets = mealSetRepository.findByNameContaining(searchKeyword);

        List<SetSearchResponse> responses = new ArrayList<>();

        for (MealSet mealSet : mealSets) {
            List<MealSetItem> mealSetItems = mealSetItemRepository.findBySetFoodId(mealSet.getId());

            List<SetSearchItemResponse> itemResponses = new ArrayList<>();

            for (MealSetItem item : mealSetItems) {
                String itemName = getItemName(item.getItemType(), item.getItemId());

                itemResponses.add(new SetSearchItemResponse(
                        item.getId(),
                        itemName,
                        item.getItemType(),
                        item.getItemId(),
                        item.getAmount(),
                        item.getPro(),
                        item.getFat(),
                        item.getCar(),
                        item.getCal()));
            }

            responses.add(new SetSearchResponse(
                    mealSet.getId(),
                    mealSet.getName(),
                    mealSet.getTotalPro(),
                    mealSet.getTotalFat(),
                    mealSet.getTotalCar(),
                    mealSet.getTotalCal(),
                    itemResponses));
        }

        return responses;
    }

    public SetSearchResponse getSetDetail(Integer id) {
        if (id == null) {
            throw new IllegalArgumentException("idは必須です。");
        }

        MealSet mealSet = mealSetRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("対象のセットが存在しません。"));

        List<MealSetItem> mealSetItems = mealSetItemRepository.findBySetFoodId(mealSet.getId());

        List<SetSearchItemResponse> itemResponses = new ArrayList<>();

        for (MealSetItem item : mealSetItems) {
            String itemName = getItemName(item.getItemType(), item.getItemId());

            itemResponses.add(new SetSearchItemResponse(
                    item.getId(),
                    itemName,
                    item.getItemType(),
                    item.getItemId(),
                    item.getAmount(),
                    item.getPro(),
                    item.getFat(),
                    item.getCar(),
                    item.getCal()));
        }

        return new SetSearchResponse(
                mealSet.getId(),
                mealSet.getName(),
                mealSet.getTotalPro(),
                mealSet.getTotalFat(),
                mealSet.getTotalCar(),
                mealSet.getTotalCal(),
                itemResponses);
    }

    private String getItemName(String itemType, Integer itemId) {
        if ("default".equals(itemType)) {
            return defaultFoodRepository.findById(itemId)
                    .map(DefaultFood::getName)
                    .orElse("不明な食品");
        }

        if ("custom".equals(itemType)) {
            return customFoodRepository.findById(itemId)
                    .map(CustomFood::getName)
                    .orElse("不明な食品");
        }

        return "不明な食品";
    }

    private MealSetItem createCalculatedSetItem(Integer setFoodId, SetRegisterItemRequest itemRequest) {
        if ("default".equals(itemRequest.getSource())) {
            DefaultFood food = defaultFoodRepository.findById(itemRequest.getItemId())
                    .orElseThrow(() -> new IllegalArgumentException("default_foodsに対象データが存在しません。"));

            return buildSetItem(setFoodId, "default", food.getId(), itemRequest.getAmount(),
                    food.getAmount(), food.getCal(), food.getPro(), food.getFat(), food.getCar());
        }

        if ("custom".equals(itemRequest.getSource())) {
            CustomFood food = customFoodRepository.findById(itemRequest.getItemId())
                    .orElseThrow(() -> new IllegalArgumentException("custom_foodsに対象データが存在しません。"));

            return buildSetItem(setFoodId, "custom", food.getId(), itemRequest.getAmount(),
                    food.getAmount(), food.getCal(), food.getPro(), food.getFat(), food.getCar());
        }

        throw new IllegalArgumentException("sourceは default / custom のいずれかを指定してください。");
    }

    private MealSetItem buildSetItem(
            Integer setFoodId,
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

        MealSetItem item = new MealSetItem();
        item.setSetFoodId(setFoodId);
        item.setItemType(itemType);
        item.setItemId(itemId);
        item.setAmount(eatenAmount);
        item.setCal((int) Math.round(baseCal * rate));
        item.setPro((int) Math.round(basePro * rate));
        item.setFat((int) Math.round(baseFat * rate));
        item.setCar((int) Math.round(baseCar * rate));
        return item;
    }

    private void validateRequest(SetRegisterRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("リクエストが空です。");
        }
        if (request.getName() == null || request.getName().isBlank()) {
            throw new IllegalArgumentException("セット名は必須です。");
        }
        if (request.getName().length() > 50) {
            throw new IllegalArgumentException("セット名は50文字以内で入力してください。");
        }
        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new IllegalArgumentException("itemsは1件以上必要です。");
        }

        for (SetRegisterItemRequest item : request.getItems()) {
            if (item.getSource() == null || item.getSource().isBlank()) {
                throw new IllegalArgumentException("items[].sourceは必須です。");
            }
            if (!item.getSource().equals("default") && !item.getSource().equals("custom")) {
                throw new IllegalArgumentException("items[].sourceは default / custom のいずれかを指定してください。");
            }
            if (item.getItemId() == null) {
                throw new IllegalArgumentException("items[].itemIdは必須です。");
            }
            if (item.getAmount() == null || item.getAmount() <= 0) {
                throw new IllegalArgumentException("items[].amountは1以上で指定してください。");
            }
        }
    }

    @Transactional
    public SetSearchResponse updateSet(Integer id, SetUpdateRequest request) {
        if (id == null) {
            throw new IllegalArgumentException("idは必須です。");
        }

        validateUpdateRequest(request);

        MealSet mealSet = mealSetRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("対象のセットが存在しません。"));

        mealSetItemRepository.deleteBySetFoodId(id);

        int totalCal = 0;
        int totalPro = 0;
        int totalFat = 0;
        int totalCar = 0;

        for (SetUpdateItemRequest itemRequest : request.getItems()) {
            SetRegisterItemRequest registerItemRequest = new SetRegisterItemRequest();
            registerItemRequest.setSource(itemRequest.getSource());
            registerItemRequest.setItemId(itemRequest.getItemId());
            registerItemRequest.setAmount(itemRequest.getAmount());

            MealSetItem item = createCalculatedSetItem(id, registerItemRequest);

            mealSetItemRepository.save(item);

            totalCal += item.getCal();
            totalPro += item.getPro();
            totalFat += item.getFat();
            totalCar += item.getCar();
        }

        mealSet.setName(request.getName());
        mealSet.setTotalCal(totalCal);
        mealSet.setTotalPro(totalPro);
        mealSet.setTotalFat(totalFat);
        mealSet.setTotalCar(totalCar);

        mealSetRepository.save(mealSet);

        return getSetDetail(id);
    }

    @Transactional
    public void deleteSet(Integer id) {
        if (id == null) {
            throw new IllegalArgumentException("idは必須です。");
        }

        MealSet mealSet = mealSetRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("対象のセットが存在しません。"));

        mealSetItemRepository.deleteBySetFoodId(id);

        mealSetRepository.delete(mealSet);
    }

    private void validateUpdateRequest(SetUpdateRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("リクエストが空です。");
        }

        if (request.getName() == null || request.getName().isBlank()) {
            throw new IllegalArgumentException("セット名は必須です。");
        }

        if (request.getName().length() > 50) {
            throw new IllegalArgumentException("セット名は50文字以内で入力してください。");
        }

        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new IllegalArgumentException("itemsは1件以上必要です。");
        }

        for (SetUpdateItemRequest item : request.getItems()) {
            if (item.getSource() == null || item.getSource().isBlank()) {
                throw new IllegalArgumentException("items[].sourceは必須です。");
            }

            if (!item.getSource().equals("default")
                    && !item.getSource().equals("custom")) {
                throw new IllegalArgumentException("items[].sourceは default / custom のいずれかを指定してください。");
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
