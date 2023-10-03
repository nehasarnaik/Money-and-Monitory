package com.example.moneyandmonitory.user_management_service.service;

import com.example.moneyandmonitory.user_management_service.model.DebitAccount;
import com.example.moneyandmonitory.user_management_service.model.SavingsAccount;
import com.example.moneyandmonitory.user_management_service.model.User;
import com.example.moneyandmonitory.user_management_service.repository.DebitAccountRepository;
import com.example.moneyandmonitory.user_management_service.repository.SavingsAccountRepository;
import com.example.moneyandmonitory.user_management_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static com.example.moneyandmonitory.user_management_service.UniqueAccountNumber.AccountNumber.getID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DebitAccountRepository debitAccountRepository;

    @Autowired
    SavingsAccountRepository savingsAccountRepository;
    public User registerUser(User user) {

        User userBO = userRepository.save(user);
        DebitAccount debitAccount = new DebitAccount();
        debitAccount.setUserId(userBO.getUserId());
        debitAccountRepository.save(debitAccount);

        if(userBO.roundUpSavings){
            SavingsAccount savingsAccount = new SavingsAccount();
            savingsAccount.setUserId(userBO.getUserId());
            savingsAccount.setSavingsAccountNumber(debitAccount.getSavingsAccountNumber());
            savingsAccount.setRoundUp(true);
            savingsAccountRepository.save(savingsAccount);
        }
        return userBO;
    }

    public boolean login(String email, String password) {
        List<User> userList = userRepository.findAll();
        for(User user:userList){
            if(user.getEmail().equals(email) && user.getPassword().equals(password)){
                return true;
            }
        }

        return false;
    }

    public User userDetails(String email) {
        List<User> userList = userRepository.findAll();
        for(User user:userList){
            if(user.getEmail().equals(email)){
                return user;
            }
        }

        return null;
    }
}
