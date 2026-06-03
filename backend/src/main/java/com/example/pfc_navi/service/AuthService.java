package com.example.pfc_navi.service;

import com.example.pfc_navi.entity.Account;
import com.example.pfc_navi.repository.AccountRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Account login(String loginId, String rawPassword, HttpSession session) {
        Account account = accountRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException("ログインIDまたはパスワードが正しくありません"));

        if (!passwordEncoder.matches(rawPassword, account.getPassword())) {
            throw new IllegalArgumentException("ログインIDまたはパスワードが正しくありません");
        }

        session.setAttribute("userId", account.getUserId());
        session.setAttribute("loginId", account.getLoginId());

        return account;
    }

    public void logout(HttpSession session) {
        session.invalidate();
    }
}