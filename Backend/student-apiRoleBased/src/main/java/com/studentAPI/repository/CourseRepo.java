package com.studentAPI.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.studentAPI.model.Courses;

@Repository
public interface CourseRepo  extends CrudRepository<Courses, Long> {

}
