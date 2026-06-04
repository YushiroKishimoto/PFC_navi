package com.example.pfc_navi.service;

import com.example.pfc_navi.dto.UserRequest;
import com.example.pfc_navi.entity.User;
import com.example.pfc_navi.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class UserInfoService {

    private final UserRepository userRepository;

    public UserInfoService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 目標カロリー計算
    private Integer calcTargetCal(UserRequest request) {
        double bmr;
        if ("male".equals(request.getSex())) {
            bmr = 66.5
                + (13.75 * request.getWeight().doubleValue())
                + (5.003 * request.getHeight().doubleValue())
                - (6.755 * request.getAge());
        } else {
            bmr = 655.1
                + (9.563 * request.getWeight().doubleValue())
                + (1.850 * request.getHeight().doubleValue())
                - (4.676 * request.getAge());
        }

        double[] burnCalCoeff = {1.2, 1.375, 1.55, 1.725, 1.9};
        double[] courseCoeff = {0.8, 1.0, 1.2};

        double targetCal = bmr
                * burnCalCoeff[request.getBurnCal() - 1]
                * courseCoeff[request.getPfcCourse() - 1];

        return (int) Math.round(targetCal);
    }

    public User createUser(Integer userId, String loginId, UserRequest request) {
        User user = new User();
        user.setUserId(userId);
        user.setLoginId(loginId);
        user.setAge(request.getAge());
        user.setSex(request.getSex());
        user.setHeight(request.getHeight());
        user.setWeight(request.getWeight());
        user.setBurnCal(BigDecimal.valueOf(request.getBurnCal()));
        user.setTargetCal(calcTargetCal(request));
        user.setPfcCourse(request.getPfcCourse());
        return userRepository.save(user);
    }

    // ユーザー情報取得
    public User getUser(Integer userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("ユーザー情報が見つかりません"));
    }

    // ユーザー情報更新
    public User updateUser(Integer userId, UserRequest request) {
        User user = getUser(userId);
        user.setAge(request.getAge());
        user.setSex(request.getSex());
        user.setHeight(request.getHeight());
        user.setWeight(request.getWeight());
        user.setBurnCal(BigDecimal.valueOf(request.getBurnCal()));
        user.setTargetCal(calcTargetCal(request));
        user.setPfcCourse(request.getPfcCourse());
        return userRepository.save(user);
    }
}