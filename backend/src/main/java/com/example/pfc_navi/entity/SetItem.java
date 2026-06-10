package com.example.pfc_navi.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "meal_set_items")
public class SetItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "set_food_id", nullable = false)
    private Integer setFoodId;

    @Column(name = "item_type", nullable = false, length = 50)
    private String itemType;

    @Column(name = "item_id", nullable = false)
    private Integer itemId;

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

    public SetItem() {
    }

    public Integer getId() {
        return id;
    }

    public Integer getSetFoodId() {
        return setFoodId;
    }

    public String getItemType() {
        return itemType;
    }

    public Integer getItemId() {
        return itemId;
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

    public void setSetFoodId(Integer setFoodId) {
        this.setFoodId = setFoodId;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
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