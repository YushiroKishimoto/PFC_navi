package com.example.pfc_navi.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "meal_sets")
public class SetFood {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "login_id", nullable = false, length = 20)
    private String loginId;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "total_pro", nullable = false)
    private Integer totalPro;

    @Column(name = "total_fat", nullable = false)
    private Integer totalFat;

    @Column(name = "total_car", nullable = false)
    private Integer totalCar;

    @Column(name = "total_cal", nullable = false)
    private Integer totalCal;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public SetFood() {
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

    public Integer getTotalPro() {
        return totalPro;
    }

    public Integer getTotalFat() {
        return totalFat;
    }

    public Integer getTotalCar() {
        return totalCar;
    }

    public Integer getTotalCal() {
        return totalCal;
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

    public void setTotalPro(Integer totalPro) {
        this.totalPro = totalPro;
    }

    public void setTotalFat(Integer totalFat) {
        this.totalFat = totalFat;
    }

    public void setTotalCar(Integer totalCar) {
        this.totalCar = totalCar;
    }

    public void setTotalCal(Integer totalCal) {
        this.totalCal = totalCal;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}