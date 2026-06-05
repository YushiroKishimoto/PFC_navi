package com.example.pfc_navi.repository;

import com.example.pfc_navi.entity.MealSetItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MealSetItemRepository extends JpaRepository<MealSetItem, Integer> {
    List<MealSetItem> findBySetFoodId(Integer setFoodId);
    void deleteBySetFoodId(Integer setFoodId);
}
