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

    public Account register(String loginId, String rawPassword, String securityAnswer) {
        // 同じloginIdが既に存在する場合はエラー
        if (accountRepository.findByLoginId(loginId).isPresent()) {
            throw new IllegalArgumentException("このログインIDは既に使用されています");
        }

        Account account = new Account();
        account.setLoginId(loginId);
        account.setPassword(passwordEncoder.encode(rawPassword));
        account.setSecurityAnswerHash(passwordEncoder.encode(normalizeAnswer(securityAnswer)));

        return accountRepository.save(account);
    }

    // 回答は表記ゆれで一致しなくなるのを防ぐため、前後空白除去・小文字化してから扱う
    private String normalizeAnswer(String answer) {
        return answer == null ? "" : answer.trim().toLowerCase();
    }
}