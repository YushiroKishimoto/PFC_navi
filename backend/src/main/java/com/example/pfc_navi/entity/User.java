package com.example.pfc_navi.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "users")
public class User {

    @Id
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "login_id", nullable = false, unique = true, length = 20)
    private String loginId;

    @Column(name = "age", nullable = false)
    private Integer age;

    @Column(name = "sex", nullable = false, length = 10)
    private String sex;

    @Column(name = "height", nullable = false)
    private BigDecimal height;

    @Column(name = "weight", nullable = false)
    private BigDecimal weight;

    @Column(name = "burn_cal", nullable = false)
    private BigDecimal burnCal;

    @Column(name = "target_cal", nullable = false)
    private Integer targetCal;

    @Column(name = "pfc_course", nullable = false)
    private Integer pfcCourse;

    public User() {
    }

    public Integer getUserId() {
        return userId;
    }

    public String getLoginId() {
        return loginId;
    }

    public Integer getAge() {
        return age;
    }

    public String getSex() {
        return sex;
    }

    public BigDecimal getHeight() {
        return height;
    }

    public BigDecimal getWeight() {
        return weight;
    }

    public BigDecimal getBurnCal() {
        return burnCal;
    }

    public Integer getTargetCal() {
        return targetCal;
    }

    public Integer getPfcCourse() {
        return pfcCourse;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setLoginId(String loginId) {
        this.loginId = loginId;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public void setHeight(BigDecimal height) {
        this.height = height;
    }

    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }

    public void setBurnCal(BigDecimal burnCal) {
        this.burnCal = burnCal;
    }

    public void setTargetCal(Integer targetCal) {
        this.targetCal = targetCal;
    }

    public void setPfcCourse(Integer pfcCourse) {
        this.pfcCourse = pfcCourse;
    }
}
