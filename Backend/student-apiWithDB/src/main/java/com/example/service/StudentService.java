package com.example.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.model.Course;
import com.example.model.Student;
import com.example.repository.CourseRepo;
import com.example.repository.StudentRepo;

@Service
public class StudentService {
	@Autowired
	private StudentRepo studentRepo;
	@Autowired
	private CourseRepo courseRepo;
	public void saveStudent(Student student) {
//		System.out.println(student.getName());
		studentRepo.save(student);
		
	}
	
	public List<Student> getAllStudent() {
		
		return (List<Student>) studentRepo.findAll();
	}

	public void deleteStudent(Long id) {
		studentRepo.deleteById(id);
	}

	public String updateStudent(Long id, Student student) {
	    Optional<Student> optionalStudent = studentRepo.findById(id);

	    if (optionalStudent.isPresent()) {
	        Student existingStudent = optionalStudent.get();

	        // Update basic fields
	        existingStudent.setName(student.getName());
	        existingStudent.setGender(student.getGender());
	        existingStudent.setEmail(student.getEmail());
	        existingStudent.setMobileNo(student.getMobileNo());

	        // Clear old courses
	        existingStudent.getCourses().clear();

	        // Add updated courses
	        List<Course> updatedCourses = new ArrayList<>();
	        for (Course course : student.getCourses()) {
	            if (course.getId() != null) {
	                // Fetch from DB to ensure it's a managed entity
	                Optional<Course> existingCourse = courseRepo.findById(course.getId());
	                existingCourse.ifPresent(updatedCourses::add);
	            } else {
	                // If it's a new course (no ID), add as is
	                updatedCourses.add(course);
	            }
	        }

	        existingStudent.getCourses().addAll(updatedCourses);

	        studentRepo.save(existingStudent);
	        return "Update Successfully";
	    } else {
	        return "Student not found";
	    }
	}



	public Optional<Student> getStudentById(Long id) {
		// TODO Auto-generated method stub
		return studentRepo.findById(id);
	}
}
