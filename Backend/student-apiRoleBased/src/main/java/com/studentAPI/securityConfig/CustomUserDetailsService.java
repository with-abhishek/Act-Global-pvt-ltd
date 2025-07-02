package com.studentAPI.securityConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.studentAPI.model.Roles;
import com.studentAPI.repository.LoginRepo;

//public class CustomUserDetailsService implements UserDetailsService {
//	
//	@Autowired
//	private LoginRepo loginRepo;
//	
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		Roles role = loginRepo.findByUsernameAllIgnoreCase(username).orElseThrow(()-> new UsernameNotFoundException("User not found "));
//		
//		
//		return (UserDetails)role;
//	
//	}
//
//}

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private LoginRepo loginRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Roles role = loginRepo.findByUsernameAllIgnoreCase(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return new CustomUserDetails(role); // Fixed line
    }
}
