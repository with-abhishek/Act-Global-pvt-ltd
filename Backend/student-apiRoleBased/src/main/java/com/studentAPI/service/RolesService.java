package com.studentAPI.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.studentAPI.dto.LoginDto;
import com.studentAPI.model.Roles;
import com.studentAPI.repository.LoginRepo;

@Service
public class RolesService {

    @Autowired
    private LoginRepo rolesRepo;

    public Map<String, String> login(LoginDto loginDto) {
        Optional<Roles> userOpt = rolesRepo.findByUsername(loginDto.getUsername());
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        Roles user = userOpt.get();

        if (!user.getPassword().equals(loginDto.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Return role and username in response
        Map<String, String> response = new HashMap<>();
        response.put("username", user.getUsername());
        response.put("role", user.getRole()); // e.g. "ADMIN" or "USER"

        return response;
    }
    
    public ResponseEntity<String> saveLoginInfo(Roles role) {
        if (rolesRepo.findByUsernameAllIgnoreCase(role.getUsername()).isPresent()) {
            return new ResponseEntity<>("Username already exists! Please choose another.", HttpStatus.CONFLICT);
        }

        String normalizedRole = role.getRole().toUpperCase();
        role.setRole(normalizedRole);

        rolesRepo.save(role);
        return new ResponseEntity<>("Registered successfully", HttpStatus.CREATED);
    }

    
    

//    public String saveLoginInfo(Roles role) {
//        if (rolesRepo.findByUsernameAllIgnoreCase(role.getUsername()).isPresent()) {
//            return "Username already exists! Please choose another.";
//        }
//
//        String normalizedRole = role.getRole().toUpperCase();
//        role.setRole(normalizedRole);
//        rolesRepo.save(role);
//        return "Registered successfully";
//    }

    // Optional method: get role by username
    public Roles getRoleByUsername(String username) {
        return rolesRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
