package com.example.pfc_navi.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "default_foods")
public class DefaultFood {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

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

    public DefaultFood() {
    }

    public Integer getId() {
        return id;
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

    public void setId(Integer id) {
        this.id = id;
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
}