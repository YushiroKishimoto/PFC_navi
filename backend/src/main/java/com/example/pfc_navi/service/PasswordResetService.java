package com.example.pfc_navi.service;

import com.example.pfc_navi.entity.Account;
import com.example.pfc_navi.repository.AccountRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordResetService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public PasswordResetService(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void resetPassword(String loginId, String securityAnswer, String newPassword) {
        Account account = accountRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException("ログインIDまたはセキュリティ質問の回答が正しくありません"));

        if (account.getSecurityAnswerHash() == null
                || !passwordEncoder.matches(normalizeAnswer(securityAnswer), account.getSecurityAnswerHash())) {
            throw new IllegalArgumentException("ログインIDまたはセキュリティ質問の回答が正しくありません");
        }

        account.setPassword(passwordEncoder.encode(newPassword));
        accountRepository.save(account);
    }

    // 登録時（UserService）と同じルールで正規化する
    private String normalizeAnswer(String answer) {
        return answer == null ? "" : answer.trim().toLowerCase();
    }
}