package com.example.pfc_navi.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class RegisterRequest {

    @NotEmpty(message = "ログインIDは必須です")
    @Size(max = 20, message = "ログインIDは20文字以内で入力してください")
    private String loginId;

    @NotEmpty(message = "パスワードは必須です")
    @Size(min = 8, message = "パスワードは8文字以上で入力してください")
    private String password;

    @NotEmpty(message = "セキュリティ質問の回答は必須です")
    @Size(max = 100, message = "回答は100文字以内で入力してください")
    private String securityAnswer;

    public String getLoginId() {
        return loginId;
    }

    public String getPassword() {
        return password;
    }

    public String getSecurityAnswer() {
        return securityAnswer;
    }

    public void setLoginId(String loginId) {
        this.loginId = loginId;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setSecurityAnswer(String securityAnswer) {
        this.securityAnswer = securityAnswer;
    }
}