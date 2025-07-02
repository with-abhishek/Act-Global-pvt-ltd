package com.studentAPI.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studentAPI.dto.LoginDto;
import com.studentAPI.model.Roles;
import com.studentAPI.service.RolesService;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/studentAuth")
public class AuthController {

	@Autowired
	private RolesService roleService;

	@PostMapping("/signin")
	public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
	    try {
	        Map<String, String> response = roleService.login(loginDto);
	        return ResponseEntity.ok(response);
	    } catch (RuntimeException e) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                .body(Map.of("error", e.getMessage()));
	    }
	}


	@PostMapping("/saveRoles")
	public ResponseEntity<String> SaveRoles(@RequestBody Roles role) {
		System.out.println("role api calling "+role.getEmail());
		return roleService.saveLoginInfo(role);

	}

	
}
