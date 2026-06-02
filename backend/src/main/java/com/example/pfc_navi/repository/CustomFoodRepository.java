package com.example.pfc_navi.repository;

import com.example.pfc_navi.entity.CustomFood;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomFoodRepository extends JpaRepository<CustomFood, Integer> {
}
