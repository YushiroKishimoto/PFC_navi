package com.example.pfc_navi.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class PasswordResetRequest {

    @NotEmpty(message = "ログインIDは必須です")
    private String loginId;

    @NotEmpty(message = "セキュリティ質問の回答は必須です")
    private String securityAnswer;

    @NotEmpty(message = "新しいパスワードは必須です")
    @Size(min = 8, message = "パスワードは8文字以上で入力してください")
    private String newPassword;

    public String getLoginId() {
        return loginId;
    }

    public String getSecurityAnswer() {
        return securityAnswer;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setLoginId(String loginId) {
        this.loginId = loginId;
    }

    public void setSecurityAnswer(String securityAnswer) {
        this.securityAnswer = securityAnswer;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}