package com.example.moneyandmonitory.account_service.model;

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
    private long senderAccountNumber;
    private long receiverAccountNumber;
    private UUID referenceNumber;
    private double amount;
    private double closingBalance;
}
