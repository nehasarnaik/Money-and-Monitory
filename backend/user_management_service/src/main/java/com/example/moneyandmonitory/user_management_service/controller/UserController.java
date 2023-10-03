package com.example.moneyandmonitory.user_management_service.controller;

import com.example.moneyandmonitory.user_management_service.model.User;
import com.example.moneyandmonitory.user_management_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    public User registerUser(@RequestBody User user){
        return userService.registerUser(user);
    }

    @GetMapping("/{email}/{password}")
    public boolean login(@PathVariable String email, @PathVariable String password){
        return userService.login(email,password);
    }

    @GetMapping("/{email}")
    public User userDetails(@PathVariable String email){
        return userService.userDetails(email);
    }
}
