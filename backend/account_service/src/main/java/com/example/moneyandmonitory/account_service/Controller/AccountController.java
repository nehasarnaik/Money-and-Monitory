package com.example.moneyandmonitory.account_service.Controller;

import com.example.moneyandmonitory.account_service.Service.AccountService;
import com.example.moneyandmonitory.account_service.model.DebitAccount;
import com.example.moneyandmonitory.account_service.model.SavingsAccount;
import com.example.moneyandmonitory.account_service.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private AccountService accountService;


    @GetMapping("/debitaccount/{userId}")
    public DebitAccount getDebitAccountInfo(@PathVariable long userId)
    {
        return accountService.getDebitAccountInfo(userId);
    }

    @GetMapping("/savingsaccount/{userId}")
    public SavingsAccount getSavingsAccountInfo(@PathVariable long userId)
    {
        return accountService.getSavingsAccountInfo(userId);
    }


    @PutMapping("/savingsaccount/withdraw/{userId}/{amount}")
    public ResponseEntity<Transaction> withdrawFromSavingsAccount(@PathVariable long userId, @PathVariable double amount)
    {
        return accountService.withdrawFromSavingsAccount(userId, amount);
    }

    @PutMapping("/debitaccount/deposit/{userId}/{amount}")
    public ResponseEntity<Transaction> depositToDebitAccount(@PathVariable long userId, @PathVariable double amount)
    {
        return accountService.depositToDebitAccount(userId, amount);
    }

    //for payments page - withdraw from debit account
    @PutMapping("/debitaccount/withdraw/{userId}/{amount}")
    public ResponseEntity<Transaction> withdrawFromDebitAccount(@PathVariable long userId, @PathVariable double amount)
    {
        return accountService.withdrawFromDebitAccount(userId, amount);
    }

}
