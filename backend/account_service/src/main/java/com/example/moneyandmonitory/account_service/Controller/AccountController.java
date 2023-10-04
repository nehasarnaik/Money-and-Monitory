package com.example.moneyandmonitory.account_service.Controller;

import com.example.moneyandmonitory.account_service.DTO.MoneyTransferRequestDTO;
import com.example.moneyandmonitory.account_service.Service.AccountService;
import com.example.moneyandmonitory.account_service.model.DebitAccount;
import com.example.moneyandmonitory.account_service.model.SavingsAccount;
import com.example.moneyandmonitory.account_service.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

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
    public ResponseEntity<Transaction> depositFromDepositAccount(@PathVariable long userId, @PathVariable double amount)
    {
        return accountService.depositFromDebitAccount(userId, amount);
    }

    //for payments page
    @PutMapping("/debitaccount/payment/{userId}/{amount}/{accountNo}")
    public ResponseEntity<Transaction> paymentFromDebitAccount(@PathVariable long userId, @PathVariable double amount, @PathVariable long accountNo)
    {
        return accountService.paymentFromDebitAccount(userId, amount, accountNo);
    }

    @PostMapping("/transfermoney")
    public ResponseEntity<Transaction> transferMoney(@RequestBody MoneyTransferRequestDTO moneyTransferRequestDTO){
        return accountService.transferMoney(moneyTransferRequestDTO);
    }
}
