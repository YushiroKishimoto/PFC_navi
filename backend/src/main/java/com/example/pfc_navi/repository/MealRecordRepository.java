package com.example.pfc_navi.repository;

import com.example.pfc_navi.entity.MealRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealRecordRepository extends JpaRepository<MealRecord, Integer> {
}
