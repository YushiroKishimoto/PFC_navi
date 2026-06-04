package com.example.pfc_navi.repository;

import com.example.pfc_navi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUserId(Integer userId);
}