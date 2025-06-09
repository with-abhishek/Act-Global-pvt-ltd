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

	        // Update fields
	        existingStudent.setName(student.getName());
	        existingStudent.setGender(student.getGender());
	        existingStudent.setEmail(student.getEmail());
	        existingStudent.setMobileNo(student.getMobileNo());

	        // If new course list is provided, replace old one
	        if (student.getCourses() != null && !student.getCourses().isEmpty()) {
	            existingStudent.getCourses().clear();
	            existingStudent.getCourses().addAll(student.getCourses());
	        }

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
