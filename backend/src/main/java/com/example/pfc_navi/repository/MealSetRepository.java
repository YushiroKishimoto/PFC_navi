package com.example.pfc_navi.repository;

import com.example.pfc_navi.entity.MealSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealSetRepository extends JpaRepository<MealSet, Integer> {
    List<MealSet> findByUserId(Integer userId);
    List<MealSet> findByNameContaining(String keyword);
}