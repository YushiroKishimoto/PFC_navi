package com.example.pfc_navi.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public class UserRequest {

    @NotNull(message = "年齢は必須です")
    @Min(value = 0, message = "年齢は0以上で入力してください")
    private Integer age;

    @NotBlank(message = "性別は必須です")
    private String sex;

    @NotNull(message = "身長は必須です")
    @DecimalMin(value = "0.0", message = "身長は0以上で入力してください")
    private BigDecimal height;

    @NotNull(message = "体重は必須です")
    @DecimalMin(value = "0.0", message = "体重は0以上で入力してください")
    private BigDecimal weight;

    @NotNull(message = "活動量は必須です")
    @Min(value = 1, message = "活動量は1〜5で入力してください")
    @Max(value = 5, message = "活動量は1〜5で入力してください")
    private Integer burnCal;

    @NotNull(message = "目標コースは必須です")
    @Min(value = 1, message = "目標コースは1〜3で入力してください")
    @Max(value = 3, message = "目標コースは1〜3で入力してください")
    private Integer pfcCourse;

    public Integer getAge() { return age; }
    public String getSex() { return sex; }
    public BigDecimal getHeight() { return height; }
    public BigDecimal getWeight() { return weight; }
    public Integer getBurnCal() { return burnCal; }
    public Integer getPfcCourse() { return pfcCourse; }

    public void setAge(Integer age) { this.age = age; }
    public void setSex(String sex) { this.sex = sex; }
    public void setHeight(BigDecimal height) { this.height = height; }
    public void setWeight(BigDecimal weight) { this.weight = weight; }
    public void setBurnCal(Integer burnCal) { this.burnCal = burnCal; }
    public void setPfcCourse(Integer pfcCourse) { this.pfcCourse = pfcCourse; }
}