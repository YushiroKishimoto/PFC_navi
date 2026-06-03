package com.example.pfc_navi.controller;

import com.example.pfc_navi.dto.ApiResponse;
import com.example.pfc_navi.dto.ItemSearchResponse;
import com.example.pfc_navi.entity.CustomFood;
import com.example.pfc_navi.entity.DefaultFood;
import com.example.pfc_navi.repository.CustomFoodRepository;
import com.example.pfc_navi.repository.DefaultFoodRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final DefaultFoodRepository defaultFoodRepository;
    private final CustomFoodRepository customFoodRepository;

    public ItemController(
            DefaultFoodRepository defaultFoodRepository,
            CustomFoodRepository customFoodRepository
    ) {
        this.defaultFoodRepository = defaultFoodRepository;
        this.customFoodRepository = customFoodRepository;
    }

    @GetMapping("/search")
    public ApiResponse<Map<String, List<ItemSearchResponse>>> searchItems(
            @RequestParam String keyword
    ) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return ApiResponse.validationError(
                    "検索キーワードを入力してください。",
                    Map.of("items", List.of())
            );
        }

        String searchKeyword = keyword.trim();

        List<ItemSearchResponse> items = new ArrayList<>();

        List<DefaultFood> defaultFoods =
                defaultFoodRepository.findByNameContaining(searchKeyword);

        for (DefaultFood food : defaultFoods) {
            items.add(new ItemSearchResponse(
                    "default",
                    food.getId(),
                    food.getName(),
                    food.getAmount(),
                    food.getPro(),
                    food.getFat(),
                    food.getCar(),
                    food.getCal()
            ));
        }

        List<CustomFood> customFoods =
                customFoodRepository.findByNameContaining(searchKeyword);

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

        return ApiResponse.success(
                "検索完了",
                Map.of("items", items)
        );
    }
}