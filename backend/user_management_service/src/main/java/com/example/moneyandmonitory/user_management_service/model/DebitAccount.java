package com.example.moneyandmonitory.user_management_service.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.UUID;

import static com.example.moneyandmonitory.user_management_service.UniqueAccountNumber.AccountNumber.getID;

@Data
@AllArgsConstructor
@Document(collection = "debitAccount")
public class DebitAccount {

    @Id
    private long debitAccountNumber;
    private long userId;
    private String accountType;
    private double balance;
    private long savingsAccountNumber;
    private List<Transaction> transaction;
    private Card card;

    public DebitAccount() {
        this.debitAccountNumber=getID();
        this.accountType = "Debit";
        this.balance = 0.0;
        this.savingsAccountNumber=getID()*10+getID()%10;
        this.card=new Card();
    }
}
