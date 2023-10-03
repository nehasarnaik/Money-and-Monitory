package com.example.moneyandmonitory.account_service.Service;

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

    @Transactional
    public ResponseEntity<Transaction> withdrawFromSavingsAccount(long userId, double amount) {

        SavingsAccount savingsAccount = savingsAccountRepository.findByuserId(userId);
        double curBal = savingsAccount.getBalance();

        if(curBal < amount) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        double closingBal = curBal - amount;
        Query query = new Query(Criteria.where("userId").is(userId));
        Transaction t = createTransaction(-amount, 0, closingBal);

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

    private Transaction createTransaction(double amount, long narration, double closingBalance) {

        return new Transaction(new Date(),narration , UUID.randomUUID(), amount, closingBalance);
    }



    public ResponseEntity<Transaction> depositFromDebitAccount(long userId, double amount) {
        DebitAccount debitAccount = debitAccountRepository.findByuserId(userId);
        double curBal = debitAccount.getBalance();
        Query query = new Query(Criteria.where("userId").is(userId));
        double newBalance = curBal + amount;
        Transaction t = createTransaction(amount, 0, newBalance);
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


    public ResponseEntity<Transaction> paymentFromDebitAccount(long userId, double amount, long recvAcc) {
        DebitAccount debitAccount = debitAccountRepository.findByuserId(userId);
        double curBal = debitAccount.getBalance();
        if(curBal < amount)
        {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        double closingBal = curBal - amount;
        Query query = new Query(Criteria.where("userId").is(userId));

        Transaction t =  createTransaction(-amount, recvAcc, closingBal);

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
}
