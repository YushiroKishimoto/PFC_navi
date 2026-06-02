package com.example.pfc_navi.repository;

import com.example.pfc_navi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
