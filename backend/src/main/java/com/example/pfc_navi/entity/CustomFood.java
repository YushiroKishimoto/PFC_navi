package com.example.pfc_navi.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "custom_foods")
public class CustomFood {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "login_id", nullable = false, length = 20)
    private String loginId;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "amount", nullable = false)
    private Integer amount;

    @Column(name = "pro", nullable = false)
    private Integer pro;

    @Column(name = "fat", nullable = false)
    private Integer fat;

    @Column(name = "car", nullable = false)
    private Integer car;

    @Column(name = "cal", nullable = false)
    private Integer cal;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public CustomFood() {
    }

    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }

    public Integer getId() {
        return id;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getLoginId() {
        return loginId;
    }

    public String getName() {
        return name;
    }

    public Integer getAmount() {
        return amount;
    }

    public Integer getPro() {
        return pro;
    }

    public Integer getFat() {
        return fat;
    }

    public Integer getCar() {
        return car;
    }

    public Integer getCal() {
        return cal;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setLoginId(String loginId) {
        this.loginId = loginId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public void setPro(Integer pro) {
        this.pro = pro;
    }

    public void setFat(Integer fat) {
        this.fat = fat;
    }

    public void setCar(Integer car) {
        this.car = car;
    }

    public void setCal(Integer cal) {
        this.cal = cal;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}