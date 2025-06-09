package com.example.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.model.Course;

public interface CourseRepo extends CrudRepository<Course, Long> {

}
