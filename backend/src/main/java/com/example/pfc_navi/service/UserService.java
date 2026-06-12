package com.example.pfc_navi.service;

import com.example.pfc_navi.entity.Account;
import com.example.pfc_navi.entity.CustomFood;
import com.example.pfc_navi.repository.AccountRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.pfc_navi.repository.CustomFoodRepository;

import java.util.List;

@Service
public class UserService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomFoodRepository customFoodRepository;

    public UserService(AccountRepository accountRepository, PasswordEncoder passwordEncoder,CustomFoodRepository customFoodRepository) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.customFoodRepository = customFoodRepository;
    }

    public Account register(String loginId, String rawPassword, String securityAnswer) {
        // 同じloginIdが既に存在する場合はエラ
        if (accountRepository.findByLoginId(loginId).isPresent()) {
            throw new IllegalArgumentException("このログインIDは既に使用されています");
        }

        Account account = new Account();
        account.setLoginId(loginId);
        account.setPassword(passwordEncoder.encode(rawPassword));
        account.setSecurityAnswerHash(passwordEncoder.encode(normalizeAnswer(securityAnswer)));


        // 新規登録ユーザー用のcustom_foods初期値を作成
        Account savedAccount = accountRepository.save(account);
        createInitialCustomFoods(savedAccount.getUserId(), savedAccount.getLoginId());

        return savedAccount;
    }

    // 回答は表記ゆれで一致しなくなるのを防ぐため、前後空白除去・小文字化してから扱う
    private String normalizeAnswer(String answer) {
        return answer == null ? "" : answer.trim().toLowerCase();
    }

        private void createInitialCustomFoods(Integer userId, String loginId) {
        List<CustomFood> foods = List.of(
                createCustomFood(userId, loginId, "鶏むね肉", 100, 165, 31, 4, 0),
                createCustomFood(userId, loginId, "鮭", 100, 208, 22, 13, 0),
                createCustomFood(userId, loginId, "卵", 100, 76, 6, 5, 0),
                createCustomFood(userId, loginId, "ギリシャヨーグルト", 100, 62, 10, 0, 5),
                createCustomFood(userId, loginId, "白米", 100, 250, 4, 1, 55),
                createCustomFood(userId, loginId, "オートミール", 100, 350, 14, 6, 69),
                createCustomFood(userId, loginId, "バナナ", 100, 86, 1, 0, 23),
                createCustomFood(userId, loginId, "アボカド", 100, 212, 3, 10, 20),
                createCustomFood(userId, loginId, "豆腐", 100, 59, 5, 4, 4),
                createCustomFood(userId, loginId, "ブロッコリー", 100, 40, 5, 0, 7)
        );

        customFoodRepository.saveAll(foods);
    }

    private CustomFood createCustomFood(
            Integer userId,
            String loginId,
            String name,
            Integer amount,
            Integer cal,
            Integer pro,
            Integer fat,
            Integer car
    ) {
        CustomFood food = new CustomFood();
        food.setUserId(userId);
        food.setLoginId(loginId);
        food.setName(name);
        food.setAmount(amount);
        food.setCal(cal);
        food.setPro(pro);
        food.setFat(fat);
        food.setCar(car);
        return food;
    }
}
