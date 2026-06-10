package com.example.pfc_navi.service;

import com.example.pfc_navi.dto.CustomItemCreateResponse;
import com.example.pfc_navi.dto.CustomItemRequest;
import com.example.pfc_navi.entity.CustomFood;
import com.example.pfc_navi.entity.User;
import com.example.pfc_navi.repository.CustomFoodRepository;
import com.example.pfc_navi.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.pfc_navi.dto.CustomItemResponse;
import com.example.pfc_navi.dto.CustomItemUpdateRequest;

import com.example.pfc_navi.dto.ItemSearchResponse;
import java.util.ArrayList;
import java.util.List;

@Service
public class ItemService {

    private final CustomFoodRepository customFoodRepository;
    private final UserRepository userRepository;

    public ItemService(
        CustomFoodRepository customFoodRepository,
        UserRepository userRepository) {
        this.customFoodRepository = customFoodRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public CustomItemCreateResponse createCustomItem(CustomItemRequest request, Integer userId) {
        validateRequest(request);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("ユーザーが見つかりません"));

        CustomFood customFood = new CustomFood();
        customFood.setUserId(userId);
        customFood.setLoginId(user.getLoginId());
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
    public void deleteCustomItem(Integer id, Integer userId) {
        if (id == null) {
            throw new IllegalArgumentException("idは必須です。");
        }

        CustomFood customFood = customFoodRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new IllegalArgumentException("対象の自前食材・料理が存在しません。"));

        customFoodRepository.delete(customFood);
    }

    @Transactional
    public CustomItemResponse updateCustomItem(Integer id, CustomItemUpdateRequest request, Integer userId) {
        if (id == null) {
            throw new IllegalArgumentException("idは必須です。");
        }

        validateUpdateRequest(request);

        CustomFood customFood = customFoodRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new IllegalArgumentException("対象の自前食材・料理が存在しません。"));

        customFood.setName(request.getName());
        customFood.setAmount(request.getAmount());
        customFood.setPro(request.getPro());
        customFood.setFat(request.getFat());
        customFood.setCar(request.getCar());
        customFood.setCal(request.getCal());

        CustomFood saved = customFoodRepository.save(customFood);

        return new CustomItemResponse(
                saved.getId(),
                saved.getName(),
                saved.getAmount(),
                saved.getPro(),
                saved.getFat(),
                saved.getCar(),
                saved.getCal()
        );
    }

    public List<ItemSearchResponse> searchCustomItems(String keyword, Integer userId) {
    String searchKeyword = keyword == null ? "" : keyword.trim();

    List<CustomFood> customFoods;

    if (searchKeyword.isEmpty()) {
        customFoods = customFoodRepository.findTop5ByUserIdOrderByIdDesc(userId);
    } else {
        customFoods = customFoodRepository.findByNameContainingAndUserId(searchKeyword, userId);
    }

    List<ItemSearchResponse> items = new ArrayList<>();

    for (CustomFood food : customFoods) {
        items.add(new ItemSearchResponse(
                "custom",
                food.getId(),
                food.getName(),
                food.getAmount(),
                food.getPro(),
                food.getFat(),
                food.getCar(),
                food.getCal()
        ));
    }

    return items;
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

    private void validateUpdateRequest(CustomItemUpdateRequest request) {
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