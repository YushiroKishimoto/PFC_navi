package com.example.pfc_navi.service;

import com.example.pfc_navi.entity.Account;
import com.example.pfc_navi.repository.AccountRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Account register(String loginId, String rawPassword) {
        // 同じloginIdが既に存在する場合はエラー
        if (accountRepository.findByLoginId(loginId).isPresent()) {
            throw new IllegalArgumentException("このログインIDは既に使用されています");
        }

        Account account = new Account();
        account.setLoginId(loginId);
        account.setPassword(passwordEncoder.encode(rawPassword));

        return accountRepository.save(account);
    }
}