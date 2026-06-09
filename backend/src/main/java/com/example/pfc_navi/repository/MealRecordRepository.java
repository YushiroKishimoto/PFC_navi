package com.example.pfc_navi.repository;

import com.example.pfc_navi.entity.CustomFood;
import com.example.pfc_navi.entity.MealRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface MealRecordRepository extends JpaRepository<MealRecord, Integer> {

    List<MealRecord> findByUserIdAndRecordDate(Integer userId, LocalDate recordDate);
    Optional<MealRecord> findByIdAndUserId(Integer id, Integer userId);

}