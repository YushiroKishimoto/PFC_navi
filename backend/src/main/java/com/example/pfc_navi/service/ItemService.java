package com.example.pfc_navi.service;

import com.example.pfc_navi.dto.CustomItemCreateResponse;
import com.example.pfc_navi.dto.CustomItemRequest;
import com.example.pfc_navi.entity.CustomFood;
import com.example.pfc_navi.repository.CustomFoodRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ItemService {

    private final CustomFoodRepository customFoodRepository;

    public ItemService(CustomFoodRepository customFoodRepository) {
        this.customFoodRepository = customFoodRepository;
    }

    @Transactional
    public CustomItemCreateResponse createCustomItem(CustomItemRequest request) {
        validateRequest(request);

        // TODO: Cookie認証完成後にログイン中ユーザー情報へ変更
        Integer userId = 1;
        String loginId = "test";

        CustomFood customFood = new CustomFood();
        customFood.setUserId(userId);
        customFood.setLoginId(loginId);
        customFood.setName(request.getName());
        customFood.setAmount(request.getAmount());
        customFood.setPro(request.getPro());
        customFood.setFat(request.getFat());
        customFood.setCar(request.getCar());
        customFood.setCal(request.getCal());

        CustomFood saved = customFoodRepository.save(customFood);

        return new CustomItemCreateResponse(saved.getId());
    }

    @Transactional
    public void deleteCustomItem(Integer id) {
        if (id == null) {
            throw new IllegalArgumentException("idは必須です。");
        }

        CustomFood customFood = customFoodRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("対象の自前食材・料理が存在しません。"));

        customFoodRepository.delete(customFood);
    }

    private void validateRequest(CustomItemRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("リクエストが空です。");
        }

        if (request.getName() == null || request.getName().isBlank()) {
            throw new IllegalArgumentException("nameは必須です。");
        }

        if (request.getName().length() > 50) {
            throw new IllegalArgumentException("nameは50文字以内で入力してください。");
        }

        if (request.getAmount() == null || request.getAmount() <= 0) {
            throw new IllegalArgumentException("amountは1以上で指定してください。");
        }

        if (request.getPro() == null || request.getPro() < 0) {
            throw new IllegalArgumentException("proは0以上で指定してください。");
        }

        if (request.getFat() == null || request.getFat() < 0) {
            throw new IllegalArgumentException("fatは0以上で指定してください。");
        }

        if (request.getCar() == null || request.getCar() < 0) {
            throw new IllegalArgumentException("carは0以上で指定してください。");
        }

        if (request.getCal() == null || request.getCal() < 0) {
            throw new IllegalArgumentException("calは0以上で指定してください。");
        }
    }
}