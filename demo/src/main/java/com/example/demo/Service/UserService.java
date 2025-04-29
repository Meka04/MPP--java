package com.example.demo.Service;

import com.example.demo.Model.User;
import com.example.demo.Persistance.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepo userRepo;

    @Autowired
    public UserService(UserRepo repo){
        this.userRepo = repo;
    }

    public User registerUser(User user){
        if(userRepo.existsByUsername(user.getUsername()) || userRepo.existsByEmail(user.getEmail()))
            throw new RuntimeException("Username or email already exists");

        //password saved in plain text
        return userRepo.save(user);
    }
    public String loginUser(User user){
        Optional<User> existingUser = userRepo.findByUsername(user.getUsername());
        if(existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword()))
            return existingUser.get().getRole();
        else
            return "Invalid username or password";
    }
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
    public Optional<User> getUserById(int id) {
        return userRepo.findById(id);
    }
    public User updateUser(int id, User updatedUser) {
        return userRepo.findById(id).map(user -> {
            user.setUsername(updatedUser.getUsername());
            user.setEmail(updatedUser.getEmail());

            //password saved in plain text
            if (!updatedUser.getPassword().isBlank()) {
                user.setPassword(updatedUser.getPassword());
            }

            user.setRole(updatedUser.getRole());
            return userRepo.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }
    public void deleteUser(int id) {
        userRepo.deleteById(id);
    }
}
