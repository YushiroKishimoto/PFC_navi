package com.example.pfc_navi.service;

import com.example.pfc_navi.entity.Account;
import com.example.pfc_navi.repository.AccountRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final AccountRepository accountRepository;

    public UserDetailsServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {
        Account account = accountRepository.findByLoginId(loginId)
                .orElseThrow(() -> new UsernameNotFoundException("ユーザーが見つかりません"));

        return User.withUsername(String.valueOf(account.getUserId()))
                .password(account.getPassword())
                .roles("USER")
                .build();
    }
}