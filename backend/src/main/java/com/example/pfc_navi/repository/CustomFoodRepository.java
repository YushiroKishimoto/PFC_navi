package com.example.pfc_navi.repository;

import com.example.pfc_navi.entity.CustomFood;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CustomFoodRepository extends JpaRepository<CustomFood, Integer> {

    List<CustomFood> findByNameContaining(String keyword);
    Optional<CustomFood> findByIdAndUserId(Integer id, Integer userId);
}