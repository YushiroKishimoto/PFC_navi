package com.example.pfc_navi.service;

import com.example.pfc_navi.entity.Account;
import com.example.pfc_navi.repository.AccountRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.pfc_navi.entity.DefaultFood;
import com.example.pfc_navi.entity.MealSet;
import com.example.pfc_navi.entity.MealSetItem;
import com.example.pfc_navi.repository.DefaultFoodRepository;
import com.example.pfc_navi.repository.MealSetItemRepository;
import com.example.pfc_navi.repository.MealSetRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final MealSetRepository mealSetRepository;
    private final MealSetItemRepository mealSetItemRepository;
    private final DefaultFoodRepository defaultFoodRepository;
    
    

    public UserService(AccountRepository accountRepository, PasswordEncoder passwordEncoder,MealSetRepository mealSetRepository,
        MealSetItemRepository mealSetItemRepository,
        DefaultFoodRepository defaultFoodRepository) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.mealSetRepository = mealSetRepository;
        this.mealSetItemRepository = mealSetItemRepository;
        this.defaultFoodRepository = defaultFoodRepository;
      
    }

    @Transactional
    public Account register(String loginId, String rawPassword, String securityAnswer) {
        // 同じloginIdが既に存在する場合はエラ
        if (accountRepository.findByLoginId(loginId).isPresent()) {
            throw new IllegalArgumentException("このログインIDは既に使用されています");
        }

        Account account = new Account();

       
        
        account.setLoginId(loginId);
        account.setPassword(passwordEncoder.encode(rawPassword));
        account.setSecurityAnswerHash(passwordEncoder.encode(normalizeAnswer(securityAnswer)));
        Account savedAccount = accountRepository.save(account);
            // 新規登録ユーザー用のセット初期値を作成
        createInitialMealSets(savedAccount);

        return savedAccount;
    }

    // 回答は表記ゆれで一致しなくなるのを防ぐため、前後空白除去・小文字化してから扱う
    private String normalizeAnswer(String answer) {
        return answer == null ? "" : answer.trim().toLowerCase();
    }

    private void createInitialMealSets(Account account) {
    Integer userId = account.getUserId();
    String loginId = account.getLoginId();

    List<InitialSet> initialSets = List.of(
            new InitialSet("朝食セットA", List.of(
                    new InitialSetItem(1, 150),
                    new InitialSetItem(2, 50),
                    new InitialSetItem(3, 60)
            )),
            new InitialSet("朝食セットB", List.of(
                    new InitialSetItem(4, 60),
                    new InitialSetItem(3, 60),
                    new InitialSetItem(5, 200)
            )),
            new InitialSet("朝食セットC", List.of(
                    new InitialSetItem(6, 50),
                    new InitialSetItem(7, 100),
                    new InitialSetItem(8, 100)
            )),
            new InitialSet("昼食セットA", List.of(
                    new InitialSetItem(1, 200),
                    new InitialSetItem(9, 150),
                    new InitialSetItem(10, 80)
            )),
            new InitialSet("昼食セットB", List.of(
                    new InitialSetItem(11, 100),
                    new InitialSetItem(12, 70),
                    new InitialSetItem(13, 100)
            )),
            new InitialSet("昼食セットC", List.of(
                    new InitialSetItem(14, 180),
                    new InitialSetItem(3, 60),
                    new InitialSetItem(15, 150)
            )),
            new InitialSet("夕食セットA", List.of(
                    new InitialSetItem(1, 200),
                    new InitialSetItem(16, 100),
                    new InitialSetItem(17, 180)
            )),
            new InitialSet("夕食セットB", List.of(
                    new InitialSetItem(1, 200),
                    new InitialSetItem(18, 120),
                    new InitialSetItem(19, 100)
            )),
            new InitialSet("夕食セットC", List.of(
                    new InitialSetItem(1, 200),
                    new InitialSetItem(20, 150),
                    new InitialSetItem(13, 100)
            )),
            new InitialSet("高たんぱくセット", List.of(
                    new InitialSetItem(1, 150),
                    new InitialSetItem(9, 200),
                    new InitialSetItem(3, 60)
            ))
    );

    for (InitialSet initialSet : initialSets) {
        MealSet mealSet = new MealSet();
        mealSet.setUserId(userId);
        mealSet.setLoginId(loginId);
        mealSet.setName(initialSet.name());
        mealSet.setTotalCal(0);
        mealSet.setTotalPro(0);
        mealSet.setTotalFat(0);
        mealSet.setTotalCar(0);

        MealSet savedSet = mealSetRepository.save(mealSet);

        int totalCal = 0;
        int totalPro = 0;
        int totalFat = 0;
        int totalCar = 0;

        for (InitialSetItem initialItem : initialSet.items()) {
            DefaultFood food = defaultFoodRepository.findById(initialItem.itemId())
                    .orElseThrow(() -> new IllegalArgumentException(
                            "初期セット作成用の食品が存在しません。itemId=" + initialItem.itemId()
                    ));

            MealSetItem item = buildMealSetItem(
                    savedSet.getId(),
                    food,
                    initialItem.amount()
            );

            mealSetItemRepository.save(item);

            totalCal += item.getCal();
            totalPro += item.getPro();
            totalFat += item.getFat();
            totalCar += item.getCar();
        }

        savedSet.setTotalCal(totalCal);
        savedSet.setTotalPro(totalPro);
        savedSet.setTotalFat(totalFat);
        savedSet.setTotalCar(totalCar);

        mealSetRepository.save(savedSet);
    }
}

private MealSetItem buildMealSetItem(Integer setFoodId, DefaultFood food, Integer amount) {
    if (food.getAmount() == null || food.getAmount() <= 0) {
        throw new IllegalArgumentException("食品の基準量が不正です。");
    }

    double rate = amount.doubleValue() / food.getAmount().doubleValue();

    MealSetItem item = new MealSetItem();
    item.setSetFoodId(setFoodId);
    item.setItemType("default");
    item.setItemId(food.getId());
    item.setAmount(amount);
    item.setCal((int) Math.round(food.getCal() * rate));
    item.setPro((int) Math.round(food.getPro() * rate));
    item.setFat((int) Math.round(food.getFat() * rate));
    item.setCar((int) Math.round(food.getCar() * rate));

    return item;
}

private record InitialSet(String name, List<InitialSetItem> items) {
}

private record InitialSetItem(Integer itemId, Integer amount) {
}

}
