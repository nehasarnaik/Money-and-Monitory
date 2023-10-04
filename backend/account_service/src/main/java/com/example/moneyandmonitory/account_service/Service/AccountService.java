package com.example.moneyandmonitory.account_service.Service;

import com.example.moneyandmonitory.account_service.DTO.MoneyTransferRequestDTO;
import com.example.moneyandmonitory.account_service.Repository.DebitAccountRepository;
import com.example.moneyandmonitory.account_service.Repository.SavingsAccountRepository;
import com.example.moneyandmonitory.account_service.model.DebitAccount;
import com.example.moneyandmonitory.account_service.model.SavingsAccount;
import com.example.moneyandmonitory.account_service.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AccountService {

    @Autowired
    private DebitAccountRepository debitAccountRepository;

    @Autowired
    private SavingsAccountRepository savingsAccountRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public DebitAccount getDebitAccountInfo(long userId) {

        return debitAccountRepository.findByuserId(userId);
    }

    public SavingsAccount getSavingsAccountInfo(long userId) {

        return savingsAccountRepository.findByuserId(userId);
    }

    private Transaction createTransaction(double amount, String narration, double closingBalance) {

        if(amount < 0)
        {
            return new Transaction(new Date(),narration , UUID.randomUUID(), -amount, 0, closingBalance);
        }
        return new Transaction(new Date(),narration , UUID.randomUUID(), 0,amount, closingBalance);
    }
    @Transactional
    public ResponseEntity<Transaction> withdrawFromSavingsAccount(long userId, double amount) {

        SavingsAccount savingsAccount = savingsAccountRepository.findByuserId(userId);
        double curBal = savingsAccount.getBalance();

        if(curBal < amount) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        double closingBal = curBal - amount;
        Query query = new Query(Criteria.where("userId").is(userId));
        Transaction t = createTransaction(-amount, "Debited " + amount, closingBal);

        Update update = new Update()
                .inc("balance", -amount)  // Decrement the balance by the specified amount
                .push("transactions", t); // Add the new transaction

        FindAndModifyOptions options = FindAndModifyOptions.options().returnNew(true);
        SavingsAccount savingsAccount1 =  mongoTemplate.findAndModify(query, update, options, SavingsAccount.class);
        if(savingsAccount1 != null)
        {
            return new ResponseEntity<>(t, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.NOT_IMPLEMENTED);
        }
    }

    public ResponseEntity<Transaction> depositToDebitAccount(long userId, double amount) {
        DebitAccount debitAccount = debitAccountRepository.findByuserId(userId);
        double curBal = debitAccount.getBalance();
        Query query = new Query(Criteria.where("userId").is(userId));
        double newBalance = curBal + amount;
        Transaction t = createTransaction(amount, "credited " + amount, newBalance);
        Update update = new Update()
                .inc("balance", amount)  // Decrement the balance by the specified amount
                .push("transactions", t ); // Add the new transaction
        DebitAccount modifiedAcc = mongoTemplate.findAndModify(query, update, FindAndModifyOptions.options().returnNew(true), DebitAccount.class);

        if(modifiedAcc != null)
        {
            return new ResponseEntity<>(t, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.NOT_IMPLEMENTED);
        }

    }


    //withdraw from debitaccount


    public ResponseEntity<Transaction> depositToSavingsAccount(long userId, double amount) {
        SavingsAccount savingsAccount = savingsAccountRepository.findByuserId(userId);
        double curBal = savingsAccount.getBalance();
        Query query = new Query(Criteria.where("userId").is(userId));
        double newBalance = curBal + amount;
        Transaction t = createTransaction(amount, "", newBalance);
        Update update = new Update()
                .inc("balance", amount)  // Decrement the balance by the specified amount
                .push("transactions", t ); // Add the new transaction
        SavingsAccount modifiedAcc = mongoTemplate.findAndModify(query, update, FindAndModifyOptions.options().returnNew(true), SavingsAccount.class);

        if(modifiedAcc != null)
        {
            return new ResponseEntity<>(t, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.NOT_IMPLEMENTED);
        }

    }

    public ResponseEntity<Transaction> withdrawFromDebitAccount(long userId, double amount) {

        DebitAccount debitAccount = debitAccountRepository.findByuserId(userId);
        double curBal = debitAccount.getBalance();
        if(curBal < amount)
        {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        double closingBal = curBal - amount;
        Query query = new Query(Criteria.where("userId").is(userId));
        String narration = "debited " + amount ;
        Transaction t =  createTransaction(-amount, narration, closingBal);

        Update update = new Update()
                .inc("balance", -amount)  // Decrement the balance by the specified amount
                .push("transactions", t ); // Add the new transaction

        FindAndModifyOptions options = FindAndModifyOptions.options().returnNew(true);

        DebitAccount debitAccount1 = mongoTemplate.findAndModify(query, update, options, DebitAccount.class);

        if(debitAccount1 != null) {
            return new ResponseEntity<>(t, HttpStatus.OK);
        }

        return new ResponseEntity<>(null, HttpStatus.NOT_IMPLEMENTED);

    }

    public double getSavingsAccountBalance(long userId) {
        return savingsAccountRepository.findByuserId(userId).getBalance();
    }

    public double getDebitAccountBalance(long userId) {
        return debitAccountRepository.findByuserId(userId).getBalance();
    }
    public ResponseEntity<Transaction> transferMoney(MoneyTransferRequestDTO moneyTransferRequestDTO) {
        MoneyTransferRequestDTO mt=moneyTransferRequestDTO;
        DebitAccount debitAccount = debitAccountRepository.findByuserId(mt.getUserId());
        double finalAmount = mt.getAmount();
        if(debitAccount.roundUp==true){
            finalAmount=Math.ceil(mt.getAmount());
            double savingsAmount=finalAmount-mt.getAmount();
            depositToSavingsAccount(debitAccount.getUserId(),savingsAmount);
        }
        return withdrawFromDebitAccount(debitAccount.getUserId(),finalAmount);
    }
}
