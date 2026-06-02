package com.example.pfc_navi.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "login_id", nullable = false, unique = true, length = 20)
    private String loginId;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    public Account() {
    }

    public Integer getUserId() {
        return userId;
    }

    public String getLoginId() {
        return loginId;
    }

    public String getPassword() {
        return password;
    }


    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setLoginId(String loginId) {
        this.loginId = loginId;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}