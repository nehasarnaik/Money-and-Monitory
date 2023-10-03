package com.example.moneyandmonitory.user_management_service.controller;

import com.example.moneyandmonitory.user_management_service.model.User;
import com.example.moneyandmonitory.user_management_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public User registerUser(@RequestBody User user){
        return userService.registerUser(user);
    }
}
