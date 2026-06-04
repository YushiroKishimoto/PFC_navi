package com.example.pfc_navi.repository;

import com.example.pfc_navi.entity.MealRecordItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MealRecordItemRepository extends JpaRepository<MealRecordItem, Integer> {

    List<MealRecordItem> findByMealRecordId(Integer mealRecordId);

    void deleteByMealRecordId(Integer mealRecordId);
}