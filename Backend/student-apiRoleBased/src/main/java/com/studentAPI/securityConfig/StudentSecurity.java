package com.studentAPI.securityConfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class StudentSecurity {

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	    http.csrf(csrf -> csrf.disable())
	        .authorizeRequests(auth -> auth
	            .requestMatchers("/studentAuth/saveRoles", "/studentAuth/signin").permitAll()
	            .requestMatchers(HttpMethod.GET, "/studentAPI/getAll").hasAnyAuthority("USER", "ADMIN")
	            .requestMatchers(HttpMethod.GET, "/studentAPI/getStudent/**").hasAnyAuthority("USER", "ADMIN")
	            .requestMatchers(HttpMethod.POST, "/studentAPI/addStudent").hasAuthority("ADMIN")
	            .requestMatchers(HttpMethod.PUT, "/studentAPI/updateStudent").hasAuthority("ADMIN")
	            .requestMatchers(HttpMethod.DELETE, "/studentAPI/deleteStudent").hasAuthority("ADMIN")
	            .anyRequest().authenticated()
	        )
	        .httpBasic(httpBasic -> {});


	    return http.build();
	}


    @Bean
    public UserDetailsService userDetailsService() {
        return new CustomUserDetailsService();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance(); // Plaintext for demo
    }

    @Bean
    public DaoAuthenticationProvider authProvider(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
