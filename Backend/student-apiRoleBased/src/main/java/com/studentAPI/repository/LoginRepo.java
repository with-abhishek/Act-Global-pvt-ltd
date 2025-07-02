package com.studentAPI.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.studentAPI.model.Roles;

@Repository
public interface LoginRepo extends CrudRepository<Roles, Long> {

	Optional<Roles> findByUsernameAllIgnoreCase(String username);

	Optional<Roles> findByUsername(String username);

}
