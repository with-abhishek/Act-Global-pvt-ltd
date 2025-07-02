package com.studentAPI.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.studentAPI.model.Student;

@Repository
public interface StudentRepo extends CrudRepository<Student, Long> {

}
