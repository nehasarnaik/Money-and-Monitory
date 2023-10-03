package com.example.moneyandmonitory.user_management_service.model;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {
    private Date date;
    //empty for deposit/withdraw
    // when payment is done recievers account number is stored
    private long narration;

    private UUID referenceNumber;
    private double amount;
    private double closingBalance;
}
