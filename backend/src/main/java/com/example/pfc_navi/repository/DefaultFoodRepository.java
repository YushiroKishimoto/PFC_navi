package com.example.pfc_navi.repository;

import com.example.pfc_navi.entity.DefaultFood;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DefaultFoodRepository extends JpaRepository<DefaultFood, Integer> {

    List<DefaultFood> findByNameContaining(String keyword);
}