package com.example.pfc_navi.repository;

import com.example.pfc_navi.entity.MealSet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MealSetRepository extends JpaRepository<MealSet, Integer> {
    List<MealSet> findByNameContaining(String keyword);
}
