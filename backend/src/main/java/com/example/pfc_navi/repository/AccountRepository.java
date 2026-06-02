package com.example.pfc_navi.repository;

import com.example.pfc_navi.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Integer> {
    Optional<Account> findByLoginId(String loginId);
}
