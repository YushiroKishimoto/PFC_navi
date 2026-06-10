package com.example.pfc_navi.repository;

import com.example.pfc_navi.entity.CustomFood;
import com.example.pfc_navi.entity.MealSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MealSetRepository extends JpaRepository<MealSet, Integer> {
    List<MealSet> findByUserId(Integer userId);
    List<MealSet> findByNameContainingAndUserId(String keyword, Integer userId);
    Optional<MealSet> findByIdAndUserId(Integer id, Integer userId);

    List<MealSet> findTop5ByUserIdOrderByIdDesc(Integer userId);
}