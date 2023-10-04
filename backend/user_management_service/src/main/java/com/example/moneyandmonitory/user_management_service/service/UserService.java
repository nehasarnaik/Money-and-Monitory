package com.example.moneyandmonitory.user_management_service.service;

import com.example.moneyandmonitory.user_management_service.DTO.ForgotPasswordRequestDTO;
import com.example.moneyandmonitory.user_management_service.model.DebitAccount;
import com.example.moneyandmonitory.user_management_service.model.SavingsAccount;
import com.example.moneyandmonitory.user_management_service.model.User;
import com.example.moneyandmonitory.user_management_service.repository.DebitAccountRepository;
import com.example.moneyandmonitory.user_management_service.repository.SavingsAccountRepository;
import com.example.moneyandmonitory.user_management_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    private MongoTemplate mongoTemplate;

    @Autowired
    SavingsAccountRepository savingsAccountRepository;
    public User registerUser(User user) {

        User userBO = userRepository.save(user);
        DebitAccount debitAccount = new DebitAccount();
        debitAccount.setUserId(userBO.getUserId());
        debitAccount.roundUp=userBO.roundUpSavings;
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

    public void roundUpFeature(long userId) {

        DebitAccount debitAccount = debitAccountRepository.findByuserId(userId);
        boolean roundup = !debitAccount.roundUp;
        Query query = new Query(Criteria.where("userId").is(userId));

        Update update = new Update().set("roundUp",roundup);

        FindAndModifyOptions options = FindAndModifyOptions.options().returnNew(true);

        mongoTemplate.findAndModify(query, update, options, DebitAccount.class);

        User user = userRepository.findById(userId).orElse(null);
        user.roundUpSavings=roundup;
        userRepository.save(user);

        SavingsAccount savingAccount = savingsAccountRepository.findByuserId(userId);

        if(savingAccount==null){
            SavingsAccount savingsAccount = new SavingsAccount();
            savingsAccount.setUserId(userId);
            savingsAccount.setSavingsAccountNumber(debitAccount.getSavingsAccountNumber());
            savingsAccount.setRoundUp(roundup);
            savingsAccountRepository.save(savingsAccount);
        }
    }

    public ResponseEntity<ForgotPasswordRequestDTO> forgotPassword(ForgotPasswordRequestDTO forgotPasswordRequestDTO) {
        User user = userRepository.findByemail(forgotPasswordRequestDTO.getEmail());
        System.out.println(user.getPassword());
        if(user.getPin()==forgotPasswordRequestDTO.getPin()){
            user.setPassword(forgotPasswordRequestDTO.getPassword());
            userRepository.save(user);
            return new ResponseEntity<>(null, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
